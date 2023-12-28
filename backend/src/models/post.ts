import { Post } from "@prisma/client"
import prisma from "../prisma"
import { NotFoundError } from "../expressError"

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
        
        await prisma.thread.update({
            where: { id: Number(post.threadId) },
            data: {
                updatedAt: new Date()
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

    /**
     * get post by id
     * @param postId 
     * @returns {Promise<Post>}
     */
    static async get(postId: number): Promise<Post> {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                votes: true
            }
        })

        if (!post) throw new NotFoundError(`Post Not Found: ${postId}`);

        return post
    }
}