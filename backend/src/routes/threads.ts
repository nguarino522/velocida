import express from "express"
import Threads from "../models/thread"
import { skip } from "node:test"
import { ensureAdmin, ensureLoggedIn } from "../middleware/auth"

const router = express.Router()

router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const thread = await Threads.create(req.body)
        return res.status(201).json({ thread })
    } catch (err) {
        return next(err)
    }
})

router.get("/forum/:pageNum", async (req, res, next) => {
    try {
        console.log(req.params.pageNum)
        const threads = await Threads.getAll(Number(req.params.pageNum))
        return res.json({ threads })
    } catch (err) {
        return next(err)
    }
})

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
    try {
        const thread = await Threads.get(Number(req.params.id))
        return res.json({ thread })
    } catch (err) {
        return next(err)
    }
})

router.delete("/:id", ensureAdmin, async (req, res, next) => {
    try {
        const thread = await Threads.remove(Number(req.params.id))
        return res.json({ deleted: thread })
    } catch (err) {
        return next(err)
    }
})

export default router