import { Like } from "@prisma/client";
import prisma from "../prisma"

export default class Likes {
  /**
	  * create a like 
	  * @param requestBody 
	  * @returns {Promise<Like>}
	  */
	static async create(requestBody: Like): Promise<Like> {
		const { activityId, ownerId } = requestBody
		const like = await prisma.like.create({
			data: {
				activityId: activityId,
				ownerId: ownerId
			}
		})

		return like
	}

  /**
		 * delete like by id
		 * @param likeId 
		 * @returns {Promise<Like>}
		 */
	static async remove(likeId: number): Promise<Like> {
		const like = await prisma.like.delete({
			where: { id: likeId }
		})

		return like
	}
}