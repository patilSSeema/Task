import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[98vh] gap-4">
      {/* Sidebar */}
      <div className="border-gray-500 border rounded-xl w-full md:w-1/4 lg:w-1/6 p-4 flex flex-col justify-around">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="border-gray-500 border rounded-xl w-full md:w-3/4 lg:w-5/6 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;