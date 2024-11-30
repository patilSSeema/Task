import axios from "axios";
import React, { useState } from "react";  
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const Histry = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) Histry("/");

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    try {
      if (data.username === "" || data.password === "")
        alert("Enter all fields");
      else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/login",
          data
        );
        setData({ username: "", password: "" });
        console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        Histry("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="bg-gray-800 p-6 rounded w-full max-w-md">
        {/* Title */}
        <div className="font-semibold py-2 text-center text-white text-lg">
          Login Here!!
        </div>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="bg-white px-4 py-3 my-3 rounded w-full text-black text-sm"
          name="username"
          value={data.username}
          onChange={change}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="bg-white px-4 py-3 my-3 rounded w-full text-black text-sm"
          name="password"
          value={data.password}
          onChange={change}
        />

        {/* Buttons */}
        <div className="w-full flex flex-col items-center">
          <button
            className="font-semibold py-2 px-4 my-4 bg-blue-500 hover:bg-blue-600 text-white rounded w-full text-sm"
            onClick={submit}
          >
            Log In
          </button>
          <Link
            className="text-gray-400 hover:text-gray-200 text-center text-sm mt-2"
            to="/register"
          >
            Don't have an account? Register Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
