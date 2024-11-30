import React, { useEffect, useState } from "react";
import Card from "../components/Home/Card";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";

const ImporantTask = () => {
  const [data, setData] = useState();
  const header = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  // console.log(header);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v2/get-imp-task",
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
  console.log(data);
  return (
    <div>
      <div>
        <div className="flex flex-row justify-end">
          <div>
            <IoMdAddCircle className="text-4xl" />
          </div>
        </div>
        <div>
          <Card home={"false"} data={data} />
        </div>
      </div>
    </div>
  );
};

export default ImporantTask;
