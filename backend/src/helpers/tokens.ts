import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config"
import { Role } from "@prisma/client"

interface registeredUser {
    email: string,
    username: string,
    role: Role
}

const createToken = (user: registeredUser) => {
    
    console.assert(user.role !== undefined, "createToken passed user without role property")
    
    let payload = {
        email: user.email,
        username: user.username,
        role: user.role
    }

    return jwt.sign(payload, SECRET_KEY)
}

export default createToken