import { Activity } from "@prisma/client";
import prisma from "../prisma";
import { BadRequestError, NotFoundError } from "../expressError"

interface createActivity {
    title: string,
    description: string,
    duration: number,
    distance: number,
}

export default class Activities {
    /**
     * create an activity 
     * @param requestBody 
     * @returns {Promise<Activity>}
     */
    static async create(requestBody: createActivity): Promise<Activity> {
        const {title, description, duration, distance} = requestBody
        const activity = await prisma.activity.create({
            data: {
                title: title,
                description: description,
                duration: duration,
                distance: distance,
                ownerId: 1 // todo: need userId from logged in user, might fail 
            }
        })

        return activity
    } 

    /**
     * get activity by id
     * @param activityId 
     * @returns {Promise<Activity>}
     * @throws {NotFoundError}
     */
    static async get(activityId: number): Promise<Activity> {
        const activity = await prisma.activity.findUnique({
            where: { id: activityId },
            include: {
                owner: true,
                comments: true,
                reactions: true
            }
        })
        if (!activity) throw new NotFoundError(`Activity Not Found: ${activityId}`);
    
        return activity
    }
}



