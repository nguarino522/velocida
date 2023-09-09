import express from "express"
import prisma from "../prisma"

const router = express.Router()

router.get("/", async (req, res) => {
    let dbConnected = false

    try {
        dbConnected = await prisma.$queryRaw`SELECT 1` ? true : false
        res.json({
            uptime: process.uptime(),
            message: "ok",
            date: new Date(Date.now()).toISOString(),
            dbConnected: dbConnected
        })
    } catch (error){
        console.log(error)
        res.statusCode = 500;
        res.json({
            uptime: process.uptime(),
            message: error,
            date: new Date(Date.now()).toISOString(),
            dbConnected: dbConnected
        })
    }
})

export default router