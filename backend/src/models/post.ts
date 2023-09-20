import { Post } from "@prisma/client"
import prisma from "../prisma"

export default class Posts {
    /**
     * create a post 
     * @param requestBody 
     * @returns {Promise<Post>}
     */
    static async create(requestBody: Post): Promise<Post> {
        const { content, authorId, threadId, parentPostId } = requestBody
        const post = await prisma.post.create({
            data: {
                content: content,
                authorId: authorId,
                threadId: threadId,
                parentPostId: parentPostId
            }
        })
        
        return post
    }

    /**
     * delete post by id
     * @param postId 
     * @returns {Promise<Post>}
     */
    static async remove(postId: number): Promise<Post> {
        const post = await prisma.post.delete({
            where: { id: postId }
        })

        return post
    }
}