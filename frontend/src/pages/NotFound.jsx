import { useNavigate } from "react-router-dom";
import NotFoundImage from "../assets/NotFoundImage.png";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="py-2 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 mt-3 mb-3">
            <div className="card p-4 shadow-sm">
              <div className="card-body">
                <h1 className="mb-3 fw-normal text-center">404</h1>
                <h5 className="mb-3 fw-normal text-center">
                  {" "}
                  Desculpe, algo deu errado e a página que você estava procurando não pode ser encontrada.
                </h5>
                <div className="text-center mb-3">
                  <img className="img-fluid" src={NotFoundImage} alt="Imagem de erro 404" />
                </div>
                <div className="text-center">
                  <button className="btn btn-qorange" onClick={goHome}>
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
