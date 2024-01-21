import express from "express"
import Profiles from "../models/profile"
//import { ensureUserProfileSetup } from "../middleware/profile"
import { ensureCorrectUserOrAdmin, ensureAdmin, ensureCorrectUserOrAdminProfile, ensureLoggedIn } from "../middleware/auth"

const router = express.Router()

router.post("/", ensureAdmin, async (req, res, next) => {
    try {
        const profile = await Profiles.create(req.body)
        return res.status(201).json({ profile })
    } catch (err) {
        return next(err)
    }
})

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
    try {
        const profile = await Profiles.get(Number(req.params.id))
        return res.json({ profile })
    } catch (err) {
        return next(err)
    }
})

router.patch("/:id", ensureCorrectUserOrAdminProfile, async (req, res, next) => {
    try {
        const profile = await Profiles.update(Number(req.params.id), req.body)
        return res.json({ profile })
    } catch (err) {
        return next(err)
    }
})

export default router