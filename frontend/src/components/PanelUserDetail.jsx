import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const PanelUserDetail = ({ user }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [manager, setManager] = useState(false);

  useEffect(() => {
    setEmail(user.email);
    setRole(user.role);
    setAdmin(user.admin);
    setManager(user.manager);
  }, [user]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/role/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        alert(`Oops, algo deu errado!
        - ${error.response.data.message}`);
        console.error(error);
      });
  }, []);

  const handleUpdateUser = () => {
    try {
      const data = {
        email,
        role,
        admin,
        manager,
      };

      axios.put(`${import.meta.env.VITE_BASE_URL}/api/user/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      alert("Usuário atualizado com sucesso!");
      window.location.reload();
      // TODO: Eu estou forçando um reload para que os usuários sejam atualizados, trocar isso depois.
    } catch (error) {
      alert(`Oops, algo deu errado! - ${error.response.data.message}`);
      console.error(error.response.data.message);
    }
  };

  const handleDeleteUser = () => {
    if (confirm(`Você realmente deseja excluir\n${user.email}?`) == true) {
      axios
        .delete(`${import.meta.env.VITE_BASE_URL}/api/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          alert("Usuário excluido com sucesso!");
          window.location.reload();
        })
        .catch((error) => {
          alert(`Oops, algo deu errado! 
        - ${error.response.data.message}`);
          console.error(error.response);
        });
    } else {
      alert("Exclusão do usuário cancelada.");
    }
  };

  return (
    <div>
      <h1 className="mt-2">Detalhes do Usuário</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Setor
        </label>
        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
          {roles &&
            [...roles].map((role) => (
              <option value={role.name} key={role.name}>
                {role.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="admin" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
        <label className="form-check-label" htmlFor="admin">
          Admin
        </label>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="manager" checked={manager} onChange={(e) => setManager(e.target.checked)} />
        <label className="form-check-label" htmlFor="manager">
          Manager
        </label>
      </div>
      <button className="btn btn-sm btn-danger mb-2" onClick={handleDeleteUser}>
        Excluir Usuário
      </button>
      <button className="btn btn-sm btn-qorange float-end mb-2" onClick={handleUpdateUser}>
        Atualizar Usuário
      </button>
    </div>
  );
};

export default PanelUserDetail;
