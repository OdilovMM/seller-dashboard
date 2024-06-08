import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { seller_login } from "../features/authSlice/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const { loader, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [credentials, setCredentials] = useState({
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
    dispatch(seller_login(credentials));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/seller/dashboard");
    } else {
      return;
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-w-screen min-h-screen bg-[#F7F8FC] flex items-center justify-center">
      <div className="w-[350px] text-[#333] bg-[#FEFEFE] shadow-2xl px-8 py-14 rounded-md">
        <h2 className="text-[26px] mb-3 font-bold">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmitData}>
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
                value={credentials.password}
                onChange={handleInput}
                required
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

          <div>
            <button
              type="submit"
              disabled={loader ? true : false}
              className="w-full h-[40px] px-8 py-3  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
            >
              {loader ? (
                <ScaleLoader color="#fff" height={14} width={2} radius={1} />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="flex gap-4">
            <h4>Do not have an account?</h4>
            <Link to="/register" className="text-blue-600 pl-2">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
