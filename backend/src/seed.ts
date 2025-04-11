import { db } from "./db"; // your DB client
import {
  users,
  socialLinks,
  skills,
  freelancerSkills,
  freelancers,
  freelancerProjects,
  clients,
  projects,
  trustScores,
} from "./schema"; // adjust path if needed
import { randomUUID } from "crypto";

// Dummy arrays for skills and other data
const skillSet = ["React", "Node.js", "Figma", "TypeScript", "Python"];
const tools = ["Figma", "VS Code", "Sketch", "GitHub"];
const certifications = ["Certified UX Pro", "React Ninja", "Node Master"];
const collaborationTools = ["Slack", "Zoom", "Teams"];
const cities = ["New York", "San Francisco", "Berlin", "Toronto", "Bangalore"];

// Main SEED FUNCTION
export async function seedDatabase() {
  // 1. Insert base skills
  await db.insert(skills).values(skillSet.map((name) => ({ name })));

  const allSkills = await db.select().from(skills);

  for (let i = 0; i < 10; i++) {
    const isFreelancer = i < 5;
    const id = randomUUID();
    const username = isFreelancer ? `freelancer${i}` : `client${i - 5}`;
    const fullName = isFreelancer ? `Freelancer ${i}` : `Client ${i - 5}`;
    const email = `${username}@example.com`;
    const city = cities[i % cities.length];
    const country = "USA";

    // 2. Users
    await db.insert(users).values({
      id,
      fullName,
      username,
      email,
      country,
      city,
      languagesSpoken: ["English"],
      userType: isFreelancer ? "freelancer" : "client",
      userProfile: isFreelancer
        ? `Experienced ${skillSet[i % skillSet.length]} specialist`
        : "Looking for skilled freelancers",
    });

    // 3. Social Links
    await db.insert(socialLinks).values({
      userId: id,
      linkedIn: `https://linkedin.com/in/${username}`,
      github: `https://github.com/${username}`,
      personalWebsite: `https://${username}.dev`,
    });

    // 4. Trust Scores
    await db.insert(trustScores).values({
      userId: id,
      score: (4 + Math.random()).toFixed(1),
    });

    if (isFreelancer) {
      // 5. Freelancer Table
      await db.insert(freelancers).values({
        userId: id,
        experienceYears: 1 + Math.floor(Math.random() * 5),
        portfolioLinks: [`https://${username}-portfolio.com`],
        hourlyRate: (20 + Math.random() * 30).toFixed(2),
        availability: "part-time",
        freelancerType: "UI/UX Designer",
        certifications: [certifications[i % certifications.length]],
        tools: [tools[i % tools.length]],
        workStyle: "async",
      });

      // 6. Freelancer Skills (2 random)
      const chosenSkills = allSkills.sort(() => 0.5 - Math.random()).slice(0, 2);
      for (const skill of chosenSkills) {
        await db.insert(freelancerSkills).values({
          userId: id,
          skillId: skill.id,
        });
      }

      // 7. Freelancer Projects
      await db.insert(freelancerProjects).values({
        userId: id,
        title: `Project ${i + 1}: Modern UI Kit`,
        description: `Designed a modern interface using ${chosenSkills[0].name}`,
        tags: chosenSkills.map((s) => s.name),
      });
    } else {
      // 8. Client Table
      await db.insert(clients).values({
        userId: id,
        companyName: `${fullName} Co.`,
      });

      // 9. Projects
      await db.insert(projects).values({
        clientId: id,
        title: `Redesign Project ${i}`,
        description: "Looking for a talented designer/developer",
        requiredSkills: [skillSet[i % skillSet.length]],
        budget: (1000 + Math.random() * 4000).toFixed(0),
        experienceLevel: "intermediate",
        startDate: new Date().toISOString(),
        duration: "3 months",
        numFreelancers: 1,
        collaborationStyle: "async",
        communicationTools: [collaborationTools[i % collaborationTools.length]],
        visibility: "public",
      });
    }
  }

  console.log("🌱 Seeded 10 users with complete dummy data!");
}

// Run the seed function
seedDatabase().catch((err) => {
  console.error("❌ Seed failed:", err);
});
