import { Follow } from "@prisma/client";
import prisma from "../prisma"

export default class Follows {

    /**
     * create a follow 
     * @param followeeId @param followerId 
     * @returns {Promise<Follow>}
     */
    static async create(followeeId: number, followerId: number): Promise<Follow> {
        const follow = await prisma.follow.create({
            data: {
                followeeId: followeeId,
                followerId: followerId
            }
        })

        return follow
    }

    /**
     * delete a follow 
     * @param followeeId @param followerId 
     * @returns {Promise<Follow>}
     */
    static async remove(followeeId: number, followerId: number): Promise<Follow> {
        const follow = await prisma.follow.delete({
            where: {
                followerId_followeeId: {
                followeeId: followeeId,
                followerId: followerId
                }
            }
        })

        return follow
    }

}
