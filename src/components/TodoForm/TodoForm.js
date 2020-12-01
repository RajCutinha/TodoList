import plusIcon from "./icon-plus.svg";

const TodoForm = ({
	darkMode,
	changeMode,
	formInput,
	setFormInput,
	addItem,
}) => {
	return (
		<>
			<div className="flex align-center space-between">
				<h1>TODO</h1>
				{!darkMode ? (
					<img
						src="./images/icon-moon.svg"
						alt=""
						onClick={() => changeMode(true)}
					/>
				) : (
					<img
						src="./images/icon-sun.svg"
						alt=""
						onClick={() => changeMode(false)}
					/>
				)}
			</div>
			<div className="todo-input">
				<input
					type="text"
					placeholder="Create a new todo..."
					value={formInput}
					onChange={(e) => setFormInput(e.target.value)}
				/>
				<input type="checkbox" disabled />
				<img src={plusIcon} alt="" onClick={addItem} />
			</div>
		</>
	);
};

export default TodoForm;
