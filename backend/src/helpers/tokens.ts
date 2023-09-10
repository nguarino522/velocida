import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config"
import { User } from "@prisma/client"

const createToken = (user: User) => {
    
    console.assert(user.role !== undefined, "createToken passed user without isAdmin property")
    
    let payload = {
        username: user.username,
        isAdmin: user.role === "ADMIN" || false
    }

    return jwt.sign(payload, SECRET_KEY)
}

export default createToken