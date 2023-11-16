/** Main app file for Velocida. */

import express from "express"
import cors from "cors"
import { authenticateJWT } from "./middleware/auth"
import { NotFoundError } from "./expressError"
import morgan from "morgan"
import usersRoutes from "./routes/users"
import healthRoutes from "./routes/health"
import authRoutes from "./routes/auth"
import profileRoutes from "./routes/profiles"
import followRoutes from "./routes/follows"
import activityRoutes from "./routes/activities"
import postRoutes from "./routes/posts"
import threadRoutes from "./routes/threads"
import voteRoutes from "./routes/votes"
import likeRoutes from "./routes/likes"
import commentRoutes from "./routes/comments"
import request from "request"

const app = express()

app.use(morgan("combined"))
app.use(cors())
app.use(express.json())
app.use(authenticateJWT)

app.use("/auth", authRoutes)
app.use("/user", usersRoutes)
app.use("/health", healthRoutes)
app.use("/profile", profileRoutes)
app.use("/follow", followRoutes)
app.use("/activity", activityRoutes)
app.use("/post", postRoutes)
app.use("/thread", threadRoutes)
app.use("/vote", voteRoutes)
app.use("/like", likeRoutes)
app.use("/comment", commentRoutes)

app.get("/", async (req, res, next) => {
    res.send()
})

/** get rss feed from worldathletics.org */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/news', (req, res) => {
    request(
        { url: "https://worldathletics.org/news/rss" },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({
                    type: 'error', message:
                        error.message
                })
            }

            res.set('Content-Type', 'application/rss+xml')
            res.send(Buffer.from(body))
        }
    )
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