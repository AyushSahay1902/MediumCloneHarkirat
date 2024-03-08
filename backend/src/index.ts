import { Hono } from 'hono'


const app = new Hono()

app.post('/api/v1/signup', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})


app.put('/api/v1/blog', (c) => {
  return c.text('Hello')
})

export default app


//postgresql://sahayayush385:************@ep-round-hat-a5c174tm.us-east-2.aws.neon.tech/sahayDatabase?sslmode=require

//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMTdmNzQ3M2UtYTVkMy00NWE1LTk4NzAtMWI0NDE5NjExMjdkIiwidGVuYW50X2lkIjoiODc3ZjQ1NGZlYzhjZDdlMTg1MDVlYWQ2ZDMxNzQ2Y2ZmZjgzOTQ4NTUwYTkxZmJjOGI1OWMwNTE0ZjhiZjQ0NSIsImludGVybmFsX3NlY3JldCI6IjkzZjM2NjhhLTkwNzktNGIwZi1iZjU1LTk3MmFiNDMzYjcxNiJ9.aXhN9x6_iaMi_q3ECGDrtC0rODG11YdX6JJ6QRw8Src"