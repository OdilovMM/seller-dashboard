import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth);

  if (!userToken) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
