import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { role, token } = useSelector((state) => state.auth);

  if (!token && !role === "seller") {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
