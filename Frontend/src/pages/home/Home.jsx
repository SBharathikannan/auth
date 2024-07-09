import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Home</h1>
      <div className="space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <a href="/register">SIGNUP</a>
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <a href="/login">LOGIN</a>
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          <a href="/dashboard">Dashboard</a>
        </button>
      </div>
    </div>
  );
}

export default Home;
