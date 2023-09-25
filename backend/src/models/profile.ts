import { Profile } from "@prisma/client"
import prisma from "../prisma"
import { BadRequestError, NotFoundError } from "../expressError"

interface createProfile {
    firstName: string,
    lastName: string,
    userId: number,
    bio: string,
    age: number
}

interface updateProfile {
    firstName: string,
    lastName: string,
    userId: number,
    bio: string,
    age: number
}

export default class Profiles {

    /**
     * create an profile 
     * @param requestBody 
     * @returns {Promise<Profile>}
     */
    static async create(requestBody: createProfile): Promise<Profile> {
        const { firstName, lastName, userId, bio, age } = requestBody
        const profile = await prisma.profile.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                userId: userId,
                bio: bio,
                age: age
            }
        })

        return profile
    }

    /**
     * get profile by id
     * @param profileId
     * @returns {Promise<Profile>}
     * @throws {NotFoundError}
     */
    static async get(profileId: number): Promise<Profile> {
        const profile = await prisma.profile.findUnique({
            where: { id: profileId },
            include: {
                posts: true,
                votes: true,
                activities: true,
                likes: true,
                comments: true,
                followers: true,
                following: true
            }
        })
        if (!profile) throw new NotFoundError(`Profile Not Found: ${profileId}`);

        return profile
    }

    /**
     * update profile by id
     * @param profileId @param requestBody
     * @returns {Promise<Profile>}
     * @throws {NotFoundError}
     */
    static async update(profileId: number, requestBody: updateProfile): Promise<Profile> {
        const { firstName, lastName, userId, bio, age } = requestBody
        const profile = await prisma.profile.update({
            where: { id: profileId },
            data: {
                firstName: firstName,
                lastName: lastName,
                userId: userId,
                bio: bio,
                age: age
            }
        })

        return profile
    }
}