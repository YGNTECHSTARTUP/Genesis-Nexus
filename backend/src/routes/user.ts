import {Hono} from 'hono'
// import {authMiddleware} from '../middleware/auth';
// devAuthMiddleware
import { db } from '../db';
import { users, freelancers, clients ,projects, requests, reviews, projectTimelines} from '../schema';
import type { User } from '@clerk/backend';
import { eq } from 'drizzle-orm';
import { devAuthMiddleware } from '../middleware/newAuth';
declare module 'hono' {
    interface ContextVariableMap {
      authUser: User;
    }
  }

const user =new Hono();
// user.use(devAuthMiddleware);


user.post('/register',async (c)=>{
    const user = c.get('authUser') as User;
    // const clerkUserId = user.id;
    const profilePicture = user.imageUrl ?? '';
    const body = await c.req.json();
    const {
        fullName,
        username,
        email,
        phoneNumber,
        country,
        city,
        languagesSpoken,
        userType, // 'freelancer' | 'client'
        userProfile
      }: {
        fullName: string;
        username: string;
        email: string;
        phoneNumber?: string;
        country?: string;
        city?: string;
        languagesSpoken?: string[];
        userType: 'freelancer' | 'client';
        userProfile?: string;
      } = body;
      try {
        await db.insert(users).values({
          id:crypto.randomUUID(),
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
        if (userType === 'freelancer') {
            const {
              experienceYears,
              portfolioLinks,
              hourlyRate,
              availability,
              preferredStartDate,
              freelancerType,
              certifications,
              tools,
              workStyle
            }: {
              experienceYears: number;
              portfolioLinks?: string[];
              hourlyRate?: number;
              availability?: 'part-time' | 'full-time' | 'custom';
              preferredStartDate?: string;
              freelancerType?: string;
              certifications?: string[];
              tools?: string[];
              workStyle?: 'async' | 'sync' | 'agile' | 'other';
            } = body;
      
            await db.insert(freelancers).values({
              userId: crypto.randomUUID(),
              experienceYears,
              portfolioLinks,
              hourlyRate:hourlyRate !== undefined ? hourlyRate.toString() : undefined,
              availability,
              preferredStartDate,
              freelancerType,
              certifications,
              tools,
              workStyle
            });
          } else if (userType === 'client') {
            const { companyName }: { companyName: string } = body;
      
            await db.insert(clients).values({
              userId: crypto.randomUUID(),
              companyName
            });
          }
      
          return c.json({ success: true });
        } catch (err) {
          console.error('[Register Error]', err);
          return c.json({ error: 'Registration failed' }, 500);
        }

})
user.get('/best',async(c)=>{
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
user.post('/project', async (c) => {
    const user = c.get('authUser') as User;
    const clientId = user.id; // clerk ID == users.id
  
    const body = await c.req.json();
  
    const {
      title,
      description,
      requiredSkills,
      budget,
      experienceLevel,
      startDate,
      duration,
      numFreelancers,
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
  
    try {
      await db.insert(projects).values({
        clientId,
        title,
        description,
        requiredSkills,
        budget: budget !== undefined ? budget.toString() : undefined,
        experienceLevel,
        startDate,
        duration,
        numFreelancers,
        collaborationStyle,
        communicationTools,
        visibility,
      });
      return c.json({ success: true });
    } catch (err) {
      console.error('[Create Project Error]', err);
      return c.json({ error: 'Project creation failed' }, 500);
    }
  });
  user.get('/projects', async (c) => {
    const user = c.get('authUser') as User;
    const clientId = user.id;
  
    try {
      const userProjects = await db
        .select()
        .from(projects)
        .where(eq(projects.clientId, clientId));
  
      return c.json({ projects: userProjects });
    } catch (err) {
      console.error('[Get Projects Error]', err);
      return c.json({ error: 'Failed to fetch projects' }, 500);
    }
  });
  
  user.post('/requests', async (c) => {
  
    const { clientId, freelancerId, projectId, message } = await c.req.json()
  
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
  user.post('/review',async(c)=>{

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
  
  
export default user;
