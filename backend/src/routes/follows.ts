import express from "express"
import Follows from "../models/follow"

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const follow = await Follows.create(req.body.followeeId, req.body.followerId)
        return res.status(201).json({ follow })
    } catch (err) {
        return next(err)
    }
})

router.delete("/", async (req, res, next) => {
    try {
        const follow = await Follows.remove(req.body.followeeId, req.body.followerId)
        return res.status(201).json({ follow })
    } catch (err) {
        return next(err)
    }
})

export default router