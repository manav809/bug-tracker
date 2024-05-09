import config from "./utils/config"
import express from "express"
import cors from "cors"
import mongoose, { Error } from "mongoose"
import userRouter from "./controllers/user"
import bugRouter from "./controllers/bug"
import dotenv from "dotenv"
import morgan from 'morgan'
import loginRouter from "./controllers/login"
import userExtractor from "./utils/middleware"
dotenv.config()

const app = express()
mongoose.set("strictQuery", false)

mongoose
  .connect(config.MONGO_URL!)
  .then(() => console.log("[database] Connected to MongoDB"))
  .catch((err: Error) => {
    console.log("[error] ", err.message)
  })

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan('tiny'));

app.use("/api/user", userRouter)
app.use("/api/bug", userExtractor, bugRouter)
app.use("/api/login", loginRouter)

export default app