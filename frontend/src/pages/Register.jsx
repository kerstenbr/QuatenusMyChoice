const Register = () => {
  return (
    <div className="py-2 bg-light">
      <div className="container">
        <h1>Register</h1>
        <form>
          <input type="email" placeholder="E-mail" name="email" />
          <input type="password" placeholder="Senha" name="password" />
          <input type="password" placeholder="Confirmar senha" name="password" />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register