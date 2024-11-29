import React, { useState } from "react";
import Card from "../components/Home/Card";
import { IoMdAddCircle } from "react-icons/io";
import InputData from "../components/Home/InputData";
const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
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
          <Card home={"true"} setInputDiv={setInputDiv} />
        </div>
      </div>
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
    </>
  );
};

export default AllTask;
