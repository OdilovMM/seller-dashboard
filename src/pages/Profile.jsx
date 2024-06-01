import React, { useState } from "react";
import { FaImages } from "react-icons/fa6";
import { FadeLoader, ScaleLoader } from "react-spinners";
import { FaPenNib } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  profileImageUpload,
  addProfileInfo,
} from "../features/authSlice/authSlice";
import { createStripeConnect } from "../features/userSlice/sellerSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, imgLoader, loader } = useSelector((state) => state.auth);
  const { loader: isLoading } = useSelector((state) => state.seller);

  const [userDataInfo, setUserDataInfo] = useState({
    division: "",
    district: "",
    shopName: "",
    subDistrict: "",
  });

  const handleAddImage = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profileImageUpload(formData));
      console.log(formData);
    }
  };

  const handleUserInfoInputHandler = (e) => {
    setUserDataInfo({
      ...userDataInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUserData = (e) => {
    e.preventDefault();
    dispatch(addProfileInfo(userDataInfo));
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#3D464D] rounded-md text-[#d0d2d6]">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img src={userInfo.image} alt="" />
                  {imgLoader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImages />{" "}
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={handleAddImage}
                type="file"
                name="img"
                className="hidden"
                id="img"
              />
            </div>

            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 bg-[#54595d] p-4 rounded-[5px] relative ">
                <span className="p-[5px] bg-white rounded absolute right-2 top-2 cursor-pointer">
                  <FaPenNib color="black" />
                </span>
                <div className="flex gap-2 ">
                  <span className="font-bold">Name:</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-bold">Email:</span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-bold">Role:</span>
                  <span className="capitalize">{userInfo.role}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-bold">Status:</span>
                  <span className="capitalize">{userInfo.status}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-bold">Payment Account:</span>
                  {userInfo?.payment === "active" ? (
                    <p>Activated</p>
                  ) : (
                    <p className="bg-slate-400 rounded-md px-2 cursor-pointer">
                      {userInfo?.payment === "active" ? (
                        <span className="capitalize">{userInfo.payment}</span>
                      ) : (
                        <button
                          onClick={() => dispatch(createStripeConnect())}
                          className="capitalize text-black"
                        >
                          {isLoading
                            ? "Wait...! Now >>> Redirecting..."
                            : "Create Stripe Account"}
                        </button>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-0 md:px-5 py-2">
              {!userInfo?.shopInfo ? (
                <form onSubmit={handleSubmitUserData}>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="shopName">Shop name</label>
                    <input
                      type="text"
                      name="shopName"
                      value={userDataInfo.shopName}
                      onChange={handleUserInfoInputHandler}
                      id="shopName"
                      placeholder="Shop name"
                      className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="division">Division name</label>
                    <input
                      type="text"
                      name="division"
                      value={userDataInfo.division}
                      onChange={handleUserInfoInputHandler}
                      id="division"
                      placeholder="Department name"
                      className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="district">District name:</label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      value={userDataInfo.district}
                      onChange={handleUserInfoInputHandler}
                      placeholder="District name"
                      className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="subDistrict">Sub District</label>
                    <input
                      type="text"
                      name="subDistrict"
                      id="subDistrict"
                      value={userDataInfo.subDistrict}
                      onChange={handleUserInfoInputHandler}
                      placeholder="Sub District"
                      className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                    />
                  </div>

                  <div className="flex">
                    <button
                      disabled={loader}
                      type="submit"
                      // disabled={loader ? true : false}
                      className="group relative w-[250px] mt-3 h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
                    >
                      {loader ? (
                        <ScaleLoader
                          color="#fff"
                          height={22}
                          width={5}
                          radius={2}
                        />
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 bg-[#54595d] p-4 rounded-[5px] relative ">
                  <span className="p-[5px] bg-white rounded absolute right-2 top-2 cursor-pointer">
                    <FaPenNib color="black" />
                  </span>
                  <div className="flex gap-2 ">
                    <span className="font-bold">Shop Name:</span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-bold">Division name:</span>
                    <span>{userInfo.shopInfo?.division}</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-bold">District name:</span>
                    <span className="capitalize">
                      {userInfo.shopInfo?.district}
                    </span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-bold">Sub District:</span>
                    <span className="capitalize">
                      {userInfo.shopInfo?.subDistrict}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12">
          <div className="w-full  pl-0 md:pl-7 ">
            <div className="bg-[#3D464D] rounded-md p-6 text-white">
              <h2 className="font-semibold text-lg">Change password</h2>
              <form>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userInfo.email}
                    readOnly
                    placeholder="Email"
                    className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="password">Old Password</label>
                  <input
                    type="password"
                    value={userInfo.password}
                    readOnly
                    name="old-password"
                    id="old-password"
                    placeholder="Old Password"
                    className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="new-password">New Password</label>
                  <input
                    type="password"
                    name="new-password"
                    readOnly
                    id="new-password"
                    placeholder="New password"
                    className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                  />
                </div>

                <div className="flex">
                  <button className="bg-[#94A3B8] w-[250px] py-2 mt-3 rounded-[5px]">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
