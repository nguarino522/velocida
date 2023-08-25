/** Main app file for Velocida. */

import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("IS THIS THING ON?!?!?! TEST testing")
})

export default app