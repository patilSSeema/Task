import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Home from "./pages/Home";
import AllTask from "./pages/AllTask";
import ImporantTask from "./pages/ImporantTask";
import CompletedTask from "./pages/CompletedTask";
import IncompletedTask from "./pages/IncompletedTask";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Automatically log in if credentials exist in localStorage
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }

    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, dispatch]);

  return (
    <div className="bg-gray-700 text-white min-h-screen p-4">
      <Routes>
        {/* Home Layout */}
        <Route path="/" element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path="importantask" element={<ImporantTask />} />
          <Route path="completetask" element={<CompletedTask />} />
          <Route path="incompletetask" element={<IncompletedTask />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
