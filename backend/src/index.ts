import { Hono } from 'hono'
import indes from './routes/indes'
import ais from './routes/ai'


const app = new Hono()
app.route('/',indes)
ais.route('/ai',ais);
app.get('/', (c) => {
  console.log(c);
  const user=""
  return c.text('Hello Hono!')
})

export default app
