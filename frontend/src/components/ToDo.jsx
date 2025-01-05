import React from "react"
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"

export default function ToDo({ text, updateMode, deleteMode }) {
	return (
		<div className='bg-black mt-4  text-white pt-4 pb-4 pl-6 pr-6 rounded-md'>
			<div className='flex gap-4 text-lg items-center justify-between'>
				<div className=''>{text}</div>
				<div className='flex gap-4 items-center'>
					<BiEdit className='' onclick={updateMode} />
					<AiFillDelete className='' onclick={deleteMode} />
				</div>
			</div>
		</div>
	)
}
