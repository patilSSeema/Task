import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { IoIosBookmark } from "react-icons/io";

const Card = ({ home, setInputDiv, data, setUpdatedData }) => {
  const header = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleComplete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2//update-comp-task/${id}`,
        {},
        {
          headers: header, // Correct property name is "headers"
        }
      );
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response?.data || error.message
      );
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`,
        {},
        {
          headers: header, // Correct property name is "headers"
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response?.data || error.message
      );
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`,

        {
          headers: header, // Correct property name is "headers"
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response?.data || error.message
      );
    }
  };

  const updateTask = async (id, title, description) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, description: description });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
      {data &&
        data.map((item, index) => {
          return (
            <div
              className=" flex flex-col justify-between p-4 m-1 bg-gray-600 rounded"
              key={index}
            >
              <div>
                <h3 className="text-xl font-semibold">{item.title} </h3>
                <p className="my-3"> {item.description} </p>
              </div>
              <div className="mt-4 w-full flex flex-row justify-between items-center">
                <button
                  className={`${
                    item.complete === false ? "bg-red-600" : "bg-green-600"
                  } p-2 rounded`}
                  onClick={() => handleComplete(item._id)}
                >
                  {item.complete === true ? "Completed" : "Incompleted"}
                </button>

                <div className="mx-2 text-2xl font-semibold">
                  <button
                    className="mx-2 "
                    onClick={() => handleImportant(item._id)}
                  >
                    {item.important === false ? (
                      <IoBookmarkOutline />
                    ) : (
                      <IoIosBookmark className="text-blue-600" />
                    )}
                  </button>
                  <button
                    className="mx-2"
                    onClick={() =>
                      updateTask(item._id, item.title, item.description)
                    }
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-700 mx-2"
                    onClick={() => deleteTask(item._id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {home === "true" && (
        <button
          className=" flex flex-col justify-center items-center p-4 m-1 bg-gray-600 rounded"
          onClick={() => setInputDiv("fixed")}
        >
          <button className="text-5xl">
            <IoMdAddCircle />
          </button>
          <h3 className="text-2xl">Add Task</h3>
        </button>
      )}
    </div>
  );
};

export default Card;
