import React from 'react'
import TrashIcon from '../icons/trash.svg'

export default function Todo({ todo, removeTask, updateTask, darkMode }) {
	const handleCheckbox = () => {
		updateTask(todo.id);
	}
	const handleRemoveButton = () => {
		removeTask(todo.id);
	}
	return (
		<div className={darkMode ? "dark-box" : "light-box"}>
			<div>
				<input type="checkbox" onChange={handleCheckbox} style={darkMode ? { backgroundColor: "rgb(49, 62, 82)" } : { backgroundColor: "white" }} />
				<label>{todo.name}</label>
			</div>
			<button onClick={handleRemoveButton}>
				<img src={TrashIcon} alt="Trash icon" className={darkMode ? "white-filter" : "black-filter"} />
			</button>
		</div>
	)
}