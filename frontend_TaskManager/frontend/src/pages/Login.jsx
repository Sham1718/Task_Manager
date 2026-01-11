import React, { useState } from "react";
import { useAuth } from '../context/Authcontext';
import { loginuser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginuser({ username, password });

      // ✅ store token + username for navbar avatar
      login(res.data.token, username);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-indigo-50 font-bold text-indigo-700">
            TM
          </div>
          <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Login to manage your tasks securely.
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handlelogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <div className="mt-5 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
