import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
    setTasks(updatedTasks);
    setNewTask("");
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Task Tracker</h1>
        <div style={styles.inputContainer}>
          <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              style={styles.input}
          />
          <button onClick={addTask} style={styles.addButton}>
            Add Task
          </button>
        </div>
        <ul style={styles.taskList}>
          {tasks.map((task) => (
              <li key={task.id} style={styles.taskItem}>
            <span
                style={{
                  ...styles.taskText,
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#888" : "#000",
                }}
            >
              {task.text}
            </span>
                <div>
                  <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      style={styles.actionButton}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                      onClick={() => deleteTask(task.id)}
                      style={{ ...styles.actionButton, backgroundColor: "#ff4d4d" }}
                  >
                    Delete
                  </button>
                </div>
              </li>
          ))}
        </ul>
        {tasks.length > 0 && (
            <button onClick={clearAllTasks} style={styles.clearButton}>
              Clear All Tasks
            </button>
        )}
      </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  taskText: {
    flex: 1,
    marginRight: "10px",
  },
  actionButton: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  clearButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
};