import { Link } from "react-router-dom";

const ErrorDashboard = () => {
  return (
    <div className="w-full h-screen">
      <div className=" h-full flex flex-col justify-center items-center">
        <h2 className="text-[86px] font-bold">404</h2>
        <h3 className="text-3xl">Page Not Found</h3>
        <Link to="/seller/dashboard">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default ErrorDashboard;
