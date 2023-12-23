import express from "express"
import Votes from "../models/vote"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    const vote = await Votes.create(req.body)
    return res.status(201).json({ vote })
  } catch (err) {
    return next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const vote = await Votes.remove(Number(req.params.id))
    return res.json({ deleted: vote })
  } catch (err) {
    return next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const vote = await Votes.get(Number(req.params.id))
    return res.json({ vote })
  } catch (err) {
    return next(err)
  }
})

router.patch("/:id", async (req, res, next) => {
  try {
    const vote = await Votes.get(Number(req.params.id))
    if (vote.upvote) {
      const vote = await Votes.toggle(Number(req.params.id), false)
      return res.json({ vote })
    } else {
      const vote = await Votes.toggle(Number(req.params.id), true)
      return res.json({ vote })
    }
  } catch (err) {
    return next(err)
  }
})

export default router