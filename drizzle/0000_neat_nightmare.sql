CREATE TABLE IF NOT EXISTS "connections" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"type" varchar NOT NULL,
	"discord_webhook_id" varchar,
	"notion_id" varchar,
	"user_id" varchar,
	"slack_id" varchar,
	CONSTRAINT "connections_type_unique" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discord_webhooks" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"webhook_id" varchar,
	"url" varchar,
	"name" varchar,
	"guild_name" varchar,
	"guild_id" varchar,
	"channel_id" varchar,
	"user_id" varchar,
	CONSTRAINT "discord_webhooks_webhook_id_unique" UNIQUE("webhook_id"),
	CONSTRAINT "discord_webhooks_url_unique" UNIQUE("url"),
	CONSTRAINT "discord_webhooks_channel_id_unique" UNIQUE("channel_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "local_google_credentials" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"access_token" varchar NOT NULL,
	"folder_id" varchar,
	"page_token" varchar,
	"channel_id" serial NOT NULL,
	"subscribed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"user_id" serial NOT NULL,
	CONSTRAINT "local_google_credentials_access_token_unique" UNIQUE("access_token"),
	CONSTRAINT "local_google_credentials_channel_id_unique" UNIQUE("channel_id"),
	CONSTRAINT "local_google_credentials_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notion" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"access_token" varchar,
	"workspace_id" varchar,
	"database_id" varchar,
	"workspace_name" varchar,
	"workspace_icon" varchar,
	"user_id" varchar,
	CONSTRAINT "notion_access_token_unique" UNIQUE("access_token"),
	CONSTRAINT "notion_workspace_id_unique" UNIQUE("workspace_id"),
	CONSTRAINT "notion_database_id_unique" UNIQUE("database_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "slack" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"app_id" varchar,
	"authed_user_id" varchar,
	"authed_user_token" varchar,
	"slack_access_token" varchar,
	"bot_user_id" varchar,
	"team_id" varchar,
	"team_name" varchar,
	"user_id" varchar,
	CONSTRAINT "slack_authed_user_token_unique" UNIQUE("authed_user_token"),
	CONSTRAINT "slack_slack_access_token_unique" UNIQUE("slack_access_token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"clerk_id" varchar NOT NULL,
	"name" varchar,
	"lname" varchar,
	"email" varchar NOT NULL,
	"profile_image" varchar,
	"tier" varchar DEFAULT 'Free',
	"credits" varchar DEFAULT '10',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"local_google_id" varchar,
	"google_resource_id" varchar,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_local_google_id_unique" UNIQUE("local_google_id"),
	CONSTRAINT "users_google_resource_id_unique" UNIQUE("google_resource_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workflows" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"nodes" text,
	"edges" text,
	"name" varchar NOT NULL,
	"discord_template" text,
	"notion_template" text,
	"slack_template" text,
	"slack_channels[]" text,
	"slack_access_token" varchar,
	"notion_access_token" varchar,
	"notion_db_id" varchar,
	"flow_path" text,
	"cron_path" text,
	"publish" boolean DEFAULT false,
	"description" text NOT NULL,
	"user_id" varchar NOT NULL
);
