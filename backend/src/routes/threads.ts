import express from "express"
import Threads from "../models/thread"

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const thread = await Threads.create(req.body)
        return res.status(201).json({ thread })
    } catch (err) {
        return next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const thread = await Threads.get(Number(req.params.id))
        return res.json({ thread })
    } catch (err) {
        return next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const thread = await Threads.remove(Number(req.params.id))
        return res.json({ deleted: thread })
    } catch (err) {
        return next(err)
    }
})

export default router