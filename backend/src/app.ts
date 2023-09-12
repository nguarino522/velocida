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