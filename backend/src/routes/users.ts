import express from "express"
import Users from "../models/user"
import createToken from "../helpers/tokens"
import { ensureCorrectUserOrAdmin, ensureAdmin } from "../middleware/auth"

const router = express.Router()

router.post("/", ensureAdmin, async (req, res, next) => {
    try {
        const user = await Users.register(req.body)
        const token = createToken(user)
        return res.status(201).json({ user, token })
    } catch (err) {
        return next(err)
    }
})

router.get("/all", ensureAdmin, async (req, res, next) => {
    try {
        const users = await Users.getAll()
        return res.json({ users })
    } catch (err) {
        return next(err)
    }
})

router.get("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const user = await Users.get(req.params.username)
        return res.json({ user })
    } catch (err) {
        return next(err)
    }
})

// implement later
router.patch("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        // const user = await User.update(req.params.username, req.body)
    } catch (err) {
        return next(err)
    }
})

router.delete("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const user = await Users.remove(req.params.username)
        return res.json({ deleted: user })
    } catch (err) {
        return next(err)
    }
})

export default router