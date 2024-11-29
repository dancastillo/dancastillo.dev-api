CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS "public"."posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"content" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT NULL,
	"external_id" varchar DEFAULT 'pos_' || gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "external_id_idx" ON "posts" USING btree ("external_id");
