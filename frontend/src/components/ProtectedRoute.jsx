import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const token = userDetails?.token;

  return token ? children : <Navigate to="/auth/sign-in" />;
};

export default ProtectedRoute;