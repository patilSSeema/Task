import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Register = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [data, setData] = useState({ username: "", email: "", password: "" });
  const Histry = useNavigate();
  if (isLoggedIn) Histry("/");

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    try {
      if (data.username === "" || data.email === "" || data.password === "")
        alert("Enter all fields");
      else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/signin",
          data
        );
        setData({ username: "", email: "", password: "" });
        console.log(response);
        Histry("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="bg-gray-800 p-6 rounded w-full max-w-md">
        {/* Title */}
        <div className="font-semibold py-4 text-center text-white text-lg">
          Sign Up Here!!
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

        {/* Email Address Input */}
        <input
          type="email"
          placeholder="Email Address"
          className="bg-white px-4 py-3 my-3 rounded w-full text-black text-sm"
          name="email"
          value={data.email}
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
            Sign Up
          </button>
          <Link
            className="text-gray-400 hover:text-gray-200 text-center text-sm mt-2"
            to="/login"
          >
            Already have an account? Login Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
