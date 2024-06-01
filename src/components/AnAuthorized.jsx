import React from "react";

const AnAuthorized = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-300">
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-[48px]">Action is illegal</h2>
        <h2 className="text-[56px]">You are not authorized</h2>
      </div>
    </div>
  );
};

export default AnAuthorized;
