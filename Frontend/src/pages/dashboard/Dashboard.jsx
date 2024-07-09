import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  console.log(Token);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        const result = response.data;
        console.log(response);
        console.log(result);
        setUser(result);
      } catch (e) {
        console.error("Failed to fetch user", e);
        navigate("/login");
      }
    };

    if (Token) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [Token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Logout
      </button>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        {user ? (
          <ul className="space-y-2">
            {user.role == "admin" ? (
              <h1 className="text-center">Admin Details</h1>
            ) : (
              <h1 className="text-center">User Details</h1>
            )}
            <li className="text-gray-700 ">
              <b>Name: </b>
              {user.name}
            </li>
            <li className="text-gray-700">
              <b>Email:</b> {user.email}
            </li>
            <li className="text-gray-700">
              <b>Role:</b> {user.role}
            </li>
          </ul>
        ) : (
          <p className="text-gray-700">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
