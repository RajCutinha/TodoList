import React from "react";
import "./App.css";
import "./components/TodoForm/TodoForm";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";

function App() {
	const [darkMode, setDarkMode] = React.useState(false);
	const [formInput, setFormInput] = React.useState("");
	const [todos, setTodos] = React.useState([]);
	const [filter, setFilter] = React.useState("All");

	const filteredTodos = todos.filter((todo) => {
		if (filter === "Active") {
			return todo.completed === false ? todo : false;
		} else if (filter === "Completed") {
			return todo.completed === true ? todo : false;
		} else {
			return todo;
		}
	});

	function changeMode(mode) {
		setDarkMode(mode);
		if (mode) {
			document.documentElement.setAttribute("data-theme", "dark");
			localStorage.setItem("darkmode", true);
		} else {
			document.documentElement.removeAttribute("data-theme");
			localStorage.removeItem("darkmode");
		}
	}

	function addItem() {
		setTodos([...todos, { value: formInput, completed: false }]);
		setFormInput("");
	}

	function controlComplete(e) {
		const parent = e.target.parentElement;
		const todoValue = parent.querySelector("p").innerText;
		const todoIndex = todos.findIndex((item) => item.value === todoValue);
		if (parent.classList.contains("completed")) {
			e.target.parentElement.classList.remove("completed");
			setTodos(() => {
				const newTodos = [...todos];
				newTodos[todoIndex].completed = false;
				return newTodos;
			});
		} else {
			setTodos(() => {
				const newTodos = [...todos];
				newTodos[todoIndex].completed = true;
				return newTodos;
			});
			e.target.parentElement.classList.add("completed");
		}
	}

	function deleteTodo(e) {
		const parent = e.target.parentElement;
		const todoValue = parent.querySelector("p").innerText;
		const todoIndex = todos.findIndex((item) => item.value === todoValue);
		const newTodos = [...todos].filter((item, index) =>
			index === todoIndex ? false : true
		);
		setTodos(newTodos);
	}

	function clear() {
		const oldTodos = [...todos];
		const newTodos = oldTodos.filter((item) => {
			if (item.completed === false) {
				return item;
			}
		});
		setTodos(newTodos);
	}

	function filterControl(e) {
		setFilter(e.target.value);
		e.target.parentElement
			.querySelectorAll("button")
			.forEach((button) => button.classList.remove("active"));
		e.target.classList.add("active");
	}

	function getStored() {
		if (localStorage.getItem("todos") === null) {
			setTodos([]);
		} else {
			setTodos(JSON.parse(localStorage.getItem("todos")));
		}
	}

	React.useEffect(() => {
		if (!(localStorage.getItem("darkmode") === null)) {
			setDarkMode(true);
			document.documentElement.setAttribute("data-theme", "dark");
		}

		getStored();
	}, []);

	React.useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className="App">
			<div className="app-bg">
				{!darkMode ? (
					<img src="./images/bg-desktop-light.jpg" alt="" />
				) : (
					<img src="./images/bg-desktop-dark.jpg" alt="" />
				)}
			</div>
			<div className="app-body">
				<TodoForm
					darkMode={darkMode}
					changeMode={changeMode}
					formInput={formInput}
					setFormInput={setFormInput}
					addItem={addItem}
				/>
				<TodoList
					todos={filteredTodos}
					setTodos={setTodos}
					setFilter={setFilter}
					controlComplete={controlComplete}
					clear={clear}
					deleteTodo={deleteTodo}
					filterControl={filterControl}
				/>
				<p>Drag and drop to reorder list</p>
			</div>
		</div>
	);
}

export default App;
