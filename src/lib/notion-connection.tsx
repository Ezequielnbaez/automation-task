"use server";

import { connections, notion } from "@/db/schema";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { Client } from "@notionhq/client";
import { eq } from "drizzle-orm";

export const onNotionConnect = async (
  access_token: string,
  workspace_id: string,
  workspace_icon: string,
  workspace_name: string,
  database_id: string,
  user_id: string
) => {
  "use server";
  if (access_token) {
    const notion_connected = await db
      .select()
      .from(notion)
      .where(eq(notion.accessToken, access_token));

    if (notion_connected.length===0) {
      await db.insert(notion).values({
        userId: user_id,
        workspaceIcon: workspace_icon!,
        accessToken: access_token,
        workspaceId: workspace_id!,
        workspaceName: workspace_name!,
        databaseId: database_id,
      });
      await db
      .insert(connections)
      .values({
        notionId:access_token,
        type:"Notion",
        userId:user_id,
      })
    }
  }
};

export const getNotionConnection = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const webhooks = await db.select().from(notion).where(eq(notion.userId, user.id));
  
  if (!webhooks || webhooks.length === 0) {
    throw new Error("No webhooks found");}
  const webhook = webhooks[0];
  return {
    accessToken: webhook.accessToken,
    databaseId: webhook.databaseId,
    workspaceName: webhook.workspaceName,
  };
};

export const getNotionDatabase = async (
  databaseId: string,
  accessToken: string
) => {
  const notion = new Client({
    auth: accessToken,
  });
  const response = await notion.databases.retrieve({ database_id: databaseId });
  return response;
};

export const onCreateNewPageInDatabase = async (
  databaseId: string,
  accessToken: string,
  content: string
) => {
  const notion = new Client({
    auth: accessToken,
  });

  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: databaseId,
    },
    properties: {
      name: [
        {
          text: {
            content: content,
          },
        },
      ],
    },
  });
  if (response) {
    return response;
  }
};
