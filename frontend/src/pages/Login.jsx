const Login = () => {
  return (
    <div className="py-2 bg-light">
      <div className="container">
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="E-mail" name="email" />
          <input type="password" placeholder="Senha" name="password" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login