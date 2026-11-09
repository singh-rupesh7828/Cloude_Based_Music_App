import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authroutes from "./routers/auth.routes.js"
import songroutes from "./routers/song.routes.js"

const app = express()

app.use(cors({
	origin: process.env.FRONTEND_URL || "http://localhost:5173",
	credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/auth",authroutes)
app.use("/songs",songroutes);

export default app