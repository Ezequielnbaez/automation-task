"use server";
import { currentUser } from "@clerk/nextjs/server";
import { users } from "@/db/schema";
import { connections } from "@/db/schema";
import { workflows } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { userConfigProps } from "./types";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Option } from "@/components/ui/multiple-selector";
import { auth } from "@clerk/nextjs/server";

export const getGoogleListener = async () => {
  const { userId } = auth();

  if (userId) {
    const listener = await db
      .select({
        googleResourceId: users.googleResourceId,
      })
      .from(users)
      .where(eq(users.clerkId, userId));

    if (listener) return listener;
  }
};

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  const published = await db
    .update(workflows)
    .set({ publish: state })
    .where(eq(workflows.id, workflowId));

  if (published) return "Workflow published";
  return "Workflow unpublished";
};

export const onCreateNodeTemplate = async (
  content: string,
  type: string,
  workflowId: string,
  channels?: Option[],
  accessToken?: string,
  notionDbId?: string
) => {
  if (type === "Discord") {
    const response = await db
      .update(workflows)
      .set({ discordTemplate: content })
      .where(eq(workflows.id, workflowId));
    if (response) {
      return "Discord template saved";
    }
  }
  if (type === "Slack") {
    const response = await db
      .update(workflows)
      .set({ slackTemplate: content, slackAccessToken: accessToken })
      .where(eq(workflows.id, workflowId));

    if (response) {
      const channelList = await db
        .select({ slackChannels: workflows.slackChannels })
        .from(workflows)
        .where(eq(workflows.id, workflowId));

      if (channelList.length > 0) {
        const slackChannels = channelList[0].slackChannels;

        if (Array.isArray(slackChannels)) {
          const NonDuplicated = slackChannels.filter(
            (channel) => channel !== channels![0].value
          );

          NonDuplicated!
            .map((channel) => channel)
            .forEach(async (channel) => {
              await db
                .update(workflows)
                .set({ slackChannels: channel })
                .where(eq(workflows.id, workflowId));
            });

          return "Slack template saved";
        }
        channels!
          .map((channel) => channel.value)
          .forEach(async (channel) => {
            await db
              .update(workflows)
              .set({ slackChannels: channel })
              .where(eq(workflows.id, workflowId));
          });

        return "Slack template saved";
      }
    }
  }
  if (type === "Notion") {
    const response = await db
      .update(workflows)
      .set({
        notionTemplate: content,
        notionAccessToken: accessToken,
        notionDbId: notionDbId,
      })
      .where(eq(workflows.id, workflowId));

    if (response) return "Notion template saved";
  }
};

export const onGetWorkflows = async () => {
  const user = await currentUser();
  if (user) {
    const workflow = await db
      .select()
      .from(workflows)
      .where(eq(workflows.id, user.id));

    if (workflow) return workflow;
  }
};

export const onCreateWorkflow = async (name: string, description: string) => {
  const user = await currentUser();

  if (user) {
    const workflow = await db.insert(workflows).values({
      userId: user.id,
      name,
      description,
    });

    if (workflow) return { message: "workflow created" };
    return { message: "Oops! try again" };
  }
};

export const onGetNodesEdges = async (flowId: string) => {
  const nodesEdges = await db
    .select({ nodes: workflows.nodes, edges: workflows.edges })
    .from(workflows)
    .where(eq(workflows.id, flowId))
    .limit(1);

  const result = nodesEdges[0];

  if (result?.nodes && result?.edges) {
    return result;
  }

  return null;
};

export async function userConfig({ fname, lname, mail }: userConfigProps) {
  const userOwner = await currentUser();

  if (!userOwner) throw new Error("User not found");

  const actualUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userOwner.id));

  if (actualUser.length === 0) {
    await db.insert(users).values({
      clerkId: userOwner.id,
      name: fname,
      lname: lname,
      email: mail,
    });
  } else {
    await db
      .update(users)
      .set({ name: fname, lname: lname, email: mail })
      .where(eq(users.clerkId, userOwner.id));
  }
}

export async function getUserConnections(userId: string) {
  const userConnections = await db
    .select()
    .from(connections)
    .where(eq(connections.userId, userId));

  return userConnections;
}

export async function onSaveWorkflow(name: string, desc: string) {
  const userOwner = await currentUser();

  if (!userOwner) throw new Error("User not found");

  const workFlowInsert = await db.insert(workflows).values({
    userId: userOwner.id,
    name: name,
    description: desc,
  });

  return workFlowInsert;
}

export async function onDeleteWorkflow(id: string) {
  if (uuidValidate(id)) {
    await db.delete(workflows).where(eq(workflows.id, id));
  }
}
export async function getWorkflows() {
  const userOwner = await currentUser();

  if (!userOwner) throw new Error("User not found");

  const userWorkflows = await db
    .select()
    .from(workflows)
    .where(eq(workflows.userId, userOwner.id));

  return userWorkflows;
}

export const onCreateNodesEdges = async (
  flowId: string,
  nodes: string,
  edges: string,
  flowPath: string
) => {
  const [flow] = await db
    .update(workflows)
    .set({
      nodes,
      edges,
      flowPath,
    })
    .where(eq(workflows.id, flowId))
    .returning();
  if (flow) return { message: "Flow saved" };
};

export const getWorkFlowTitle = async (id: string) => {
  if (uuidValidate(id)) {
    const workflowTitle = await db
      .select({
        name: workflows.name,
      })
      .from(workflows)
      .where(eq(workflows.id, id));

    return workflowTitle[0].name;
  }
};
 
export const onPaymentDetails = async () => {
  const user = await currentUser()

  if (user) {
    const connection = await db.select({ tier: users.tier, credits: users.credits }).from(users).where(eq(users.clerkId,user.id))
    if (user) {
      return connection
    }
  }
}