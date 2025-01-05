import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
	text: {
		type: String,
		require: true,
	},
})
const Todo = mongoose.model("ToDo", todoSchema)
export default Todo
