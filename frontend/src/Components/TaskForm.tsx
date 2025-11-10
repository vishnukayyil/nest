// src/Components/TaskForm.tsx
import React, { useState } from "react";
import axios from "axios";

const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000/api/tasks";

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      alert("Please enter a task name");
      return;
    }

    console.log("TaskForm: posting to", API, "title:", trimmed);

    try {
      const res = await axios.post(API, { title: trimmed });
      console.log("TaskForm: POST response", res.status, res.data);
      setTitle("");
      onTaskAdded();
    } catch (err: any) {

      console.error("TaskForm: POST error", err);
      if (err.response) {
        alert(`Failed to add task: ${err.response.status} ${JSON.stringify(err.response.data)}`);
      } else {
        alert(`Network/CORS error: ${err.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        aria-label="task-title"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
