import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import ToDoRouter from "./routes/ToDo.route.js"

const app = express()
dotenv.config()

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log("Connected to backend")
	})
	.catch((err) => {
		console.log(err)
	})

//MIDDLEWARE
app.use(express.json())
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
)

app.use("/todo", ToDoRouter)
app.listen(9000, () => {
	console.log("Server is running on port 2000")
})
