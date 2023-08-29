/** Main app file for Velocida. */

import express from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

async function main() {
    // ... you will write your Prisma Client queries here

    await prisma.user.create({
        data: {
            name: 'Josh',
            email: 'jguarino722@gmail.com',
            posts: {
                create: { title: 'hold my beer' },
            },
            profile: {
                create: { bio: 'REEEEEEE!!!' },
            },
        },
    })

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    })
    console.dir(allUsers, { depth: null })
}


app.get("/test", (req, res) => {
    console.log(process.env.DATABASE_URL)
    res.send("IS THIS THING ON?!?!?! TEST testing")
})

app.post("/create_user", async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
            }
        })
        console.log(user)
        return res.status(201).json({user})
    } catch (err) {
        return next(err)
    }


})

export default app