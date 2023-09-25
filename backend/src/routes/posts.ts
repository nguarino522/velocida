import express from "express"
import Posts from "../models/post"

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const post = await Posts.create(req.body)
        return res.status(201).json({ post })
    } catch (err) {
        return next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const post = await Posts.remove(Number(req.params.id))
        return res.json({ deleted: post })
    } catch (err) {
        return next(err)
    }
})

export default router