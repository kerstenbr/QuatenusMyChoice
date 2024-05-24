import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import Cookies from "js-cookie"

// TODO: Estilizar essa página
// TODO: Trocar essa página por um modal

const DeleteFamily = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDeleteFamily = () => {
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      .then((response) => {
        alert(response.data.message)
        navigate('/')
      })
      .catch((error) => {
        alert(`Oops, algo deu errado! 
        - ${error.response.data.message}`)
        console.error(error.response);
      })
  }
  return (
    <div className="py-2 bg-light">
      <div className="container">
        <h1>Deletar familia</h1>
        <h2>Você quer mesmo excluir essa familia? É impossível reverter essa ação.</h2>
        <button onClick={handleDeleteFamily}>Sim, excluir</button>
        <button onClick={() => navigate('/')}>Cancelar</button>
      </div>
    </div>
  )
}

export default DeleteFamily