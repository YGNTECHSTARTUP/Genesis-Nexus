import { Hono } from 'hono'
import indes from './routes/indes'
import ais from './routes/ai'
import user from './routes/user';
import { cors } from 'hono/cors';
import { env } from 'hono/adapter';


const app = new Hono()
app.use("*", cors({
  origin: "*", 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
  credentials:false
}))
declare module "hono"  {
    interface ContextVariableMap {
      AIs: Ai;
    }
  }
  app.use("*",async(c,next)=>{
    const { AI } = env<{ AI: Ai }>(c);
    c.set('AIs',AI);
    await next();
  })
app.route('/user',user)
app.route('/ai',ais);

app.get('/', (c) => {
  console.log(c);
  const user=""
  return c.text('Hello Hono!')
})

export default app
