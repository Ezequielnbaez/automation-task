import { postContentToWebHook } from "@/lib/discord-connection";
import { onCreateNewPageInDatabase } from "@/lib/notion-connection";
import { postMessageToSlack } from "@/lib/slack-connection";
import { db } from "@/db";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { discordWebhooks, users, workflows } from "@/db/schema";

export async function POST(req: NextRequest) {
  const headersList = headers();
  let channelResourceId;
  headersList.forEach((value, key) => {
    if (key == "x-goog-resource-id") {
      channelResourceId = value;
    }
  });

  if (channelResourceId) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.googleResourceId, channelResourceId));
   /* if (
      (user[0] && parseInt(user[0].credits!) > 0) ||
      user[0]?.credits == "Unlimited"
    ) {*/
      const workflow = await db
        .select()
        .from(workflows)
        .where(eq(workflows.userId, user[0].clerkId));
        
        console.log("quepasa",workflow)
      if (workflow) {
        workflow.map(async (flow) => {
          const flowPath = JSON.parse(flow.flowPath!);
          let current = 0;
          while (current < flowPath.length) {
            if (flowPath[current] == "Discord") {
              const discordMessage = await db
                .select()
                .from(discordWebhooks)
                .where(eq(discordWebhooks.userId, flow.userId));

              if (discordMessage[0]) {
                const dscmessage = discordMessage[0].url || "";
                await postContentToWebHook(flow.discordTemplate!, dscmessage);
                flowPath.splice(flowPath[current], 1);
              }
            }
            if (
              flowPath[current] == "Slack" &&
              Array.isArray(flow.slackChannels)
            ) {
              const channels = flow.slackChannels.map((channel) => {
                return {
                  label: "",
                  value: channel,
                };
              });
              await postMessageToSlack(
                flow.slackAccessToken!,
                channels,
                flow.slackTemplate!
              );
              flowPath.splice(flowPath[current], 1);
            }
            if (flowPath[current] == "Notion") {
              await onCreateNewPageInDatabase(
                flow.notionDbId!,
                flow.notionAccessToken!,
                JSON.parse(flow.notionTemplate!)
              );
              flowPath.splice(flowPath[current], 1);
            }

            if (flowPath[current] == "Wait") {
              const res = await axios.put(
                "https://api.cron-job.org/jobs",
                {
                  job: {
                    url: `${process.env.NGROK_URI}?flow_id=${flow.id}`,
                    enabled: "true",
                    schedule: {
                      timezone: "Europe/Istanbul",
                      expiresAt: 0,
                      hours: [-1],
                      mdays: [-1],
                      minutes: ["*****"],
                      months: [-1],
                      wdays: [-1],
                    },
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${process.env.CRON_JOB_KEY!}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              if (res) {
                flowPath.splice(flowPath[current], 1);
                const cronPath = await db
                  .update(workflows)
                  .set({ cronPath: JSON.stringify(flowPath) })
                  .where(eq(workflows.id, flow.id));
                break;
              }
              current++;
            }
          }

          await db
            .update(users)
            .set({ credits: `${parseInt(user[0].credits!) - 1}` })
            .where(eq(users.clerkId, user[0].clerkId));
        });
        return Response.json(
          {
            message: "flow completed",
          },
          {
            status: 200,
          }
        );
      
    }
  }
  return Response.json(
    {
      message: "success",
    },
    {
      status: 200,
    }
  );
}
