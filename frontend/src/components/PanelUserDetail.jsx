import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const PanelUserDetail = ({ user }) => {
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    setEmail(user.email);
    setAdmin(user.admin);
  }, [user]);

  const handleUpdateUser = () => {
    try {
      const data = {
        email,
        admin,
      };

      axios.put(`${import.meta.env.VITE_BASE_URL}/api/user/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      alert("Usuário atualizado com sucesso!");
      // TODO: Eu estou forçando um reload para que os usuários sejam atualizados, trocar isso depois.
      window.location.reload();
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
      alert("vapo cancelado.")
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
        <label htmlFor="admin" className="form-label">
          Admin
        </label>
        <select className="form-select" value={admin} onChange={(e) => setAdmin(e.target.value)}>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </select>
      </div>
      <button className="btn btn-sm btn-qorange mb-2" onClick={handleUpdateUser}>
        Atualizar Usuário
      </button>
      <button className="btn btn-sm btn-danger float-end mb-2" onClick={handleDeleteUser}>
        Excluir Usuário
      </button>
    </div>
  );
};

export default PanelUserDetail;
