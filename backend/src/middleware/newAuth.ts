import { User } from '@clerk/backend'
import { MiddlewareHandler } from 'hono'

export const devAuthMiddleware: MiddlewareHandler = async (c, next) => {
  // Simulated test user object (you can customize this)
  const testUser = {
    id:'b3c29eaa-b05a-489e-a35e-92ae27b9be2f'    ,
    firstName: 'Dev',
    lastName: 'Tester',
    username: 'devtester',
    emailAddresses: [{ emailAddress: 'dev@test.com' }],
    imageUrl: 'https://via.placeholder.com/150',
  }

  c.set('authUser', testUser as any) // same key your routes expect
  await next()
}
