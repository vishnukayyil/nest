// src/App.tsx
import React, { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import type { Task } from "./types";
import axios from "axios";

const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000/api/tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { _id: "1", title: "Demo task", status: "Pending" },
  ]);

  useEffect(() => {
    console.log("App mounted (safe)");
  }, []);

  const fetchTasks = async () => {
    console.log("fetchTasks: calling backend ->", API);
    try {
      const res = await axios.get<Task[]>(API);
      console.log("fetchTasks: response status", res.status);
      setTasks(res.data);
      console.log("fetchTasks: success, items:", res.data.length);
    } catch (err) {
  
      console.error("fetchTasks: error", err);

    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>📝 Task Management App </h1>
      <TaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} refresh={fetchTasks} />
    </div>
  );
};

export default App;
