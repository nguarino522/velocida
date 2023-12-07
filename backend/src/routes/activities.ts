import express from "express"
import Activities from "../models/activity"
import { ensureCorrectUserOrAdmin, ensureAdmin, ensureCorrectUserOrAdminActivity } from "../middleware/auth"

const router = express.Router()

router.post("/", ensureCorrectUserOrAdminActivity, async (req, res, next) => {
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
        return res.json({ activity })
    } catch (err) {
        return next(err)
    }
})

router.patch("/:id", ensureCorrectUserOrAdminActivity, async (req, res, next) => {
    try {
        const activity = await Activities.update(Number(req.params.id), req.body)
        return res.json({ activity })
    } catch (err) {
        return next(err)
    }
})

router.delete("/:id", ensureCorrectUserOrAdminActivity, async (req, res, next) => {
    try {
        const activity = await Activities.remove(Number(req.params.id))
        return res.json({ deleted: activity })
    } catch (err) {
        return next(err)
    }
})

export default router