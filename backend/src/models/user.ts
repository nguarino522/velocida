import prisma from "../prisma"
import { User } from "@prisma/client"
import { BadRequestError, NotFoundError } from "../expressError"
import { promises } from "dns"

interface registerUser {
    email: string,
    username: string,
}

interface removeUser {
    email: string,
    username: string|null,
}

export default class Users {

    /**
     * check for duplicate fields on register new user
     * @param username 
     * @param email 
     * @throws {BadRequestError}
     */
    private static async checkDuplicates(username: string, email: string): Promise<void> {
        if (await prisma.user.findUnique({ where: { username: username } })) {
            throw new BadRequestError(`Duplicate username Found: ${username}`)
        }
        if (await prisma.user.findUnique({ where: { email: email } })) {
            throw new BadRequestError(`Duplicate email Found: ${email}`)
        }
    }

    /**
     * register new user
     * @param requestBody {registerUser}
     * @returns {Promise<User>}
     */
    static async register(requestBody: registerUser): Promise<User> {
        const { email, username } = requestBody
        this.checkDuplicates(username, email)

        const user = await prisma.user.create({
            data: {
                email: email,
                username: username
            }
        })

        return user
    }

    /**
     * get all registered users
     * @returns {Promise<User[]>}
     */
    static async getAll(): Promise<User[]> {
        const users = await prisma.user.findMany()

        return users
    }

    /**
     * get user by username
     * @param username 
     * @returns {Promise<User>}
     * @throws {NotFoundError}
     */
    static async get(username: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { username: username }
        })
        if (!user) throw new NotFoundError(`User Not Found: ${username}`);

        return user
    }

    /**
     * delete user by username
     * @param username 
     * @returns {Promise<removeUser>}
     * @throws {NotFoundError}
     */
    static async remove(username: string): Promise<removeUser> {
        const user = await prisma.user.delete({
            where: { username: username },
            select: { email: true, username: true }
        }).catch(() => { throw new NotFoundError(`User Not Found: ${username}`) })

        return user
    }


    static async update() {

    }

}