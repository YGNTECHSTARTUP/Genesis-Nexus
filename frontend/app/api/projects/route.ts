import { NextResponse } from "next/server"

// This is a mock API route to simulate the backend
export async function GET(request: Request) {
  const url = new URL(request.url)
  const clientId = url.searchParams.get("id")

  try {
    // In a real application, you would fetch this data from your database
    const allProjects = [
      {
        id: "proj1",
        title: "E-commerce Website Redesign",
        description:
          "Looking for an experienced web developer to redesign our e-commerce website. The project involves updating the UI/UX, improving mobile responsiveness, and optimizing checkout flow.",
        budget: 5000,
        deadline: "2023-12-15",
        status: "open",
        clientId: "client1",
        createdAt: "2023-09-01",
      },
      {
        id: "proj2",
        title: "Mobile App Development for Fitness Tracking",
        description:
          "We need a mobile app developer to create a fitness tracking application for iOS and Android. The app should track workouts, nutrition, and provide personalized recommendations.",
        budget: 8000,
        deadline: "2024-01-20",
        status: "in_progress",
        clientId: "client1",
        createdAt: "2023-08-15",
      },
      {
        id: "proj3",
        title: "Brand Identity Design",
        description:
          "Seeking a graphic designer to create a complete brand identity package including logo, color palette, typography, and brand guidelines for a new tech startup.",
        budget: 3000,
        deadline: "2023-11-30",
        status: "completed",
        clientId: "client2",
        createdAt: "2023-07-10",
      },
      {
        id: "proj4",
        title: "Content Management System Integration",
        description:
          "Need a developer to integrate a custom CMS into our existing website. The CMS should allow easy content updates, user management, and SEO optimization.",
        budget: 4500,
        deadline: "2023-12-05",
        status: "open",
        clientId: "client3",
        createdAt: "2023-09-20",
      },
      {
        id: "proj5",
        title: "Social Media Marketing Campaign",
        description:
          "Looking for a marketing specialist to create and execute a comprehensive social media campaign across multiple platforms to increase brand awareness and engagement.",
        budget: 2500,
        deadline: "2023-11-15",
        status: "in_progress",
        clientId: "client2",
        createdAt: "2023-08-25",
      },
      {
        id: "proj6",
        title: "Database Optimization and Migration",
        description:
          "We need a database expert to optimize our current database structure and migrate from MySQL to PostgreSQL while ensuring minimal downtime and data integrity.",
        budget: 6000,
        deadline: "2024-02-10",
        status: "open",
        clientId: "client3",
        createdAt: "2023-10-05",
      },
      {
        id: "proj7",
        title: "Video Production for Product Launch",
        description:
          "Seeking a video producer to create a high-quality promotional video for our upcoming product launch. The video should be 2-3 minutes long and showcase key features.",
        budget: 7500,
        deadline: "2023-12-20",
        status: "cancelled",
        clientId: "client1",
        createdAt: "2023-09-15",
      },
      {
        id: "proj8",
        title: "SEO Audit and Optimization",
        description:
          "Need an SEO specialist to perform a comprehensive audit of our website and implement optimization strategies to improve our search engine rankings.",
        budget: 3500,
        deadline: "2023-11-25",
        status: "completed",
        clientId: "client4",
        createdAt: "2023-08-10",
      },
    ]

    // Filter projects by clientId if provided
    const filteredProjects = clientId ? allProjects.filter((project) => project.clientId === clientId) : allProjects

    return NextResponse.json({ projects: filteredProjects })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
