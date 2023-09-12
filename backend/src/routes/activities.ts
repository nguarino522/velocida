import express from "express"
import Activities from "../models/activity"

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const activity = await Activities.create(req.body)
        return res.status(201).json({ activity })
    } catch (err) {
        return next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const activity = await Activities.get(Number(req.params.id))
        return res.status(201).json({ activity })
    } catch (err) {
        return next(err)
    }
})

router.patch("/:id", async (req, res, next) => {
    try {
        const activity = await Activities.update(Number(req.params.id), req.body)
        return res.status(201).json({ activity })
    } catch (err) {
        return next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const follow = await Activities.remove(Number(req.params.id))
        return res.status(201).json({ follow })
    } catch (err) {
        return next(err)
    }
})

export default router