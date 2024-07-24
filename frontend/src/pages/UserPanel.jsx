import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PanelNavbar from "../components/PanelNavbar";
import BackButton from "../components/BackButton";
import PanelUserDetail from "../components/PanelUserDetail";

const UserPanel = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Estado para armazenar o usuário selecionado

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/user/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        alert(`Oops, algo deu errado!
        - ${error.response.data.message}`);
        console.error(error);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <BackButton />
        <h1 className="mt-3 mb-4">Painel :: Usuários</h1>
        <PanelNavbar />
        <div className="row">
          <div className="col-3 list-group">
            {users &&
              [...users]
                .sort((a, b) => a.email.localeCompare(b.email))
                .map((user) => (
                  <button
                    onClick={() => handleUserClick(user)}
                    key={user.email}
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    {user.email}
                  </button>
                ))}
          </div>
          <div className="col-9 border">
            {selectedUser ? <PanelUserDetail user={selectedUser} /> : <h1 className="mt-2">Selecione um usuário</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
