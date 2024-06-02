import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";


const MainLayout = () => {
 
  const [showBar, setShowBar] = useState(false);

  return (
    <div className="bg-[#fff] w-full min-h-screen">
      <Header showBar={showBar} setShowBar={setShowBar} />
      <Sidebar showBar={showBar} setShowBar={setShowBar} />
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
