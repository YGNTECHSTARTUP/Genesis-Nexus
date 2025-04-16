import {Hono} from 'hono'
// import {authMiddleware} from '../middleware/auth';
// devAuthMiddleware
import { db } from '../db';
import { users, freelancers, clients ,projects, requests, reviews, projectTimelines, projectQuestions} from '../schema';
import type { User } from '@clerk/backend';
import { eq, like } from 'drizzle-orm';
import { devAuthMiddleware } from '../middleware/newAuth';
import { json } from 'drizzle-orm/gel-core';
declare module 'hono' {
    interface ContextVariableMap {
      authUser: User;
    }
  }

const user =new Hono();
// user.use(devAuthMiddleware);




user.post('/register', async (c) => {
  try {
    const data = await c.req.json();

    const {
      userId,
      profilePicture,
      fullName,
      username,
      email,
      phoneNumber,
      country,
      city,
      languagesSpoken = [],
      userType,
      userProfile,
      companyName
    } = data

    if (userType !== 'client') {
      return c.json({ error: 'Only client registration is allowed here' }, 400)
    }

    await db.insert(users).values({
      id: userId,
      fullName,
      username,
      email,
      phoneNumber,
      profilePicture,
      country,
      city,
      languagesSpoken,
      userType,
      userProfile
    })

    await db.insert(clients).values({
      userId,
      companyName
    })

    return c.json({ success: true })
  } catch (err: any) {
    console.error('[Register Error]', err)
    return c.json({ error: err.message }, 500)
  }
})

user.post('/register-freelancer', async (c) => {
  try {
    const data = await c.req.json();

    const {
      userId,
      profilePicture,
      fullName,
      username,
      email,
      phoneNumber,
      country,
      city,
      languagesSpoken = [],
      userType,
      userProfile,
      experienceYears,
      portfolioLinks = [],
      hourlyRate,
      availability,
      preferredStartDate,
      freelancerType,
      certifications = [],
      tools = [],
      workStyle
    } = data;

    if (userType !== 'freelancer') {
      return c.json({ error: 'Only freelancer registration is allowed here' }, 400);
    }

    await db.insert(users).values({
      id: userId,
      fullName,
      username,
      email,
      phoneNumber,
      profilePicture,
      country,
      city,
      languagesSpoken,
      userType,
      userProfile
    });

    await db.insert(freelancers).values({
      userId,
      experienceYears: experienceYears ?? 0,
      portfolioLinks: portfolioLinks ?? [],
      hourlyRate: hourlyRate ?? 0, // <--- Avoid null, use 0 instead or default rate
      availability,
      preferredStartDate: preferredStartDate ? new Date(preferredStartDate) : null,
      freelancerType,
      certifications: certifications ?? [],
      tools: tools ?? [],
      workStyle
    });

    return c.json({ success: true });
  } catch (err: any) {
    console.error('[Freelancer Register Error]', err);
    return c.json({ error: err.message }, 500);
  }
});




user.get('/freelancers',async(c)=>{
    try {
        const allFreelancers = await db
          .select({
            id: users.id,
            fullName: users.fullName,
            username: users.username,
            email: users.email,
            profilePicture: users.profilePicture,
            country: users.country,
            city: users.city,
            experienceYears: freelancers.experienceYears,
            hourlyRate: freelancers.hourlyRate,
            availability: freelancers.availability,
            workStyle: freelancers.workStyle,
            portfolioLinks: freelancers.portfolioLinks
          })
          .from(freelancers)
          .innerJoin(users, eq(users.id, freelancers.userId));
    
        return c.json(allFreelancers);
      } catch (err) {
        console.error('[Fetch Freelancers Error]', err);
        return c.json({ error: 'Failed to fetch freelancers' }, 500);
      }
    
})
user.get('/freelancer/:id', async (c) => {
  const { id } = c.req.param();

  if (!id) {
    return c.json({ error: 'Name parameter is required' }, 400);
  }

  try {
    const matchedFreelancers = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        username: users.username,
        email: users.email,
        profilePicture: users.profilePicture,
        country: users.country,
        city: users.city,
        experienceYears: freelancers.experienceYears,
        hourlyRate: freelancers.hourlyRate,
        availability: freelancers.availability,
        workStyle: freelancers.workStyle,
        portfolioLinks: freelancers.portfolioLinks
      })
      .from(freelancers)
      .innerJoin(users, eq(users.id, freelancers.userId))
      .where(
        // Use ILIKE for case-insensitive partial match if your DB supports it (e.g. PostgreSQL)
        like(users.id, `%${id}%`)
      );

    if (matchedFreelancers.length === 0) {
      return c.json({ message: 'No freelancers found matching that name' });
    }

    return c.json(matchedFreelancers);
  } catch (err) {
    console.error('[Search Freelancers Error]', err);
    return c.json({ error: 'Failed to search freelancers' }, 500);
  }
});


user.post('/project', async (c) => {
  const clientId = c.req.query("id");
  const body = await c.req.json();

  const {
    title,
    description,
    requiredSkills = [],
    budget = 0,
    experienceLevel,
    startDate,
    duration,
    numFreelancers = 1,
    collaborationStyle,
    communicationTools,
    visibility,
  }: {
    title: string;
    description: string;
    requiredSkills?: string[];
    budget?: number;
    experienceLevel?: 'beginner' | 'intermediate' | 'expert';
    startDate?: string;
    duration?: string;
    numFreelancers?: number;
    collaborationStyle?: 'async' | 'sync' | 'mixed';
    communicationTools?: string[];
    visibility?: 'invite-only' | 'public';
  } = body;

  // 🧠 Budget validation
  const baseRate = {
    beginner: 100,
    intermediate: 250,
    expert: 500
  };
  const skillCostFactor = 5;
  const minExpected = baseRate[experienceLevel || 'beginner'] * numFreelancers;
  const skillBonus = requiredSkills.length * skillCostFactor;
  const expectedMinBudget = minExpected + skillBonus;

  if (budget < expectedMinBudget) {
    return c.json({
      error: `Budget too low. For ${experienceLevel} level and ${requiredSkills.length} skills, minimum recommended is $${expectedMinBudget}`,
      suggestedMinBudget: expectedMinBudget,
    }, 400);
  }

  // 🧠 Fetch AI questions
  let questions: string[] = [];
  try {
    const ai = c.get('AIs');
    const prompt = `You are an AI assistant that generates job interview questions.

Generate a list of questions for a job interview based on the following parameters:

- Job role: ${title}
- Experience level: ${experienceLevel}
- Tech stack: ${requiredSkills.join(', ')}
- Question focus: technical
- Number of questions: 10


The questions should be:

- Clear, concise, and suitable for a spoken format (used by a voice assistant).
- Free of special characters like "/", "*", "\", quotes, or anything that may break a speech engine.
- Strictly in English.
- Tailored to the specified tech stack and experience level.

Return ONLY a single valid JSON array like:

["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]

Do not include any explanation or formatting outside of the array.

Thank you ❤️`;

    const result = await ai.run('@cf/meta/llama-3.2-3b-instruct', {
      messages: [{ role: 'user', content: prompt }]
    });

    questions = JSON.parse(result.response);
  } catch (e) {
    console.error('[Question Generation Error]', e);
    return c.json({ error: 'Failed to generate questions' }, 500);
  }

  // ✅ Insert project & questions
  try {
    // Insert project and get the ID
    const [newProject] = await db
      .insert(projects)
      .values({
        clientId,
        title,
        description,
        requiredSkills,
        budget: budget.toString(),
        experienceLevel,
        startDate,
        duration,
        numFreelancers,
        collaborationStyle,
        communicationTools,
        visibility,
      })
      .returning({ id: projects.id });

    // Insert questions
    const questionRows = questions.map((q) => ({
      projectId: newProject.id,
      question: q,
    }));

    await db.insert(projectQuestions).values(questionRows);

    return c.json({ success: true, projectId: newProject.id });
  } catch (err) {
    console.error('[Project or Question Insertion Error]', err);
    return c.json({ error: 'Project creation failed' }, 500);
  }
});
user.get('/client/:userId', async (c) => {
  const userId = c.req.param('userId');

  try {
    const client = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        username: users.username,
        email: users.email,
        phoneNumber: users.phoneNumber,
        profilePicture: users.profilePicture,
        country: users.country,
        city: users.city,
        languagesSpoken: users.languagesSpoken,
        userType: users.userType,
        userProfile: users.userProfile,
        createdAt: users.createdAt,
        companyName: clients.companyName
      })
      .from(users)
      .innerJoin(clients, eq(users.id, clients.userId))
      .where(eq(users.id, userId));

    if (!client.length) {
      return c.json({ error: 'Client not found' }, 404);
    }

    return c.json(client[0]);
  } catch (err) {
    console.error('[Get Client Error]', err);
    return c.json({ error: 'Failed to fetch client data' }, 500);
  }
});


  user.get('/projects', async (c) => {
    // const user = c.get('authUser') as User;
    const clientId =c.req.query("id");
  
    try {
      const userProjects = await db
        .select()
        .from(projects)
        .where(clientId ? eq(projects.clientId, clientId) : undefined);
  
      return c.json({ projects: userProjects });
    } catch (err) {
      console.error('[Get Projects Error]', err);
      return c.json({ error: 'Failed to fetch projects' }, 500);
    }
  });
  user.post('/requests', async (c) => {
    const clientId =c.req.query("id");
    const {  freelancerId, projectId, message } = await c.req.json()
  
    if (!clientId || !freelancerId || !projectId) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
  
    const result = await db.insert(requests).values({
      clientId,
      freelancerId,
      projectId,
      message,
    }).returning()
  
    return c.json({ success: true, request: result[0] })
  })
  user.get('/requests/:clientId', async (c) => {
    // const db = c.get('db')
    const clientId = c.req.param('clientId')
  
    if (!clientId) return c.json({ error: 'Missing client ID' }, 400)
  
    const result = await db.select().from(requests).where(eq(requests.clientId, clientId))
  
    return c.json({ requests: result })
  })
  user.post('/reviews', async (c) => {
  
    const { reviewerId, revieweeId, rating, comment } = await c.req.json()
  
    if (!reviewerId || !revieweeId || !rating) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
  
    if (reviewerId === revieweeId) {
      return c.json({ error: 'You cannot review yourself' }, 400)
    }
  
    if (rating < 1 || rating > 5) {
      return c.json({ error: 'Rating must be between 1 and 5' }, 400)
    }
  
    const result = await db.insert(reviews).values({
      reviewerId,
      revieweeId,
      rating,
      comment,
    }).returning()
  
    return c.json({ success: true, review: result[0] })
  })
  user.get('/reviews/:userId', async (c) => {
    // const db = c.get('db')
    const userId = c.req.param('userId')
  
    if (!userId) return c.json({ error: 'Missing user ID' }, 400)
  
    const result = await db
      .select()
      .from(reviews)
      .where(eq(reviews.revieweeId, userId))
  
    return c.json({ reviews: result })
  })
  user.get('/timeline/:projectId', async (c) => {
    const projectId = c.req.param('projectId');
  
    if (!projectId) {
      return c.json({ error: 'Project ID is required' }, 400);
    }
  
    try {
      const timeline = await db
        .select()
        .from(projectTimelines)
        .where(eq(projectTimelines.projectId, projectId))
        .orderBy(projectTimelines.startDate); // optional: to keep timeline sorted
  
      return c.json({ tasks: timeline });
    } catch (error) {
      console.error('Error fetching timeline:', error);
      return c.json({ error: 'Failed to fetch timeline', details: error }, 500);
    }
  });
  user.get('/questions', async (c) => {
    const projectId = c.req.query('projectId');
  
    if (!projectId) {
      return c.json({ error: 'Missing projectId query parameter' }, 400);
    }
  
    try {
      const rows = await db
        .select({ question: projectQuestions.question })
        .from(projectQuestions)
        .where(eq(projectQuestions.projectId, projectId));
  
      const questions = rows.map(row => row.question);
  
      return c.json(questions);
    } catch (err) {
      console.error('[Fetch Questions Error]', err);
      return c.json({ error: 'Failed to fetch questions' }, 500);
    }
  });
  
export default user;
