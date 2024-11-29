import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTask from "./pages/AllTask";
import ImporantTask from "./pages/ImporantTask";
import CompletedTask from "./pages/CompletedTask";
import IncompletedTask from "./pages/IncompletedTask";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="bg-gray-700 text-white h-screen p-2 relative">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<AllTask />} />
            <Route path="/importantask" element={<ImporantTask />} />
            <Route path="/completetask" element={<CompletedTask />} />
            <Route path="/incompletetask" element={<IncompletedTask />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
