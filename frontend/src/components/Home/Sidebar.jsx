import React, { useEffect, useState } from "react";
import { MdOutlineTask } from "react-icons/md";
import { MdOutlineLabelImportant } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
import { MdSpeakerNotesOff } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const [Data, setData] = useState();
  const dispatch = useDispatch();
  const Histry = useNavigate();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    Histry("/login");
  };

  const header = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
 


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v2/get-task",
          {
            headers: header, // Correct property name is "headers"
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching tasks:",
          error.response?.data || error.message
        );
      }
    };

    fetch();
  }, []);

  const data = [
    {
      title: "All Task",
      icons: <MdOutlineTask />,
      link: "/",
    },
    {
      title: "Important Task",
      icons: <MdOutlineLabelImportant />,
      link: "/importantask",
    },
    {
      title: "Completd Task",
      icons: <MdDoneAll />,
      link: "/completetask",
    },
    {
      title: "InCompletd Task",
      icons: <MdSpeakerNotesOff />,
      link: "/incompletetask",
    },
  ];

  return (
    <>
      {Data && (
        <div>
          <h1 className="text-xl font-semibold">{Data.username}</h1>
          <h4 className="mb-3">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((item, i) => {
          return (
            <>
              <Link
                to={item.link}
                className="my-2 flex items-center hover:bg-gray-500 p-2"
                key={i}
              >
                {item.icons}&nbsp; {item.title}{" "}
              </Link>
            </>
          );
        })}
      </div>
      <div>
        <button className="bg-gray-400 p-2 rounded w-full" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
