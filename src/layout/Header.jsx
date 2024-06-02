import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ showBar, setShowBar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40 bg-[#fff] shadow-xl">
      <div className="ml-0 lg:ml-[260px] rounded-sm h-[64px]  flex justify-end items-center  px-5 transition-all">
        <div
          onClick={() => setShowBar(!showBar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm  shadow-sm hover:shadow-indigo-500/50 justify-center items-center cursor-pointer transition-all duration-400"
        >
          <span>
            <FaBars size={26} />
          </span>
        </div>
       

        {/* notifications */}

        <div className="flex justify-center items-center gap-8 relative">
          <div className="hidden md:block relative ">
            
          </div>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-4">
              <div className="flex justify-center items-center flex-col text-end">
                <h1 className="text-md font-bold">{userInfo?.name}</h1>
                <span className="text-[14px] uppercase w-full font-normal">
                  {userInfo?.role}
                </span>
              </div>
              <div>
                {userInfo && userInfo ? (
                  <Link to="/seller/dashboard/profile">
                    <img
                      src={userInfo.image}
                      alt=""
                      className="w-[45px] h-[45px] cursor-pointer rounded-full overflow-hidden object-cover"
                    />
                  </Link>
                ) : (
                  <Link to="/seller/dashboard/profile">
                    <img
                      src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                      alt=""
                      className="w-[45px] h-[45px] cursor-pointer rounded-full overflow-hidden object-cover"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
