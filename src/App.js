import React, { useState } from "react";
import "./App.css";

function TodoList() {
  const [currentTask, setCurrentTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  function handleAddTask(event) {
    event.preventDefault();
    if (!currentTask.trim()) return; //If currentTask is empty or contains only whitespace, the trim() function will remove any leading or trailing whitespace characters, and the resulting string will be empty. 1--> The trim() method is a built-in JavaScript function that removes whitespace from both ends of a string. 2--> The ! operator then negates this empty string, so the condition is true and the code inside the if statement is executed. 3--> The return statement inside the if block immediately exits the function and prevents the code from executing any further. This means that if the user tries to submit an empty or whitespace-only task, the function handleAddTask will not add it to the tasks array and will simply return without doing anything.
    if (editing) {
      const newTasks = [...tasks];
      newTasks[editingIndex] = currentTask;
      setTasks(newTasks);
      setCurrentTask("");
      setEditing(false);
      //   setcomplete(false)
      setEditingIndex(null);
    } else {
      setTasks([...tasks, currentTask]);
      setCurrentTask("");
    }
  }

  function handleEditTask(index) {
    setCurrentTask(tasks[index]);
    setEditing(true);
    setEditingIndex(index);
  }

  function handleDeleteTask(index) {
    const newTasks = tasks.filter((elem, id) => {
      return index !== id;
    });
    setTasks(newTasks);
  }

  function handleDeleteAll() {
    setTasks([]);
  }

  return (
    <>
    <div className="app-background">
      <p className="heading-text">
        React To Do List{" "}
        <span role="img" aria-label="react">🔥</span>
      </p>
      <div className="task-container column">
        <form onSubmit={handleAddTask}>
        <div className="row">
          <input className="text-input"type="text"placeholder="Enter task" value={currentTask}onChange={(event) => setCurrentTask(event.target.value)}/>
          <button type="submit" className="add-button">{editing ? "Update" : "Add"}</button>
        </div>
        </form>
          <span className="list-heading">{tasks.length >= 1 ? "Here is Your Task List" : " 📌 No Task added"}</span>
          <ul>
            {tasks.map((task, index) => (
              
              <li key={index} >
              <div className="list-item">
                <div className="task-item"> <input type="checkbox" /> {task}</div>
                <div><button className="edit-btn" onClick={() => handleEditTask(index)}>Edit</button></div>
                <div><button className="del-btn" onClick={() => handleDeleteTask(index)}>Delete</button></div>
              </div>
              </li>
              
            ))}
          </ul>
          <div>{tasks.length >= 1 && (<button className="delall-btn" onClick={handleDeleteAll}>Delete All</button>)}</div>
        </div>
        <p className="footer-text">Shubham Vishwakarma</p>
    </div>
    </>
  );
}

export default TodoList;
