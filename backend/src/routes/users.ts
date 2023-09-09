import express from "express"
import User from "../models/user"
import prisma from "../prisma"

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {      
        const user = await User.register(req.body)  
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

router.get("/:username", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany()
        return res.json({users})
    } catch (err) {
        return next(err)
    }
})

router.patch("/:username")

export default router