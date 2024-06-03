import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { seller_register } from "../features/authSlice/authSlice";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, role, token } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    console.log(credentials);
    dispatch(seller_register(credentials));
  };

  useEffect(() => {
    if (role === "seller" && token) {
      navigate("/seller/dashboard");
    } else {
      return;
    }
  }, [role, navigate, dispatch, token]);

  return (
    <div className="min-w-screen min-h-screen bg-[#F7F8FC] flex items-center justify-center">
      <div className="w-[350px] text-[#fffFFF] bg-[#FEFEFE] shadow-2xl  px-8 py-14 rounded-md">
        <h2 className="text-[26px] mb-3 font-bold text-black">Register</h2>

        <form className="space-y-6" onSubmit={handleSubmitData}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold font-mono uppercase text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={credentials.name}
                onChange={handleInput}
                required
                className="appearance-none block w-full px-3 text-black  py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold font-mono uppercase text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={credentials.email}
                onChange={handleInput}
                required
                className="appearance-none block text-black w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold font-mono uppercase text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={handleInput}
                className="appearance-none block w-full text-black  px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={18}
                  color="red"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute  right-2 top-2 cursor-pointer"
                  size={18}
                  color="blue"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div className="flex items-center w-full gap-3 mb-3">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className="w-4 h-4 text-blue-600 overflow-hidden "
            />
            <label htmlFor="checkbox" className="text-black">
              I agree privacy policy and terms
            </label>
          </div>

          <div>
            <button
              type="submit"
              // disabled={loader ? true : false}
              className="w-full h-[40px] px-8 py-3  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
            >
              {loader ? (
                <ScaleLoader color="#fff" height={14} width={5} radius={2} />
              ) : (
                "Register"
              )}
            </button>
          </div>
          <div className="flex gap-4 text-black">
            <h4>Already have an account?</h4>
            <Link to="/" className="text-blue-600 pl-2">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
