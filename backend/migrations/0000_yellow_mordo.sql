CREATE TYPE "public"."availability" AS ENUM('part-time', 'full-time', 'custom');--> statement-breakpoint
CREATE TYPE "public"."collaboration_style" AS ENUM('async', 'sync', 'mixed');--> statement-breakpoint
CREATE TYPE "public"."experience_level" AS ENUM('beginner', 'intermediate', 'expert');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('freelancer', 'client');--> statement-breakpoint
CREATE TYPE "public"."visibility" AS ENUM('invite-only', 'public');--> statement-breakpoint
CREATE TYPE "public"."work_style" AS ENUM('async', 'sync', 'agile', 'other');--> statement-breakpoint
CREATE TABLE "clients" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"company_name" text
);
--> statement-breakpoint
CREATE TABLE "freelancer_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"title" text,
	"description" text,
	"tags" text[]
);
--> statement-breakpoint
CREATE TABLE "freelancer_skills" (
	"user_id" uuid,
	"skill_id" integer,
	CONSTRAINT "freelancer_skills_user_id_skill_id_pk" PRIMARY KEY("user_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "freelancers" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"experience_years" integer NOT NULL,
	"portfolio_links" text[],
	"hourly_rate" numeric,
	"availability" "availability",
	"preferred_start_date" date,
	"freelancer_type" text,
	"certifications" text[],
	"tools" text[],
	"work_style" "work_style"
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"required_skills" text[],
	"budget" numeric,
	"experience_level" "experience_level",
	"start_date" date,
	"duration" text,
	"num_freelancers" integer,
	"collaboration_style" "collaboration_style",
	"communication_tools" text[],
	"visibility" "visibility",
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "skills_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"linkedin" text,
	"github" text,
	"twitter" text,
	"personal_website" text
);
--> statement-breakpoint
CREATE TABLE "trust_scores" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"score" numeric DEFAULT '0',
	"calculated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"profile_picture" text,
	"country" text,
	"city" text,
	"languages_spoken" text[],
	"user_type" "user_type" NOT NULL,
	"user_profile" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "freelancer_projects" ADD CONSTRAINT "freelancer_projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "freelancer_skills" ADD CONSTRAINT "freelancer_skills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "freelancer_skills" ADD CONSTRAINT "freelancer_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "freelancers" ADD CONSTRAINT "freelancers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trust_scores" ADD CONSTRAINT "trust_scores_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;