import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // BACKEND URL
  const API = "https://todo-backend-5-8iqc.onrender.com/api/tasks";

  // GET (with error handling)
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

  // ADD
  const addTask = async () => {
    if (!task) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });

      const data = await res.json();
      setTasks(data);
      setTask("");
    } catch (err) {
      console.log("ADD error:", err);
    }
  };

  // COMPLETE
  const completeTask = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "done" }),
      });

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("UPDATE error:", err);
    }
  };

  // FAIL
  const failTask = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "fail" }),
      });

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("FAIL error:", err);
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("DELETE error:", err);
    }
  };

  return (
    <div className="app-wrapper">

      <div className="top-header">
        ITS FREDRICK'S FIRST PROJECT OF FULL STACK
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
              <li key={t._id} className={t.status}>
                <span>{t.task}</span>

                <div className="actions">
                  <button className="ok" onClick={() => completeTask(t._id)}>✓</button>
                  <button className="no" onClick={() => failTask(t._id)}>✗</button>
                  <button className="del" onClick={() => deleteTask(t._id)}>🗑</button>
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