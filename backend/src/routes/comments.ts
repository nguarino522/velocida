import express from "express"
import Comments from "../models/comment"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
      const comment = await Comments.create(req.body)
      return res.status(201).json({ comment })
  } catch (err) {
      return next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
      const comment = await Comments.remove(Number(req.params.id))
      return res.json({ deleted: comment })
  } catch (err) {
      return next(err)
  }
})

export default router