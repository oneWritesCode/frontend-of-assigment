import React, { useEffect, useState } from "react";

function JoinTeamForm() {
  const [formData, setFormData] = useState({
    teamCode: "",
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const user = JSON.parse(raw);
      setFormData((prev) => ({
        ...prev,
        userName: user?.fullname || user?.name || prev.userName,
        email: user?.email || prev.email,
      }));
    } catch (error) {
      console.log("error ", error);
      
      throw new error();
    }
  }, []);

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
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/teams/join-team",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("team", JSON.stringify(data.team));

        setSuccess("Successfully joined the team! You are now a member.");

        setFormData({
          teamCode: "",
          userName: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setError(data.error || "Failed to join team");
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
          <h2 className="text-3xl font-bold text-white">
            Join an existing team
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Enter the team code to join a team
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="teamName"
                className="px-2 block text-sm font-medium text-gray-300"
              >
                Team Name
              </label>
              <input
                id="teamName"
                name="teamName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                placeholder="Enter team name"
                value={formData.teamName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="teamCode"
                className="block text-sm font-medium text-gray-300"
              >
                Team Code
              </label>
              <input
                id="teamCode"
                name="teamCode"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                placeholder="Enter team code"
                value={formData.teamCode}
                onChange={handleChange}
                maxLength="6"
              />
              <p className="mt-1 text-xs text-gray-400">
                Ask your team admin for team code
              </p>
            </div>

            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-300"
              >
                Your Name
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                placeholder="Enter your name"
                value={formData.userName}
                onChange={handleChange}
                readOnly
                aria-readonly="true"
                title="Filled from your account"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                readOnly
                aria-readonly="true"
                title="Filled from your account"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          {success && (
            <div className="text-green-400 text-sm text-center">{success}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="block w-full capitalize bg-gray-900 hover:bg--700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-95 shadow-lg disabled:opacity-50"
            >
              {loading ? "Joining Team..." : "Join Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinTeamForm;