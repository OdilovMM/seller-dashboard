import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full h-screen">
      <div className=" h-full flex flex-col justify-center items-center">
        <h2 className="text-[86px] font-bold">404</h2>
        <h3 className="text-3xl">Page Not Found</h3>
        <Link to="/">Go to Back</Link>
      </div>
    </div>
  );
};

export default LandingPage;
