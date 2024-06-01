import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { allNav } from "../navigation/allNavigation";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetUser } from "../features/authSlice/authSlice";
import api from "../api/api";

const Sidebar = ({ showBar, setShowBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/");
  };

  const { pathname } = useLocation();


  return (
    <div>
      <div
        onClick={() => setShowBar(false)}
        className={`fixed duration-400 ${
          !showBar ? "invisible" : "visible"
        } w-screen h-screen bg-[#dce0e480] left-0 top-0 z-10 `}
      ></div>

      <div
        className={`w-[260px] fixed bg-[#3D464D] z-50 top-0 h-screen shadow-sm transition-all ${
          showBar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        <div className="h-[75px] flex justify-center items-center my-4">
          <Link to="/" className="w-[180px] h-[50px] text-white">
            {/* <img src={logo} alt="" /> */}
          </Link>
        </div>

        <div className="px-[16px] ">
          <ul>
            {allNav.map((i, index) => (
              <li key={index} className="flex flex-col">
                <Link
                  to={i.path}
                  className={`${
                    pathname === i.path
                      ? "bg-gray-600 shadow-md text-white duration-500"
                      : "text-[#fff] font-bold duration-300"
                  } px-[10px] py-[9px]  rounded-sm flex items-center justify-start gap-[12px] hover:pl-4 transition-all w-full mb-1`}
                >
                  <span>{i.icon}</span>
                  <span>{i.title}</span>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={handleLogout}
                className="text-[#fff] font-bold duration-300 px-[10px] py-[9px]  rounded-sm flex items-center justify-start gap-[12px] hover:pl-4 transition-all w-full mb-1"
              >
                <AiOutlineLogout />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
