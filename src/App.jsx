import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Team from "./pages/Team";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateTeamForm from "./pages/CreateTeamForm";
import JoinTeamForm from "./pages/JoinTeamForm";
import AddNote from "./pages/AddNote";
import CreateAccount from "./pages/CreateAccount";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  //aauthenticating use
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication check error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">authenticating user...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="poppins">
      <Routes>
        <Route
          path="/"
          element={<Home user={user} isAuthenticated={isAuthenticated} />}
        />
        <Route path="/team/:teamName" element={<Team />} />
        //TODO: do he have a team? if yes redirect him to the page //need to
        work on ths page
        <Route path="/login" element={<Login />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/create-team" element={<CreateTeamForm />} />
        <Route path="/join-team" element={<JoinTeamForm />} />
      </Routes>
    </div>
  );
}

export default App;
