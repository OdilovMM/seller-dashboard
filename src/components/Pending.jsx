import React from "react";
import { HashLoader } from "react-spinners";

const Pending = () => {
  return (
    <div className="w-full h-[85vh] flex justify-center items-center  ">
      <div>
        <HashLoader size={120} color="red" />
        <div className="mt-3 flex flex-col justify-center items-center">
          <h2 className="font-bold">Account is pending</h2>
        </div>
      </div>
    </div>
  );
};

export default Pending;
