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
  const vote = await Votes.get(Number(req.params.id))
  if (vote.upvote) {
    const updated_vote = await Votes.toggle(Number(req.params.id), false)
    return updated_vote
  } else {
    const updated_vote = await Votes.toggle(Number(req.params.id), true)
    return updated_vote
  }
})

export default router