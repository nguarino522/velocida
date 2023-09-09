import dotenv from "dotenv"
import app from "./app"
import { PORT } from "./config"

dotenv.config()

app.listen(PORT, () => {
  console.log(`Application has been started at http://localhost:${PORT}...`)
});