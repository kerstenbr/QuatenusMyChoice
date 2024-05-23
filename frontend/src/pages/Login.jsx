import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onLogin = (data) => {
    // console.log(data)
    // const body = { ...data, email: data.email, password: data.password }
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, data)
      .then((response) => {
        // console.log(response.data.token)
        Cookies.set("token", response.data, { expires: 3 })
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onLogin)}>
          <input type="email" placeholder="E-mail" name="email" {...register("email", { required: true })} />
          <input type="password" placeholder="Senha" name="password" {...register("password", { required: true })} />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login