import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to home or dashboard
        window.location.href = "/";
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 00 to-gray-900 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white ">
            Log in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 px-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 px-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="block w-full capitalize bg-gray-900 hover:bg--700 cursor-pointer text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-95 shadow-lg disabled:opacity-50"
            >
              {loading ? "logging in..." : "log in"}
            </button>
            <p className="text-white mt-4 mx-4 text-center ">Don't have a account?

            <NavLink
              to="/register"
              className="text-blue-600 pl-2 underline"
            >
              create new account
            </NavLink>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
