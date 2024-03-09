import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

blogRouter.use('/*', (c, next) => {
    //extract the user ID
    //pass it down to the handeler
    next();
})

blogRouter.post('/', async(c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: String(1)
        }
    })
    return c.json({
        id: blog.id
    })
})
blogRouter.put('/', async(c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
    return c.text('Blog Updated!')
})
blogRouter.get('/', async(c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.post.findFirst({
            where:{
                id: body.id
            }
        })
        return c.json({
            blog
        });
    }catch(e){
        c.status(411);
        return c.json({
            error: "Blog not found"
        });
    }
   
    return c.text('Hello Hono2!')
})
//Todo: add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    const blogs = prisma.post.findMany();
    return c.json({
        blogs
    });

    return c.text('Hello Hono2!')
})


