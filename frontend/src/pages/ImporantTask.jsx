import React from "react";
import Card from "../components/Home/Card";
import { IoMdAddCircle } from "react-icons/io";

const ImporantTask = () => {
  return (
    <div>
      {" "}
      <div>
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-2xl">Welcome ,User </h3>
          </div>
          <div>
            <IoMdAddCircle className="text-4xl" />
          </div>
        </div>
        <div>
          <Card home={"false"} />
        </div>
      </div>
    </div>
  );
};

export default ImporantTask;
