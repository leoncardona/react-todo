import { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import Todo from './components/Todo';
import DarkModeIcon from '../src/icons/dark_mode.svg';
import LightModeIcon from '../src/icons/light_mode.svg';
import GithubIcon from '../src/icons/github.svg';
import { useEffect } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const taskName = useRef("")
  useEffect(() => {
    document.body.id = darkMode ? 'body-dark' : 'body-light';
  }, [darkMode, todos]);
  const changeTheme = () => {
    setDarkMode(!darkMode);
  }
  const removeAllTasks = () => {
    setTodos([]);
  }
  const updateTask = (id) => {
    const newTodos = [...todos];
    newTodos.forEach((todo) => {
      if (todo.id === id)
        todo.completed = !todo.completed;
    });
    setTodos(newTodos);
  }
  const removeDoneTasks = () => {
    const newTodos = [...todos].filter(todo => todo.completed === false);
    setTodos(newTodos);
  }
  const removeTask = (id) => {
    const newTodos = [...todos].filter(todo => todo.id !== id);
    setTodos(newTodos);
  }
  const addTask = () => {
    if (taskName.current.value === "") return
    const newTodos = [...todos];
    newTodos.push({ id: uuid(), name: taskName.current.value, completed: false });
    setTodos(newTodos);
    taskName.current.value = "";
  }
  return (
    <>
      <h1>Todo Application</h1>
      <div id="task-creator" className={darkMode ? "dark-box" : "light-box"}>
        <input ref={taskName} style={darkMode ? { color: "white" } : { color: "black" }} type="text" placeholder='Add a new task...' />
        <button onClick={addTask} className={darkMode ? "dark-button" : "light-button"}>Add</button>
      </div>
      <div id="todo-options">
        <div>
          <button onClick={removeDoneTasks}>Clear Done</button>
          <button onClick={removeAllTasks}>Clear All</button>
        </div>
        <div>
          <label>Completed</label>
          <label>{todos.filter(todo => todo.completed === true).length}/{todos.length}</label>
        </div>
      </div>
      <div id="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} removeTask={removeTask} updateTask={updateTask} darkMode={darkMode} />
        ))}
      </div>
      <div id="footer">
        <div>
          <button onClick={changeTheme}><img src={darkMode ? LightModeIcon : DarkModeIcon} alt="Dark mode icon" className={darkMode ? "white-filter" : "black-filter"} /></button>
          <button><a href="https://github.com/leoncardona/react-todo" target="_blank" rel="noreferrer"><img src={GithubIcon} alt="Github icon" className={darkMode ? "white-filter" : "black-filter"} /></a></button>
        </div>
        <label>Made by <a href="https://github.com/leoncardona" target="_blank" rel="noreferrer">@leoncardona</a></label>
      </div>
    </>
  );
}