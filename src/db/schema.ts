import { pgTable, serial, varchar, unique, timestamp, boolean, text, uuid} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { sql } from 'drizzle-orm/sql';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  clerkId: varchar('clerk_id').unique().notNull(),
  name: varchar('name'),
  lname: varchar('lname'),
  email: varchar('email').unique().notNull(),
  profileImage: varchar('profile_image'),
  tier: varchar('tier').default('Free'),
  credits: varchar('credits').default('10'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  localGoogleId: varchar('local_google_id').unique(),
  googleResourceId: varchar('google_resource_id').unique(),
});

export const localGoogleCredentials = pgTable('local_google_credentials', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  accessToken: varchar('access_token').unique().notNull(),
  folderId: varchar('folder_id'),
  pageToken: varchar('page_token'),
  channelId: serial('channel_id').unique(),
  subscribed: boolean('subscribed').default(false),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  userId: serial('user_id').unique().notNull(),
});

export const discordWebhooks = pgTable('discord_webhooks', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  webhookId: varchar('webhook_id').unique(),
  url: varchar('url').unique(),
  name: varchar('name'),
  guildName: varchar('guild_name'),
  guildId: varchar('guild_id'),
  channelId: varchar('channel_id').unique(),
  userId: varchar('user_id'),
});

export const slack = pgTable('slack', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  appId: varchar('app_id'),
  authedUserId: varchar('authed_user_id'),
  authedUserToken: varchar('authed_user_token').unique(),
  slackAccessToken: varchar('slack_access_token').unique(),
  botUserId: varchar('bot_user_id'),
  teamId: varchar('team_id'),
  teamName: varchar('team_name'),
  userId: varchar('user_id'),
});

export const notion = pgTable('notion', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  accessToken: varchar('access_token').unique(),
  workspaceId: varchar('workspace_id').unique(),
  databaseId: varchar('database_id').unique(),
  workspaceName: varchar('workspace_name'),
  workspaceIcon: varchar('workspace_icon'),
  userId: varchar('user_id'),
});

export const connections = pgTable('connections', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  type: varchar('type').unique().notNull(),
  discordWebhookId: varchar('discord_webhook_id'),
  notionId: varchar('notion_id'),
  userId: varchar('user_id'),
  slackId: varchar('slack_id'),
});

export const workflows = pgTable('workflows', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  nodes: text('nodes'),
  edges: text('edges'),
  name: varchar('name').notNull(),
  discordTemplate: text('discord_template'),
  notionTemplate: text('notion_template'),
  slackTemplate: text('slack_template'),
  slackChannels: text('slack_channels[]'),
  slackAccessToken: varchar('slack_access_token'),
  notionAccessToken: varchar('notion_access_token'),
  notionDbId: varchar('notion_db_id'),
  flowPath: text('flow_path'),
  cronPath: text('cron_path'),
  publish: boolean('publish').default(false),
  description: text('description').notNull(),
  userId: varchar('user_id').notNull(),
});

// Define relationships
export const userRelations = relations(users, ({ one, many }) => ({
  localGoogleCredential: one(localGoogleCredentials),
  discordWebhooks: many(discordWebhooks),
  slack: many(slack),
  notion: many(notion),
  connections: many(connections),
  workflows: many(workflows),
}));

export const localGoogleCredentialRelations = relations(localGoogleCredentials, ({ one }) => ({
  user: one(users, {
    fields: [localGoogleCredentials.userId],
    references: [users.id],
  }),
}));

export const discordWebhookRelations = relations(discordWebhooks, ({ one, many }) => ({
  user: one(users, {
    fields: [discordWebhooks.userId],
    references: [users.clerkId],
  }),
  connections: many(connections),
}));

export const slackRelations = relations(slack, ({ one, many }) => ({
  user: one(users, {
    fields: [slack.userId],
    references: [users.clerkId],
  }),
  connections: many(connections),
}));

export const notionRelations = relations(notion, ({ one, many }) => ({
  user: one(users, {
    fields: [notion.userId],
    references: [users.clerkId],
  }),
  connections: many(connections),
}));

export const connectionRelations = relations(connections, ({ one }) => ({
  discordWebhook: one(discordWebhooks, {
    fields: [connections.discordWebhookId],
    references: [discordWebhooks.id],
  }),
  notion: one(notion, {
    fields: [connections.notionId],
    references: [notion.id],
  }),
  user: one(users, {
    fields: [connections.userId],
    references: [users.clerkId],
  }),
  slack: one(slack, {
    fields: [connections.slackId],
    references: [slack.id],
  }),
}));

export const workflowRelations = relations(workflows, ({ one }) => ({
  user: one(users, {
    fields: [workflows.userId],
    references: [users.clerkId],
  }),
}));
