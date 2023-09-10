/** Main app file for Velocida. */

import express from "express"
import cors from "cors"
// import { PrismaClient } from '@prisma/client'
import { NotFoundError } from "./expressError"
import usersRoutes from "./routes/users"
import healthRoutes from "./routes/health"
import morgan from "morgan"

const app = express()
// const prisma = new PrismaClient()

app.use(morgan("tiny"))
app.use(cors())
app.use(express.json())


app.use("/user", usersRoutes)
app.use("/health", healthRoutes)

app.get("/", async (req, res, next) => {
    res.send()
})

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
    return next(new NotFoundError())
});

/** Generic error handler; anything unhandled goes here. */
app.use((err: any, req: any, res: any, next: any) => {
    if (process.env.NODE_ENV !== "test") console.error(err.stack)
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status }
    })
})

export default app