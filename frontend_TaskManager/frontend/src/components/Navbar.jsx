import React from "react";
import { useAuth } from '../context/Authcontext';
import { useNavigate } from "react-router-dom";

const Navbar = ({ searchId, setSearchId, onSearch }) => {
  const { isAuthenticate, logout, username } = useAuth();
  const navigate = useNavigate();

  const userLetter = username ? username.charAt(0).toUpperCase() : "?";
  console.log(username);
  
  console.log(userLetter);
  

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
       
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-gray-50 font-bold text-gray-900">
            TM
          </div>
          <span className="text-lg font-bold text-gray-900">Task Manager</span>
        </div>

       
        {isAuthenticate && (
          <form onSubmit={onSearch} className="hidden items-center gap-2 sm:flex">
            <input
              type="number"
              placeholder="Search Task ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-56 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
            >
              Search
            </button>
          </form>
        )}

        
        <div className="flex items-center gap-3">
          {isAuthenticate ? (
            <>
              
              <div
                title={username || ""}
                className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-indigo-50 font-bold text-indigo-700"
              >
                {userLetter}
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Login
            </button>
          )}
        </div>
      </div>

     
      {isAuthenticate && (
        <div className="mx-auto max-w-5xl px-4 pb-3 sm:hidden">
          <form onSubmit={onSearch} className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Search Task ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
