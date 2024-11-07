import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ user, roles, children }) => {
  if (!user || (!user.admin && !roles.includes(user.role))) {
    return <Navigate to="/not-found" />;
  }
  return children;
};

export default RoleBasedRoute;