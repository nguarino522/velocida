import express from "express"
import Posts from "../models/post"
import Threads from "../models/thread"
import { ensureAdmin, ensureLoggedIn } from "../middleware/auth"

const router = express.Router()

router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const post = await Posts.create(req.body)
        return res.status(201).json({ post })
    } catch (err) {
        return next(err)
    }
})

router.delete("/:id", ensureAdmin, async (req, res, next) => {
    try {
        const post = await Posts.remove(Number(req.params.id))
        return res.json({ deleted: post })
    } catch (err) {
        return next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const post = await Posts.get(Number(req.params.id))
        return res.json({ post })
    } catch (err) {
        return next(err)
    }
})

export default router