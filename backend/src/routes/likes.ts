import express from "express"
import Likes from "../models/like"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    const like = await Likes.create(req.body)
    return res.status(201).json({ like })
  } catch (err) {
    return next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const like = await Likes.remove(Number(req.params.id))
    return res.json({ deleted: like })
  } catch (err) {
    return next(err)
  }
})

export default router