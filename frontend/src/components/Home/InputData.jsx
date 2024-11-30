import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const InputData = ({ inputDiv, setInputDiv, updatedData, setUpdatedData }) => {
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (updatedData?.id) {
      setTask({
        title: updatedData.title || "",
        description: updatedData.description || "",
      });
    } else {
      setTask({ title: "", description: "" });
    }
  }, [updatedData]);

  const header = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = ({ target: { name, value } }) => {
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const validateTask = () => {
    if (!task.title.trim() || !task.description.trim()) {
      alert("All fields are required.");
      return false;
    }
    return true;
  };

  const handleRequest = async (url, method, successMessage) => {
    if (!validateTask()) return;

    try {
      const response = await axios[method](url, task, { headers: header });
      alert(response.data.message || successMessage);
      resetForm();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const resetForm = () => {
    setInputDiv("hidden");
    setUpdatedData({ id: "", title: "", description: "" });
    setTask({ title: "", description: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRequest(
      "http://localhost:1000/api/v2/create-task",
      "post",
      "Task added successfully!"
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `http://localhost:1000/api/v2/update-task/${updatedData.id}`;
    handleRequest(url, "put", "Task updated successfully!");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-800 w-full h-screen opacity-50`}
      ></div>

      {/* Modal */}
      <div
        className={`${inputDiv} top-0 left-0 flex justify-center items-center w-full h-screen`}
      >
        <div className="bg-gray-900 p-6 w-full max-w-md rounded-md shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center text-xl text-white mb-4">
            <h2>{updatedData.id ? "Update Task" : "Add Task"}</h2>
            <button onClick={resetForm}>
              <IoClose size={24} />
            </button>
          </div>

          {/* Input Fields */}
          <form onSubmit={updatedData.id ? handleUpdate : handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={task.title}
              onChange={handleChange}
              className="block w-full px-4 py-2 mb-4 border rounded-md text-black"
              required
            />
            <textarea
              name="description"
              rows="4"
              placeholder="Task Description"
              value={task.description}
              onChange={handleChange}
              className="block w-full px-4 py-2 mb-4 border rounded-md text-black"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {updatedData.id ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputData;
