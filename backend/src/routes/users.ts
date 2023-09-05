import express from "express"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
            }
        })
        return res.status(201).json({user})
    } catch (err) {
        return next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany()
        return res.json({users})
    } catch (err) {
        return next(err)
    }
})

export default router