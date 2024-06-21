"use server";

import { db } from "@/db";
import { discordWebhooks } from "@/db/schema";
import { connections } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { eq } from "drizzle-orm";

export const onDiscordConnect = async (
  channel_id: string,
  webhook_id: string,
  webhook_name: string,
  webhook_url: string,
  user_id: string,
  guild_name: string,
  guild_id: string
) => {
  if (webhook_id) {
    const webhook = await db
      .select()
      .from(discordWebhooks)
      .where(eq(discordWebhooks.userId, user_id));

    if (webhook.length === 0) {
      await db.insert(discordWebhooks).values({
        userId: user_id,
        webhookId: webhook_id,
        channelId: channel_id!,
        guildId: guild_id!,
        name: webhook_name!,
        url: webhook_url!,
        guildName: guild_name!,
      });

      await db
      .insert(connections)
      .values({
        discordWebhookId:webhook_id,
        type:"Discord",
        userId:user_id,
      })

    }

    if (webhook) {
      const webhook_channel = await db
        .select()
        .from(discordWebhooks)
        .where(eq(discordWebhooks.channelId, channel_id));

      if (!webhook_channel) {
        await db.insert(discordWebhooks).values({
          userId: user_id,
          webhookId: webhook_id,
          channelId: channel_id!,
          guildId: guild_id!,
          name: webhook_name!,
          url: webhook_url!,
          guildName: guild_name!,
        });
      }
    }
  }
};

export const getDiscordConnectionUrl = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const webhooks = await db
    .select()
    .from(discordWebhooks)
    .where(eq(discordWebhooks.userId, user.id));
  console.log(user.id)
  if (!webhooks || webhooks.length === 0) {
    throw new Error("No webhooks found");
  }

  const webhook = webhooks[0];
  return {
    url: webhook.url,
    name: webhook.name,
    guildName: webhook.guildName,
  };
};

export const postContentToWebHook = async (content: string, url: string) => {
  if (content != "") {
    const posted = await axios.post(url, { content });
    if (posted) {
      return { message: "success" };
    }
    return { message: "failed request" };
  }
  return { message: "String empty" };
};
