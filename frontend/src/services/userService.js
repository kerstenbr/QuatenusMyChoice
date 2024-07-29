import axios from "axios";
import Cookies from "js-cookie";

export function userLogged() {
  const response = axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/findUser`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
