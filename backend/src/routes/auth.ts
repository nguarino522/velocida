import express from "express"
import createToken from "../helpers/tokens"
import { BadRequestError } from "../expressError"
import Users from "../models/user"
import Profiles from "../models/profile"

const router = express.Router()

/** POST /auth/token:  { username, password } => { token }
 * Returns JWT token which can be used to authenticate further requests.
 * Authorization required: none
 */
router.post("/token", async (req, res, next) => {
    try {
        const user = await Users.authenticate(req.body.username, req.body.password)
        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err)
    }
})


/** POST /auth/register:   { user } => { token }
 * user must include { username, password, email }
 * Returns JWT token which can be used to authenticate further requests.
 * Authorization required: none
 */
router.post("/register", async (req, res, next) => {
    try {
       const { username, password, email, age, bio, firstName, lastName } = req.body
        const newUser = await Users.register({
            username: username, 
            password: password, 
            email: email
        })
        const createdUser = await Users.get(newUser.username)
        await Profiles.create({
            age: Number(age),
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            userId: createdUser.id
        })
        const token = createToken(newUser)
        return res.status(201).json({ token })
    } catch (err) {
        return next(err)
    }
})

export default router