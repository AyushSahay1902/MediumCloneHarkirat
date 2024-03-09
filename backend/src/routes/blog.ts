import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async(c, next) => {
    //extract the user ID
    const authHeader = c.req.header("authorization") || "";
    //pass it down to the handeler
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        c.set('userId', user.id);
        await next();
    }else{
        c.status(403);
        return c.json({ error: "unauthorized" })
    }
    
})

blogRouter.post('/', async(c) => {
    const body = await c.req.json();
    const authorId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId.toString() // Convert authorId to string
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

//Todo: add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    const blogs = prisma.post.findMany();
    return c.json({
        blogs
    });

})

blogRouter.get('/:id', async(c) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.post.findFirst({
            where:{
                id: String(id) // Convert id to string
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

})


