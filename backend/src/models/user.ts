import prisma from "../prisma"
import { BadRequestError } from "../expressError"

class User {

    static async register({ email, username }: {email: string, username: string} ) {

        // throw error if username already taken / in use
        const duplicateUsername = await prisma.user.findUnique(
            { where: 
                { username: username } 
            })
        if (duplicateUsername) {
            throw new BadRequestError(`Duplicate username: ${username}`)
        }
        
         // throw error if email already taken / in use
        const duplicateEmail = await prisma.user.findUnique(
            { where: 
                { email: email }
            })
        if (duplicateEmail) {
            throw new BadRequestError(`Duplicate email: ${email}`)
        }

        // attempt to create the new user
        const user = await prisma.user.create({
            data: {
                email: email,
                username: username
            }
        })

        return user

    }



}

export default User