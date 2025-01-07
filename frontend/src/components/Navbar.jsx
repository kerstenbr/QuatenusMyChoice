import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { userLogged } from "../services/userService";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const signout = () => {
    Cookies.remove("token", { sameSite: "strict" });
    setUser(undefined);
    navigate("/login");
  };

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
  }, []);

  return (
    <header>
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="navbar-brand p-0" to="/">
          <img className="logo" src={Logo} />
        </Link>
        <div className="d-flex align-items-center">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-qblue dropdown-toggle me-1"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Menu
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {user && user.admin === true ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/panel">
                      Painel
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/family/create">
                      Criar Família
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logistics-sector/bom/create">
                      Criar B.O.M
                    </Link>
                  </li>
                  <hr className="m-0 p-0" />
                </>
              ) : null}
              {user && (user.role === "logística" || user.role === "técnica" || user.admin === true) ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/logistics-sector/bom">
                      Estoque
                    </Link>
                  </li>
                </>
              ) : null}
            
              {/* TODO: Desativei por agora por que eu estava me confundindo, quando eu for trabalhar na parte de pagamento
              dos técnicos eu reativo e continuo  */}
              {/* {user && (user.role === "técnica" || user.admin === true) ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/tecnical-sector">
                      Área Técnica
                    </Link>
                  </li>
                </>
              ) : null} */}
              {user ? (
                <li>
                  <button className="dropdown-item" onClick={signout}>
                    Sair
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Entrar
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      Registrar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
