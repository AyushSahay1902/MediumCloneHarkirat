import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>();

app.use('/a[i/v1/blog/*', async(c, next) => {
  
  //get the header
  const header = c.req.header("authorization") || "";
  //Bearer token
  const token = header.split(" ")[1];
  //verify the header
  //@ts-ignore
  const response = await verify(header, c.env.JWT_SECRET)
  //if header is correct, we will proceed
  if(response.id){
    next()
  }else{
    c.status(403)
    return c.json({error: "unauthorized"})
  }
  //if not. then the user a 403 status
  await next();
})

app.post('/api/v1/signup', async (c) => {
  // const dburl = c.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    }
  });

  // if (!user) {
  //   c.status(403);
  //   return c.json({ error: "user not found" });
  // }
  //@ts-ignore
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
})

app.post('/api/v1/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    }
  });
  if(!user){
    c.status(403);
    return c.json({ error: "user not found" });
  }
  //@ts-ignore
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
})
// --------------------------------------------------------//
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