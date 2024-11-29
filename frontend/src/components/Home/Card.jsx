import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const Card = ({ home, setInputDiv }) => {
  const data = [
    {
      title: "Complete The Project",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio iste quis sequi repellendus voluptatem error autem itaque, voluptate nisi dolore.",
      status: "Completed",
    },
    {
      title: "Meeting with Client",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio iste quis sequi repellendus voluptatem error autem itaque, voluptate nisi dolore.",
      status: "Completed",
    },
    {
      title: "Assigenment",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio iste quis sequi repellendus voluptatem error autem itaque, voluptate nisi dolore.",
      status: "In Completed",
    },
    {
      title: "Do The House Chors",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio iste quis sequi repellendus voluptatem error autem itaque, voluptate nisi dolore.",
      status: "In Completed",
    },
  ];
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
                <p className="my-3"> {item.Description} </p>
              </div>
              <div className="mt-4 w-full flex flex-row justify-between items-center">
                <button
                  className={`${
                    item.status === "In Completed"
                      ? "bg-red-600"
                      : "bg-green-600"
                  } p-2 rounded`}
                >
                  {item.status}
                </button>

                <div className="mx-2 text-2xl font-semibold">
                  <button className="mx-2 ">
                    {" "}
                    <IoBookmarkOutline />
                  </button>
                  <button className="mx-2">
                    <FaRegEdit />
                  </button>
                  <button className="text-red-700 mx-2">
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
