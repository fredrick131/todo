import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // BACKEND URL
  const API = "https://todo-backend-6-s5xo.onrender.com/tasks";

  // GET TASKS
  const getTasks = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("GET error:", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!task) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: task }), // FIXED
      });

      const data = await res.json();

      // FIXED: append correctly
      setTasks((prev) => [...prev, data]);
      setTask("");
    } catch (err) {
      console.log("ADD error:", err);
    }
  };

  // COMPLETE / TOGGLE TASK
  const completeTask = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
      });

      const data = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? data : t))
      );
    } catch (err) {
      console.log("UPDATE error:", err);
    }
  };

  // FAIL TASK
  const failTask = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
      });

      const data = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? data : t))
      );
    } catch (err) {
      console.log("FAIL error:", err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log("DELETE error:", err);
    }
  };

  return (
    <div className="app-wrapper">

      <div className="top-header">
        ITS FREDRICK'S FIRST FULL STACK PROJECT 🚀
      </div>

      <div className="app">
        <div className="card">

          <h1 className="todo-title">✨ Todo App</h1>

          <div className="inputBox">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task..."
            />

            <button onClick={addTask}>➕ Add</button>
          </div>

          <ul>
            {tasks.map((t) => (
              <li key={t._id} className={t.completed ? "done" : ""}>
                <span>{t.text}</span>

                <div className="actions">
                  <button onClick={() => completeTask(t._id)}>✔</button>
                  <button onClick={() => failTask(t._id)}>✗</button>
                  <button onClick={() => deleteTask(t._id)}>🗑</button>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default App;