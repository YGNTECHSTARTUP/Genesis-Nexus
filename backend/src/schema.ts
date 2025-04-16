import {
  pgTable,
  uuid,
  serial,
  text,
  timestamp,
  integer,
  numeric,
  varchar,
  date,
  primaryKey,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";

// Enums
export const userTypeEnum = pgEnum("user_type", ["freelancer", "client"]);
export const availabilityEnum = pgEnum("availability", [
  "part-time",
  "full-time",
  "custom",
]);
export const experienceLevelEnum = pgEnum("experience_level", [
  "beginner",
  "intermediate",
  "expert",
]);
export const workStyleEnum = pgEnum("work_style", [
  "async",
  "sync",
  "agile",
  "other",
]);
export const collaborationStyleEnum = pgEnum("collaboration_style", [
  "async",
  "sync",
  "mixed",
]);
export const visibilityEnum = pgEnum("visibility", [
  "invite-only",
  "public",
]);

// Users (Base)
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number"),
  profilePicture: text("profile_picture"),
  country: text("country"),
  city: text("city"),
  languagesSpoken: text("languages_spoken").array(),
  userType: userTypeEnum("user_type").notNull(),
  userProfile: text("user_profile"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Social Links
export const socialLinks = pgTable("social_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  linkedIn: text("linkedin"),
  github: text("github"),
  twitter: text("twitter"),
  personalWebsite: text("personal_website"),
});

// Skills (Global)
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// Freelancer Skills (Join Table)
export const freelancerSkills = pgTable(
  "freelancer_skills",
  {
    userId: uuid("user_id").notNull().references(() => users.id, {
      onDelete: "cascade",
    }),
    skillId: integer("skill_id").notNull().references(() => skills.id, {
      onDelete: "cascade",
    }),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.skillId),
  })
);

// Freelancers
export const freelancers = pgTable("freelancers", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  experienceYears: integer("experience_years").notNull(),
  portfolioLinks: text("portfolio_links").array(),
  hourlyRate: numeric("hourly_rate"),
  availability: availabilityEnum("availability"),
  preferredStartDate: date("preferred_start_date"),
  freelancerType: text("freelancer_type"),
  certifications: text("certifications").array(),
  tools: text("tools").array(),
  workStyle: workStyleEnum("work_style"),
});

// Freelancer Past Projects
export const freelancerProjects = pgTable("freelancer_projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title"),
  description: text("description"),
  tags: text("tags").array(),
});

// Clients
export const clients = pgTable("clients", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  companyName: text("company_name"),
});

// Client Projects
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requiredSkills: text("required_skills").array(),
  budget: numeric("budget"),
  experienceLevel: experienceLevelEnum("experience_level"),
  startDate: date("start_date"),
  duration: text("duration"),
  numFreelancers: integer("num_freelancers"),
  collaborationStyle: collaborationStyleEnum("collaboration_style"),
  communicationTools: text("communication_tools").array(),
  visibility: visibilityEnum("visibility"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const projectQuestions = pgTable("project_questions", {
  id: uuid("id").defaultRandom().primaryKey(),

  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),

  question: text("question").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Trust Scores
export const trustScores = pgTable("trust_scores", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  score: numeric("score").default("0"),
  calculatedAt: timestamp("calculated_at", { withTimezone: true }).defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  reviewerId: uuid("reviewer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  revieweeId: uuid("reviewee_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // from 1 to 5
  comment: text("comment"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Requests (Client to Freelancer)
export const requests = pgTable("requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  freelancerId: uuid("freelancer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  message: text("message"),
  status: text("status").default("pending"), // could convert this to an enum if needed
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const projectTimelines = pgTable("project_timelines", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  task: text("task").notNull(),
  durationDays: integer("duration_days").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
});