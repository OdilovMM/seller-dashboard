import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { userToken, token } = useSelector((state) => state.auth);

  if (!userToken && !token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
