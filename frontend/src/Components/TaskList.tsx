// import React from "react";
// import type { Task } from "../types";

// interface TaskListProps {
//   tasks: Task[];
//   refresh: () => void;
// }

// const TaskList: React.FC<TaskListProps> = ({ tasks, refresh }) => {
//   return (
//     <div>
//       <p>TaskList loaded — {tasks.length} tasks</p>
//       {tasks.map((t) => (
//         <div key={t._id || t.title} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 6 }}>
//           <strong>{t.title}</strong>
//           <div>{t.status}</div>
//         </div>
//       ))}
//       <button onClick={refresh}>Refresh</button>
//     </div>
//   );
// };

// export default TaskList;
// src/Components/TaskList.tsx
import React, { useState } from "react";
import axios from "axios";
import type { Task } from "../types";

const API: string = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000/api/tasks";

interface TaskListProps {
  tasks: Task[];
  refresh: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, refresh }) => {
  // local UI state for editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const startEdit = (task: Task) => {
    setEditingId(task._id || null);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const saveEdit = async (id?: string) => {
    if (!id) return;
    const trimmed = editTitle.trim();
    if (!trimmed) return alert("Title cannot be empty");

    try {
      console.log("Updating title for", id, "->", trimmed);
      const res = await axios.put(`${API}/${id}`, { title: trimmed });
      console.log("Update response:", res.status);
      cancelEdit();
      refresh();
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Failed to update task. Check console.");
    }
  };

  const updateStatus = async (id: string | undefined, status: string) => {
    if (!id) return;
    try {
      await axios.put(`${API}/${id}`, { status });
      refresh();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Check console.");
    }
  };

  const deleteTask = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm("Delete this task?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      refresh();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task. Check console.");
    }
  };

  if (!tasks) return <div>No tasks available</div>;

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet — add some above.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id || task.title}
            style={{
              border: "1px solid #eee",
              padding: 12,
              marginBottom: 10,
              borderRadius: 6,
            }}
          >
            {/* Title / Edit UI */}
            {editingId === task._id ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={() => saveEdit(task._id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: 0 }}>{task.title}</h3>
                  <div style={{ color: "#666", marginTop: 6 }}>{task.status || "Pending"}</div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </div>
            )}

            {/* Status control (hidden when editing title if you prefer) */}
            <div style={{ marginTop: 8 }}>
              <label>
                Status:{" "}
                <select
                  value={(task as any).status || "Pending"}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
