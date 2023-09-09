import prisma from "../prisma"
import { User } from "@prisma/client"
import { BadRequestError, NotFoundError } from "../expressError"

interface registerUser {
    email: string,
    username: string,
}

export default class Users {

    static async register(requestBody: registerUser) {
        const { email, username } = requestBody
        
        // throw error if username already taken / in use
        const duplicateUsername = await prisma.user.findUnique({
            where: { username: username }
        })
        if (duplicateUsername) {
            throw new BadRequestError(`Duplicate Username Found: ${username}`)
        }

        // throw error if email already taken / in use
        const duplicateEmail = await prisma.user.findUnique({
            where: { email: email }
        })
        if (duplicateEmail) {
            throw new BadRequestError(`Duplicate Email Found: ${email}`)
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


    static async getAll() {
        const users = await prisma.user.findMany()
        return users
    }


    static async get(username: string) {
        const user = await prisma.user.findUnique({
            where: { username: username }
        })
        if (!user) throw new NotFoundError(`User Not Found: ${username}`);
        return user
    }


    static async remove(username: string) {
        const user = await prisma.user.delete({
            where: { username: username },
            select: { email: true, username: true }
        }).catch(() => { throw new NotFoundError(`User Not Found: ${username}`) })
        // if (!user) throw new NotFoundError(`User Not Found: ${username}`)
        return user
    }


    static async update() {

    }

}