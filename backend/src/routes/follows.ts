import express from "express"
import Follows from "../models/follow"
import { ensureLoggedIn } from "../middleware/auth"

const router = express.Router()

router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const follow = await Follows.create(req.body.followeeId, req.body.followerId)
        return res.status(201).json({ follow })
    } catch (err) {
        return next(err)
    }
})

router.delete("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const follow = await Follows.remove(req.body.followeeId, req.body.followerId)
        return res.status(201).json({ follow })
    } catch (err) {
        return next(err)
    }
})

export default router