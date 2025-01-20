import { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import NotActiveAccountAlert from "../NotActiveAccountAlert.jsx";

const ActiveAccountRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role === "undefined") {
    return <NotActiveAccountAlert />;
  }

  return children;
};

export default ActiveAccountRoute;