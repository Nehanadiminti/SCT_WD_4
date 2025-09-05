import React, { useState } from "react";

function MyComponent() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDateTime, setNewDateTime] = useState("");
  const [compTasks, setCompTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handleInput(e) {
    setNewTask(e.target.value);
  }

  function handleDateTimeChange(e) {
    setNewDateTime(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "" && newDateTime !== "") {
      const newTaskObj = {
        text: newTask,
        dateTime: newDateTime,
      };
      setTasks((t) => [...t, newTaskObj]);
      setNewTask("");
      setNewDateTime("");
    }
  }

  function removeTask(index) {
    const updatedTasks = tasks.filter((_, i) => index !== i);
    setTasks(updatedTasks);
  }

  function moveUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index - 1], updatedTasks[index]] = [
        updatedTasks[index],
        updatedTasks[index - 1],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index + 1], updatedTasks[index]] = [
        updatedTasks[index],
        updatedTasks[index + 1],
      ];
      setTasks(updatedTasks);
    }
  }

  function markCompleted(index) {
    const completedTask = tasks[index];
    setCompTasks((c) => [...c, completedTask]);
    removeTask(index);
  }

  function toggleEdit(index) {
    setEditIndex(index === editIndex ? null : index);
  }

  function handleEditChange(index, field, value) {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  }

  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  return (
    <div className="To-Do-App">
      <h2>To-Do List</h2>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter your task..."
          value={newTask}
          onChange={handleInput}
        />
        <input
          type="datetime-local"
          value={newDateTime}
          onChange={handleDateTimeChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="container">
        <h3>Tasks To Do</h3>
        <ul>
          {tasks.map((task, index) => (
            <li className="task-list" key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) =>
                      handleEditChange(index, "text", e.target.value)
                    }
                  />
                  <input
                    type="datetime-local"
                    value={task.dateTime}
                    onChange={(e) =>
                      handleEditChange(index, "dateTime", e.target.value)
                    }
                  />
                </>
              ) : (
                <>
                  <span className="text">{task.text}</span>
                  <span style={{ marginLeft: "10px", fontSize: "0.9em" }}>
                    ({formatDateTime(task.dateTime)})
                  </span>
                </>
              )}

              <input
                type="checkbox"
                checked={false}
                onChange={() => markCompleted(index)}
              />
              <button onClick={() => moveUp(index)}>⬆</button>
              <button onClick={() => moveDown(index)}>⬇</button>
              <button onClick={() => removeTask(index)}>Remove</button>
              <button onClick={() => toggleEdit(index)}>
                {editIndex === index ? "Save" : "Edit"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {compTasks.length > 0 && (
        <div className="container">
          <h3>Completed Tasks</h3>
          <ul>
            {compTasks.map((task, index) => (
              <li className="comp-task-list" key={index}>
                {task.text} - <i>{formatDateTime(task.dateTime)}</i>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyComponent;