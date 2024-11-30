import React, { useEffect, useState } from "react";
import Card from "../components/Home/Card";
import axios from "axios";

const IncompletedTask = () => {
  const [data, setData] = useState();
  const header = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v2/get-incomp-task",
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
    <div>
      <div>
        <Card home={"false"} data={data} />
      </div>
    </div>
  );
};

export default IncompletedTask;
