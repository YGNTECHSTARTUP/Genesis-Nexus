ALTER TABLE "clients" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "freelancer_projects" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "freelancer_skills" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "freelancers" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "client_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "client_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "freelancer_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "reviewer_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "reviewee_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "social_links" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "trust_scores" ALTER COLUMN "user_id" SET DATA TYPE text;