import { Thread } from "@prisma/client"
import prisma from "../prisma"
import { NotFoundError } from "../expressError"

export default class Threads {
    /**
     * create a thread 
     * @param requestBody 
     * @returns {Promise<Thread>}
     */
    static async create(requestBody: Thread): Promise<Thread> {
        const { title, authorId } = requestBody
        const thread = await prisma.thread.create({
            data: {
                title: title,
                authorId: authorId
            }
        })

        return thread
    }

    /**
     * get thread by id
     * @param threadId 
     * @returns {Promise<Thread>}
     * @throws {NotFoundError}
     */
    static async get(threadId: number): Promise<Thread> {
        const thread = await prisma.thread.findUnique({
            where: { id: threadId },
            include: {
                author: true,
                posts: true
            }
        })
        if (!thread) throw new NotFoundError(`Thread Not Found: ${threadId}`);

        return thread
    }

    /**
     * delete thread by id
     * @param threadId
     * @returns {Promise<Thread>}
     */
    static async remove(threadId: number): Promise<Thread> {
        const thread = await prisma.thread.delete({
            where: { id: threadId }
        })

        return thread
    }

    /**
     * get paginated list of threads
     * @param pageId 
     */
    static async getAll(skipNum: number) {
        const threads = await prisma.thread.findMany({
            skip: skipNum,
            take: 20,
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        user: {
                            select: {
                                username: true
                            }
                        }
                    },
                },
                posts: true
            },
        });
    
        return threads;
    }
    
}