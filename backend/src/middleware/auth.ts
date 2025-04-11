// middleware/auth.ts
import { clerkClient, User } from '@clerk/clerk-sdk-node';
import type { MiddlewareHandler } from 'hono';
import { Context } from 'hono';

// Extend the Context interface to include the "authUser" key
declare module 'hono' {
  interface Context {
    authUser: User;
  }
}

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const session = await clerkClient.sessions.verifySession(token, '');
    const user = await clerkClient.users.getUser(session.userId);

    // Use the correct User type from @clerk/clerk-sdk-node
    c.set('authUser', user as any);

    await next();
  } catch (err) {
    console.error('[Auth Error]', err);
    return c.json({ error: 'Invalid token' }, 401);
  }
};
