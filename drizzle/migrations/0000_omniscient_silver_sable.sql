CREATE TYPE "public"."taskLabels" AS ENUM('bug', 'feature', 'documentation');--> statement-breakpoint
CREATE TYPE "public"."taskPriorities" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."taskStatuses" AS ENUM('backlog', 'todo', 'in progress', 'done', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."updateStatuses" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'SHIPPED');--> statement-breakpoint
CREATE TABLE "changelogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"updateId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "productTags" (
	"productId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "productTags_productId_tagId_pk" PRIMARY KEY("productId","tagId")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" "taskStatuses" DEFAULT 'backlog',
	"priority" "taskPriorities" DEFAULT 'medium',
	"label" "taskLabels" DEFAULT 'feature',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "updates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "updateStatuses" DEFAULT 'PENDING',
	"version" text,
	"media" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"productId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "changelogs" ADD CONSTRAINT "changelogs_updateId_updates_id_fk" FOREIGN KEY ("updateId") REFERENCES "public"."updates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productTags" ADD CONSTRAINT "productTags_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productTags" ADD CONSTRAINT "productTags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "updates" ADD CONSTRAINT "updates_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;