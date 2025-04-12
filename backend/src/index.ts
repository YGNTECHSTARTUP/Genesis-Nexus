import { Hono } from 'hono'
import indes from './routes/indes'
import ais from './routes/ai'
import user from './routes/user';
import { cors } from 'hono/cors';


const app = new Hono()
app.use("*", cors({
  origin: ["http://localhost:3000"], 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
  credentials:false
}))
app.route('/user',user)
app.route('/ai',ais);

app.get('/', (c) => {
  console.log(c);
  const user=""
  return c.text('Hello Hono!')
})

export default app
