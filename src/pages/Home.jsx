import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Home({ user, isAuthenticated }) {
const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  //naviagting to team if user is the member

  useEffect(() => {
    const teamData = JSON.parse(localStorage.getItem("team"));

    if (teamData) {
      const teamName = teamData.name;
      console.log("Redirecting to team:", teamName);
      navigate(`/team/${encodeURIComponent(teamName)}`);
    }
  }, [navigate]);

  //checking user's team

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    // console.log(userData.team);
    if (userData?.team) {
      const teamName = userData.team;
      navigate(`/team/${encodeURIComponent(teamName)}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 00 to-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4">Team Management</h1>
        <p className="text-xl text-gray-300">
          {isAuthenticated
            ? `Welcome back, ${user?.fullname}!`
            : "Manage your teams efficiently"}
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        {isAuthenticated ? (
          <div className="text-center">
            <div className="mb-8">
              <div className="max-w-2xl w-sm bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Hello, {user?.fullname}!
              </h2>
              <p className="text-gray-300">{user?.email}</p>
            </div>

            <div className="space-y-4">
              <NavLink
                to="/create-team"
                className="block w-full capitalize bg-gray-900 hover:bg--700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-80 shadow-lg"
              >
                Create a Team
              </NavLink>

              <NavLink
                to="/join-team"
                className="block w-full capitalize bg-gray-900 hover:bg--700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-80 shadow-lg"
              >
                Join a Team
              </NavLink>

              <button
                onClick={handleLogout}
                className="block w-full capitalize bg-red-800 cursor-pointer hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-80 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Get Started
              </h2>
              <p className="text-gray-300 mb-8">
                Sign in to your account or create a new one to start managing
                teams
              </p>
            </div>

            <div className="space-y-4">
              <NavLink
                to="/login"
                className="block w-full capitalize bg-gray-900 hover:bg--700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-95 shadow-lg"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="block capitalize w-full bg-gray-900 hover:bg--700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-95 shadow-lg"
              >
                create new account
              </NavLink>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400">
          {isAuthenticated
            ? `Member since ${new Date(user?.created_at).toLocaleDateString()}`
            : "Join thousands of users managing their teams efficiently"}
        </p>
      </div>
    </div>
  );
}

export default Home;
