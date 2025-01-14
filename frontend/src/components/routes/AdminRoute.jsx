import { Navigate } from "react-router-dom";

const AdminRoute = ({ user, children }) => {
  if (!user || !user.admin) {
    return <Navigate to="/not-found" />;
  }
  return children;
};

export default AdminRoute;
