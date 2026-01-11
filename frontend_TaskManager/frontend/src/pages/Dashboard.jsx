import React, { useEffect, useState } from "react";
import * as taskApi from "../api/task";
import TaskItem from '../components/Taskitem';
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

 
  const [searchId, setSearchId] = useState("");
  const [searchedTask, setSearchedTask] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await taskApi.getAll();
      setTasks(res.data);
    } catch (err) {
      alert("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Title is required");

    try {
      await taskApi.create({ title, description });

      setTitle("");
      setDescription("");
      fetchTasks();

    } catch (err) {
      alert("Failed to create task");
      console.error(err);
    }
  };

 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await taskApi.deletetask(id);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
      console.error(err);
    }
  };

 
  const handleUpdate = async (id, data) => {
    try {
      await taskApi.update(id, data);
      fetchTasks();
    } catch (err) {
      alert("Failed to update task");
      console.error(err);
    }
  };


  const handleUpdateStatus = async (id, status) => {
    try {
      await taskApi.updateStatus(id, { status });
      fetchTasks();
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) return alert("Enter task id");

    try {
      const res = await taskApi.getById(searchId);
      setSearchedTask(res.data);
    } catch (err) {
      setSearchedTask(null);
      alert("Task not found");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar searchId={searchId} setSearchId={setSearchId} onSearch={handleSearch} />

      <div className="p-6">
        <div className="mx-auto max-w-4xl">

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Create Task</h3>

            <form
              onSubmit={handleCreate}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Create
              </button>
            </form>
          </div>

        
          {searchedTask && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Search Result</h3>

              <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
                <span className="font-semibold text-gray-900">Found:</span>{" "}
                <span className="text-gray-700">
                  #{searchedTask.id} — {searchedTask.title} ({searchedTask.status})
                </span>
              </div>
            </div>
          )}

         
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900">All Tasks</h3>

            {loading ? (
              <p className="mt-4 text-sm text-gray-600">Loading...</p>
            ) : tasks.length === 0 ? (
              <p className="mt-4 text-sm text-gray-600">No tasks found</p>
            ) : (
              <div className="mt-4 space-y-4">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
