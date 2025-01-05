import express from "express"
import {
	createToDo,
	deleteToDo,
	getToDo,
	updateToDo,
} from "../controller/ToDo.controller.js"

const router = express.Router()

router.post("/create", createToDo)
router.delete("/delete/:id", deleteToDo)
router.put("/update/:id", updateToDo)
router.get("/get", getToDo)

export default router
