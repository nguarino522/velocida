import prisma from "../prisma"
import { User, Role } from "@prisma/client"
import { BadRequestError, NotFoundError, UnauthorizedError } from "../expressError"
import bcrypt from "bcrypt"
import { BCRYPT_WORK_FACTOR } from "../config"

interface registerUser {
    email: string,
    username: string,
    password: string
}

interface registeredUser {
    email: string,
    username: string,
    role: Role
}

interface removeUser {
    email: string,
    username: string
}

interface getUser {
    email: string,
    username: string,
    role: Role
}

interface authUser {
    email: string,
    username: string,
    role: Role
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
     * @returns {Promise<registeredUser>}
     */
    static async register(requestBody: registerUser): Promise<registeredUser> {
        const { email, username, password } = requestBody
        await this.checkDuplicates(username, email)

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            }, select: {
                email: true,
                username: true,
                role: true
            }
        })

        return user
    }

    /**
    * authenticate user by username and password
    * @param username, password
    * @returns {Promise<authUser>}
    * @throws {UnauthorizedError}
    */
    static async authenticate(username: string, password: string): Promise<authUser> {
        
        const user = await prisma.user.findUnique({
            where: { username: username }
        })
        if (!user) { throw new UnauthorizedError("Invalid username/password") }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) { throw new UnauthorizedError("Invalid username/password") }
        
        return user
    }

    /**
     * get user by username
     * @param username 
     * @returns {Promise<getUser>}
     * @throws {NotFoundError}
     */
    static async get(username: string): Promise<getUser> {
        const user = await prisma.user.findUnique({
            where: { username: username },
            select: { email: true, username: true, role: true, profile: true }
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

    // temp for dev work remove in future
    static async getAll() {
        const users = await prisma.user.findMany()

        return users
    }





}