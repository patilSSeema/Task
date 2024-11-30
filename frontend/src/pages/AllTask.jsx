import React, { useEffect, useState } from "react";
import Card from "../components/Home/Card";
import { IoMdAddCircle } from "react-icons/io";
import InputData from "../components/Home/InputData";
import axios from "axios";
const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const header = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  // console.log(header);

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
  });
  

  return (
    <>
      <div>
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-2xl">Welcome ,User </h3>
          </div>
          <div>
            <button onClick={() => setInputDiv("fixed")}>
              <IoMdAddCircle className="text-4xl" />
            </button>
          </div>
        </div>
        <div>
          {Data && (
            <Card
              home={"true"}
              setInputDiv={setInputDiv}
              data={Data.tasks}
              setUpdatedData={setUpdatedData}
            />
          )}
        </div>
      </div>
      <InputData
        inputDiv={inputDiv}
        setInputDiv={setInputDiv}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
};

export default AllTask;
