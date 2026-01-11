import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onUpdate, onUpdateStatus }) => {
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    if (!title.trim()) return alert("Title is required");
    onUpdate(task.id, { title, description, status });
    setEditMode(false);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onUpdateStatus(task.id, newStatus);
  };

  const statusClass =
    status === "COMPLETED"
      ? "bg-green-100 text-green-700 border-green-200"
      : status === "IN_PROGRESS"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-blue-100 text-blue-700 border-blue-200";

  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
    
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-600">#{task.id}</div>

        <div className="flex items-center gap-3">
      
          <select
            value={status}
            onChange={handleStatusChange}
            className={`px-3 py-1 rounded-lg border text-sm font-medium outline-none ${statusClass}`}
          >
            <option value="COMPLETED">COMPLETED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="TODO">TODO</option>
          </select>
        </div>
      </div>

  
      {editMode ? (
        <div className="mt-4 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Save
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>

          {task.description && (
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setEditMode(true)}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
