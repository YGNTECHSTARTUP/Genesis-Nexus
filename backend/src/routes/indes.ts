import { Hono } from 'hono'

const indes = new Hono()


indes.get('/user', (c) => {
  return c.text('Hello Hono from routes folder!')
})

export default indes
