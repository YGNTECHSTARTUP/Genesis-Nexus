ALTER TABLE "requests" ALTER COLUMN "client_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "freelancer_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "project_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "reviewer_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "reviewee_id" SET NOT NULL;