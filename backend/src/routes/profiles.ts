import express from "express"
import Profile from "../models/profile"

const router = express.Router()

// router.post("/", async (req, res, next) => {
//     try {      
//         const user = await Profile.create(req.body)  
//         return res.status(201).json({user})
//     } catch (err) {
//         return next(err)
//     }
// })

// router.get("/all", async (req, res, next) => {
//     try {
//         const users = await User.getAll()
//         return res.json({users})
//     } catch (err) {
//         return next(err)
//     }
// })

// router.get("/:username", async (req, res, next) => {
//     try {
//         const user = await User.get(req.params.username)
//         return res.json({user})
//     } catch (err) {
//         return next(err)
//     }
// })

// // implement later
// router.patch("/:username", async (req, res, next) => {
//     try {
//         // const user = await User.update(req.params.username, req.body)
//     } catch (err) {
//         return next(err)
//     }
// })

// router.delete("/:username", async (req, res, next) => {
//     try {
//         const user = await User.remove(req.params.username)
//         return res.json({ deleted: user })
//     } catch (err) {
//         return next(err)
//     }
// })

export default router