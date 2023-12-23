import { Vote } from "@prisma/client";
import prisma from "../prisma"
import { NotFoundError } from "../expressError";

export default class Votes {
	/**
	* create a vote 
	* @param requestBody 
	* @returns {Promise<Vote>}
	*/
	static async create(requestBody: Vote): Promise<Vote> {
		const { postId, authorId, upvote } = requestBody
		const vote = await prisma.vote.create({
			data: {
				postId: postId,
				authorId: authorId,
				upvote: upvote
			}
		})

		return vote
	}

	/**
	 * delete vote by id
	 * @param postId 
	 * @returns {Promise<Vote>}
	 */
	static async remove(voteId: number): Promise<Vote> {
		const vote = await prisma.vote.delete({
			where: { id: voteId }
		})

		return vote
	}

	/**
	 * get vote by id
	 * @param voteId 
	 * @returns {Promise<Vote>}
	 * @throws {NotFoundError}
	 */
	static async get(voteId: number): Promise<Vote> {
		const vote = await prisma.vote.findUnique({
			where: { id: voteId }
		})
		if (!vote) throw new NotFoundError(`Thread Not Found: ${voteId}`);

		return vote
	}

	/**
	 * toggle vote by id
	 * @param voteId @param upvote
	 * @returns {Promise<Vote>}
	*/
	static async toggle(voteId: number, upvote: boolean): Promise<Vote> {
		const vote = await prisma.vote.update({
			where: { id: voteId },
			data: { upvote: upvote }
		})

		return vote
	}
}