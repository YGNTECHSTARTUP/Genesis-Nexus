import { Hono } from 'hono'
import indes from './routes/indes'

const app = new Hono()
app.route('/',indes)
app.get('/', (c) => {
  console.log(c);
  return c.text('Hello Hono!')
})

export default app
