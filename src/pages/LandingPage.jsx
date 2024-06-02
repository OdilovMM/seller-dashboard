import { Link, useNavigate } from "react-router-dom";
import landing from "../assets/landing.jpg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const LandingPage = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/seller/dashboard");
    } else {
      return;
    }
  }, [userInfo, navigate]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row">
        <div className="w-6/12 h-full">
          <img
            src={landing}
            className="w-full h-screen object-center opacity-80"
            alt=""
          />
        </div>
        <div className="w-6/12 max-h-screen flex justify-center items-center bg-gray-200">
          <div className="w-[70%] mx-auto flex flex-col items-center justify-between gap-5 ">
            <h2 className="text-start text-xl font-semibold text-gray-500">
              Welcome to the Seller Dashboard! This centralized hub provides you
              with an overview of key metrics and activities to help you manage
              your operations efficiently.
            </h2>
            <ul className="flex justify-center items-center w-[350px] h-[50px]">
              <li className="w-6/12">
                <Link
                  to="/login"
                  className="w-full h-full px-12 py-2  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
                >
                  Login
                </Link>
              </li>
              <li className="w-6/12">
                <Link
                  to="/register"
                  className="w-full h-full px-8 py-2  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
