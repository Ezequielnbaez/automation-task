"use server";

import { Option } from "@/components/ui/multiple-selector";
import { db } from "@/db";
import { connections, slack } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import axios from "axios";

export const onSlackConnect = async (
  app_id: string,
  authed_user_id: string,
  authed_user_token: string,
  slack_access_token: string,
  bot_user_id: string,
  team_id: string,
  team_name: string,
  user_id: string
): Promise<void> => {
  if (!slack_access_token) return;

  const slackConnection = await db
    .select()
    .from(slack)
    .where(eq(slack, slack_access_token));

  if (slackConnection.length===0) {
    console.log("hey you")
    await db.insert(slack).values({
      userId: user_id,
      appId: app_id,
      authedUserId: authed_user_id,
      authedUserToken: authed_user_token,
      slackAccessToken: slack_access_token,
      botUserId: bot_user_id,
      teamId: team_id,
      teamName: team_name,
    });
    await db
    .insert(connections)
    .values({
      slackId:slack_access_token,
      type:"Slack",
      userId:user_id,
    })
  }
};

export const getSlackConnection = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const webhooks = await db.select().from(slack).where(eq(slack.userId, user.id));
  
  if (!webhooks || webhooks.length === 0) {
    throw new Error("No webhooks found");}
  const webhook = webhooks[0];
  return {
    appId: webhook.appId,
        authedUserId: webhook.authedUserId,
        authedUserToken: webhook.authedUserToken,
        slackAccessToken: webhook.slackAccessToken,
        botUserId: webhook.botUserId,
        teamId: webhook.teamId,
        teamName: webhook.teamName,
        userId: webhook.userId,
  };
};

export async function listBotChannels(
  slackAccessToken: string
): Promise<Option[]> {
  const url = `https://slack.com/api/conversations.list?${new URLSearchParams({
    types: "public_channel,private_channel",
    limit: "200",
  })}`;

  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${slackAccessToken}` },
    });

    console.log(data);

    if (!data.ok) throw new Error(data.error);

    if (!data?.channels?.length) return [];

    return data.channels
      .filter((ch: any) => ch.is_member)
      .map((ch: any) => {
        return { label: ch.name, value: ch.id };
      });
  } catch (error: any) {
    console.error("Error listing bot channels:", error.message);
    throw error;
  }
}

const postMessageInSlackChannel = async (
  slackAccessToken: string,
  slackChannel: string,
  content: string
): Promise<void> => {
  try {
    await axios.post(
      "https://slack.com/api/chat.postMessage",
      { channel: slackChannel, text: content },
      {
        headers: {
          Authorization: `Bearer ${slackAccessToken}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    console.log(`Message posted successfully to channel ID: ${slackChannel}`);
  } catch (error: any) {
    console.error(
      `Error posting message to Slack channel ${slackChannel}:`,
      error?.response?.data || error.message
    );
  }
};

export const postMessageToSlack = async (
  slackAccessToken: string,
  selectedSlackChannels: Option[],
  content: string
): Promise<{ message: string }> => {
  if (!content) return { message: "Content is empty" };
  if (!selectedSlackChannels?.length)
    return { message: "Channel not selected" };

  try {
    selectedSlackChannels
      .map((channel) => channel?.value)
      .forEach((channel) => {
        postMessageInSlackChannel(slackAccessToken, channel, content);
      });
  } catch (error) {
    return { message: "Message could not be sent to Slack" };
  }

  return { message: "Success" };
};
