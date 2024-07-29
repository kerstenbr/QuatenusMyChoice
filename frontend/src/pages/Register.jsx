import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onRegister = (data) => {
    const body = { ...data, email: data.email, password: data.password };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, body)
      .then((response) => {
        Cookies.set("token", response.data, { expires: 3, sameSite: "strict" });
        navigate("/");
        // TODO: Eu estou forçando um reload para que o navbar seja atualizado, por que atualmente o contexto não está funcionando direito. Trocar isso depois.
        window.location.reload();
      })
      .catch((error) => {
        alert(`Oops, algo deu errado!
        - ${error.response.data.message}`);
        console.error(error);
      });
  };

  return (
    <div className="py-5 bg-light d-flex">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card p-4 shadow-sm">
              <div className="card-body">
                <h1 className="h3 mb-3 fw-normal text-center">Registrar</h1>
                <form onSubmit={handleSubmit(onRegister)}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id="floatingEmail"
                      placeholder="E-mail"
                      {...register("email", { required: "O e-mail é obrigatório" })}
                    />
                    <label htmlFor="floatingEmail">E-mail</label>
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      id="floatingPassword"
                      placeholder="Senha"
                      {...register("password", { required: "A senha é obrigatória" })}
                    />
                    <label htmlFor="floatingPassword">Senha</label>
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  </div>
                  <div>
                    <Link to="/login">
                      <p>Já tem uma conta?</p>
                    </Link>
                  </div>
                  <button className="btn btn-lg btn-qorange w-100" type="submit">
                    Registrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
