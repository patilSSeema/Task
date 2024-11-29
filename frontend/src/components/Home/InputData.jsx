import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const InputData = ({ inputDiv, setInputDiv }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send the data to an API)
    console.log("Task submitted:", task);
  };

  return (
    <>
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-800 w-full h-screen opacity-65`}
      ></div>
      <div
        className={`${inputDiv} top-0 left-0 flex justify-center items-center w-full h-screen`}
      >
        <div className="bg-gray-900 p-6 w-2/6">
          <div className="flex justify-between text-2xl">
            <h2>Add Task</h2>
            <button onClick={() => setInputDiv("hidden")}>
              <IoClose color="white" />
            </button>
          </div>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="block w-full px-4 py-2 my-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Enter descrption"
            value={task.description}
            onChange={handleChange}
            className="block w-full px-4 py-2 border my-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 my-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
