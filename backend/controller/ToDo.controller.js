import Todo from "../model/ToDo.model.js"

export const createToDo = async (req, res) => {
	const newToDo = new Todo(req.body)
	try {
		const result = await newToDo.save()
		res.status(201).json(result)
	} catch (error) {
		console.log(error)
	}
}

export const getToDo = async (req, res) => {
	try {
		const todo = await Todo.find()
		if (!todo) {
			console.log("Add Something....")
		} else {
			res.send(todo)
		}
	} catch (error) {
		console.log(error)
	}
}

export const updateToDo = async (req, res) => {
	try {
		const findToDo = await Todo.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		)
		res.status(201).json(findToDo)
	} catch (error) {
		console.log(error)
	}
}

export const deleteToDo = async (req, res) => {
	try {
		await Todo.findByIdAndDelete(req.params.id)
		res.status(200).send("List had been deleted")
	} catch (error) {
		console.log(error)
	}
}
