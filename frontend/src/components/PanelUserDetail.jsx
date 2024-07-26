import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const PanelUserDetail = ({ user }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  const handleUpdateUser = () => {
    try {
      const data = {
        email,
        role,
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
          Role
        </label>
        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">00 - admin</option>
          <option value="direção">01 - direção</option>
          <option value="projetos">02 - projetos</option>
          <option value="vendas">03 - vendas</option>
          <option value="recursos humanos">04 - recursos humanos</option>
          <option value="compras">05 - compras</option>
          <option value="suporte a operações">06 - suporte a operações</option>
          <option value="logistica">07 - logística</option>
          <option value="ti" disabled>
            08 - ti
          </option>
          <option value="qualidade">09 - qualidade</option>
          <option value="marketing" disabled>
            10 - marketing
          </option>
          <option value="customer success">11 - customer success</option>
          <option value="financeiro">12 - financeiro</option>
          <option value="undefined">undefined</option>
        </select>
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
