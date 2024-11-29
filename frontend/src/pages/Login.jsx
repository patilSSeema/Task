import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded w-2/6">
        <div className="font-semibold py-2 px-3 2xl items-center">
          Login Here !!
        </div>
        <input
          type="text"
          placeholder="Username"
          className="bg-white px-3 py-2 my-4 rounded w-full"
          name="username"
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-white px-3 py-2 my-4 rounded w-full"
          name="password"
        />
        <div className="w-full flex justify-between items-center">
          <button className="font-semibold py-2 px-3 my-4 bg-blue-400 2xl">
            Log In
          </button>
          <Link className="text-gray-400 hover:text-gray-200" to="/register">
            Not Have Account ? Register Here !
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
