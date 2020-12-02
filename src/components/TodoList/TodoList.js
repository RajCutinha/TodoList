const TodoList = ({
	todos,
	setTodos,
	controlComplete,
	clear,
	deleteTodo,
	filterControl,
}) => {
	const left = todos.reduce(
		(acc, cur) => (cur.completed === false ? acc + 1 : acc),
		0
	);

	let startIndex;

	function dragStart(e) {
		startIndex = +e.target.closest("li").getAttribute("data-index");
	}

	function dragEnter(e) {
		e.target.classList.add("over");
	}

	function dragLeave(e) {
		e.target.classList.remove("over");
	}

	function dragOver(e) {
		e.preventDefault();
	}

	function dragDrop(e) {
		const endIndex = +e.target.getAttribute("data-index");
		swapItems(startIndex, endIndex);
		e.target.classList.remove("over");
	}

	function swapItems(from, to) {
		const itemOne = todos[from];
		const itemTwo = todos[to];

		const newTodos = [...todos];
		newTodos[to] = itemOne;
		newTodos[from] = itemTwo;

		setTodos(newTodos);
	}

	return (
		<div className="todo-list">
			<ul>
				{todos.map((todo, index) => {
					return todo.completed === false ? (
						<li
							className="flex align-center"
							draggable={true}
							key={index}
							data-index={index}
							onDragStart={dragStart}
							onDragEnter={dragEnter}
							onDragLeave={dragLeave}
							onDragOver={dragOver}
							onDrop={dragDrop}
						>
							<input
								type="checkbox"
								onChange={controlComplete}
								checked={todo.completed}
							/>
							<p onClick={controlComplete}>{todo.value}</p>
							<img
								src="./images/icon-cross.svg"
								alt=""
								onClick={deleteTodo}
							/>
						</li>
					) : (
						<li
							className="flex align-center completed"
							draggable={true}
							key={index}
							data-index={index}
							onDragStart={dragStart}
							onDragEnter={dragEnter}
							onDragLeave={dragLeave}
							onDragOver={dragOver}
							onDrop={dragDrop}
						>
							<input
								type="checkbox"
								onChange={controlComplete}
								checked={todo.completed}
							/>
							<p onClick={controlComplete}>{todo.value}</p>
							<img
								src="./images/icon-cross.svg"
								alt=""
								onClick={deleteTodo}
							/>
						</li>
					);
				})}
			</ul>
			{!(todos.length === 0) ? (
				<div className="filter flex align-center space-between">
					<p>{left} items left</p>
					<div className="flex align-center">
						<button
							value="All"
							className="active"
							onClick={filterControl}
						>
							All
						</button>
						<button value="Active" onClick={filterControl}>
							Active
						</button>
						<button value="Completed" onClick={filterControl}>
							Completed
						</button>
					</div>
					<button onClick={clear}>Clear Completed</button>
				</div>
			) : (
				<>
					<div className="empty">
						<h2>Add some Todos to the list...</h2>
					</div>
					<div className="filter flex align-center space-between">
						<p>{left} items left</p>
						<div className="flex align-center">
							<button
								value="All"
								className="active"
								onClick={filterControl}
							>
								All
							</button>
							<button value="Active" onClick={filterControl}>
								Active
							</button>
							<button value="Completed" onClick={filterControl}>
								Completed
							</button>
						</div>
						<button onClick={clear}>Clear Completed</button>
					</div>
				</>
			)}
		</div>
	);
};

export default TodoList;
