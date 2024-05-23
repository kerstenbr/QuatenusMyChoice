import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onRegister = (data) => {
    // console.log(data)
    const body = { ...data, email: data.email, password: data.password }
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, body)
      .then((response) => {
        // console.log(response.data.token)
        Cookies.set("token", response.data, {expires: 3})
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit(onRegister)}>
          <input type="email" placeholder="E-mail" name="email" {...register("email", { required: true })} />
          <input type="password" placeholder="Senha" name="password" {...register("password", { required: true })} />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register