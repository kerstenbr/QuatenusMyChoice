import { Navigate } from "react-router-dom";

const ManagerRoute = ({ user, children }) => {
  if (!user || (!user.manager && !user.admin)) {
    return <Navigate to="/not-found" />;
  }
  return children;
};

export default ManagerRoute;