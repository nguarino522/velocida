import { Request, Response, NextFunction } from "express"
import { UnauthorizedError } from "../expressError"
import Users from "../models/user"
import prisma from "../prisma";

// was trying to maybe use middleware to check if user 


// export const ensureUserProfileSetup = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await Users.get(res.locals.user.username)
//         const user = await prisma.user.findUnique({
//             where: { username: res.locals.user.username }
//         })

//         const profile = await prisma.profile.findUnique({
//             where: { user: user.id }
//         })

//         const result = profile ? true : false
//         return result
//     } catch (err) {
//         return next(err)
//     }
// }