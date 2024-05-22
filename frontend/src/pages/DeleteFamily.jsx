import { useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"

const DeleteFamily = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDeleteFamily = () => {
    axios
      .delete(`http://localhost:5555/api/families/${id}`)
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