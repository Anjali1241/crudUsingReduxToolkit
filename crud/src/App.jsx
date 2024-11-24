// App.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addtask, edittask, deletetask } from './feature/task/tasksSlice';

function App() {
  // Read tasks from the Redux store
  const tasks = useSelector((state) => state.taskData.task);
  const dispatch = useDispatch(); // Dispatch actions to Redux store

  const [task, setTask] = useState({ firstName: '', lastName: '' });
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // Handle adding a new task
  const handleAddTask = () => {
    if (!task.firstName || !task.lastName) return;

    const newTask = {
      id: new Date().getTime(), // Using timestamp as a unique ID
      firstName: task.firstName,
      lastName: task.lastName,
    };

    // Dispatch addTask action to Redux store
    dispatch(addtask(newTask));

    setTask({ firstName: '', lastName: '' });
  };

  // Handle editing a task
  const handleEditTask = (taskToEdit) => {
    setEditMode(true);
    setEditTaskId(taskToEdit.id);
    setTask({ firstName: taskToEdit.firstName, lastName: taskToEdit.lastName });
  };

  // Handle updating an existing task
  const handleUpdateTask = () => {
    if (!task.firstName || !task.lastName) return;

    const updatedTask = { ...task, id: editTaskId };

    // Dispatch edittask action to Redux store
    dispatch(edittask(updatedTask));

    setTask({ firstName: '', lastName: '' });
    setEditMode(false);
    setEditTaskId(null);
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    // Dispatch deletetask action to Redux store
    dispatch(deletetask({ id }));
  };

  return (
    <div>
      <h1>CRUD with Redux Toolkit</h1>
      <div>
        <input
          type="text"
          value={task.firstName}
          onChange={(e) => setTask({ ...task, firstName: e.target.value })}
          placeholder="First Name"
        />
        <input
          type="text"
          value={task.lastName}
          onChange={(e) => setTask({ ...task, lastName: e.target.value })}
          placeholder="Last Name"
        />
        {editMode ? (
          <button onClick={handleUpdateTask}>Update Task</button>
        ) : (
          <button onClick={handleAddTask}>Add Task</button>
        )}
      </div>

      <h2>Task List:</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.firstName} {task.lastName}
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
