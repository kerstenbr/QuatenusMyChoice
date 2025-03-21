import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ user, children }) => {
if (!user || !Cookies.get("token")) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
