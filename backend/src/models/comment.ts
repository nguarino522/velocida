import { Comment } from "@prisma/client";
import prisma from "../prisma";

export default class Comments {
  /**
     * create a comment 
     * @param requestBody 
     * @returns {Promise<Comment>}
     */
  static async create(requestBody: Comment): Promise<Comment> {
    const { content, ownerId, activityId } = requestBody
    const comment = await prisma.comment.create({
      data: {
        content: content,
        ownerId: ownerId,
        activityId: activityId
      }
    })

    return comment
  }

  /**
     * delete comment by id
     * @param commentId 
     * @returns {Promise<Comment>}
     */
  static async remove(commentId: number): Promise<Comment> {
    const comment = await prisma.comment.delete({
        where: { id: commentId }
    })

    return comment
}
}