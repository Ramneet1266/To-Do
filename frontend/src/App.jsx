import { useEffect, useState } from "react"
import "./App.css"
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
// import ToDo from "./components/ToDo"

function App() {
	const [todo, setTodo] = useState([])
	const [text, setText] = useState("")
	const [editId, setEditId] = useState(null)
	const [editText, setEditText] = useState("")

	//Display List

	//Create List
	const handleAdd = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(
				"http://localhost:9000/todo/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text }),
				}
			)

			if (response.ok) {
				const newToDo = await response.json()
				setTodo([...todo, newToDo])

				setText("")
			}
		} catch (error) {
			console.log(error)
		}
		getAll()
	}
	//Delete List
	const handleDelete = async (id) => {
		try {
			setTodo(todo.filter((todo) => todo._id !== id))
			const response = await fetch(
				`http://localhost:9000/todo/delete/${id}`,
				{
					method: "DELETE",
				}
			)
			if (response.ok) {
				console.log("To-Do list deleted")
			} else {
				console.log("not")
			}
		} catch (error) {
			console.log(error)
		}
		getAll()
	}
	//Update List
	const handleUpdate = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:9000/todo/update/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text: editText }),
				}
			)
			if (response.ok) {
				const updatedTodo = await response.json()
				setTodo((prevTodo) => {
					prevTodo.map((todo) => {
						todo._id = id ? updatedTodo.text : todo
					})
				})
				setEditId(null)
				setEditText("")
				getAll()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getAll = async () => {
		await fetch("http://localhost:9000/todo/get").then((res) => {
			res
				.json()
				.then((data) => setTodo(data))
				.catch((err) => console.log(err))
		})
	}
	useEffect(() => {
		getAll()
	}, [])

	return (
		<>
			<div className='flex justify-center h-screen items-center'>
				<div className='p-16 bg-white rounded'>
					<h1 className='text-center pb-16 font-bold text-3xl'>
						To-Do List
					</h1>
					{editId ? (
						<div className='flex flex-row gap-4'>
							<input
								type='text'
								name='to-do'
								value={editText}
								onChange={(e) => setEditText(e.target.value)}
								className='border-b-2 w-96 border-gray-700 p-2 outline-none'
								placeholder='Add ToDos......'
							/>
							<button
								onClick={() => handleUpdate(editId)}
								className='bg-slate-900 text-white pt-2 pb-2 pl-5 pr-5'
							>
								Update
							</button>
						</div>
					) : (
						<div className='flex flex-row gap-4'>
							<input
								type='text'
								name='to-do'
								value={text}
								onChange={(e) => setText(e.target.value)}
								className='border-b-2 w-96 border-gray-700 p-2 outline-none'
								placeholder='Add ToDos......'
							/>
							<button
								onClick={handleAdd}
								className='bg-slate-900 text-white pt-2 pb-2 pl-5 pr-5'
							>
								Add
							</button>
						</div>
					)}

					{todo &&
						todo.map((item) => (
							<div className=''>
								<ul className='list-none'>
									<li
										className='bg-black mt-4 text-white pt-4 pb-4 pl-6 pr-6 rounded-md'
										key={item._id}
									>
										<div className='flex gap-4 text-lg items-center justify-between'>
											<div className=''>{item.text}</div>
											<div className='flex gap-4 items-center'>
												<BiEdit
													className='cursor-pointer'
													onClick={() => {
														setEditId(item._id)
														setEditText(item.text)
													}}
												/>
												<AiFillDelete
													className='cursor-pointer'
													onClick={() => handleDelete(item._id)}
												/>
											</div>
										</div>
									</li>
								</ul>
							</div>
						))}
				</div>
			</div>
		</>
	)
}

export default App
