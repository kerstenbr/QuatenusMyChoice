import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import Cookies from "js-cookie";

const SeeMoreFamily = () => {
  const { user } = useContext(UserContext);
  const [family, setFamily] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setFamily(response.data);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        navigate("*");
        console.error(error.response.data.message);
      });
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  const hasTelemetry = family.products ? Object.keys(family.products).some((productName) => family.products[productName].telemetry) : false;

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <button className="btn btn-sm btn-qorange mb-2 float-end" onClick={goBack}>
          Voltar
        </button>
        {user && user.admin === true ? (
          <>
            <Link to={`/family/edit/${family._id}`}>
              <button type="button" className="btn btn-sm btn-warning me-1 text-white float-end">
                Editar
              </button>
            </Link>
          </>
        ) : null}

        <div>
          <h3 className="mt-1">
            {family.name} - {family.qbmCode}
          </h3>
          <hr className="mt-0" />
        </div>

        <div>
          <h4>Visão geral da família:</h4>
          {family.desc ? (
            <div className="mb-2">
              {family.desc.split("\n").map((text, index) => (
                <p className="m-0" key={index}>
                  {text}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        {family.links && Object.keys(family.links).length > 0 && (
          <div>
            <h6>Links úteis:</h6>
            <ul>
              {Object.entries(family.links).map(([key, url]) => (
                <li key={key}>
                  <Link to={url} target="_blank" rel="noopener noreferrer">
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {family.observations ? (
          <div className="alert alert-warning p-2" role="alert">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="m-0 p-0 bi bi-exclamation-circle float-end"
              viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg> */}
            <p className="p-0 m-0 fw-bold">Atenção:</p>
            <div>
              {family.observations.split("\n").map((text, index) => (
                <p className="m-0" key={index}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        <hr />

        {family.canvaLink ? (
          <>
            <img style={{ width: "100%" }} src={family.canvaLink} alt="Canva Value Proposition" />
            <hr />
          </>
        ) : null}

        <div>
          {hasTelemetry && (
            <div>
              <div className="row">
                <h4>Telemetria</h4>
                <div className="col-6">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Acessório Digital</th>
                          <th>Nº de Entradas Usadas</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>SENSOR RPM</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>SENSOR EMB</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>SENSOR FREIO</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>SENSOR PORTA</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>SENSOR BAÚ</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-6">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Acessório Analógico</th>
                          <th>Nº de Entradas Usadas</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>SENSOR MOTOR</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Produto</th>
                        <th colSpan="2" className="text-center">
                          Entradas Livres
                        </th>
                      </tr>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col" className="text-center">
                          Digital
                        </th>
                        <th scope="col" className="text-center">
                          Analógica
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {family.products.map((product) => {
                        if (product.telemetry) {
                          return (
                            <tr key={product.name}>
                              <td>
                                <p className="m-0 p-0" style={{ fontSize: "12px" }}>
                                  {product.qbmCode}
                                </p>
                                <p className="m-0 p-0">{product.name}</p>
                              </td>
                              <td className="text-center">{product.telemetry.digital}</td>
                              <td className="text-center">{product.telemetry.analog}</td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />
            </div>
          )}
        </div>

        <div>
          <h4>Segmentos de produtos:</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Produto</th>
                  <th scope="col" className="text-center">
                    Adesão
                  </th>
                  <th colSpan="3" className="text-center">
                    Com adesão
                  </th>
                  <th colSpan="5" className="text-center">
                    Sem adesão
                  </th>
                  <th scope="col" className="text-center">
                    Fecho
                  </th>
                </tr>
                <tr>
                  <th colSpan="2"></th>
                  <th className="text-center">12 meses</th>
                  <th className="text-center">24 meses</th>
                  <th className="text-center">36 meses</th>
                  <th className="text-center">12 meses</th>
                  <th className="text-center">24 meses</th>
                  <th className="text-center">36 meses</th>
                  <th className="text-center">48 meses</th>
                  <th className="text-center">60 meses</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {family.products ? (
                  family.products.map((product) => {
                    return (
                      <tr key={product.name} title={product.desc}>
                        <td>
                          <p className="m-0 p-0" style={{ fontSize: "12px" }}>
                            {product.qbmCode}
                          </p>
                          <p className="m-0 p-0">{product.name}</p>
                        </td>
                        {product.price.withMembership[0] ? (
                          <td className="text-center text-truncate">{product.price.withMembership[0]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}
                        {product.price.withMembership[1] ? (
                          <td className="text-center text-truncate">{product.price.withMembership[1]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}
                        {product.price.withMembership[2] ? (
                          <td className="text-center text-truncate">{product.price.withMembership[2]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}
                        {product.price.withMembership[3] ? (
                          <td className="text-center text-truncate">{product.price.withMembership[3]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}

                        {product.price.noMembership[0] ? (
                          <td className="text-center text-truncate">{product.price.noMembership[0]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}
                        {product.price.noMembership[1] ? (
                          <td className="text-center text-truncate">{product.price.noMembership[1]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}
                        {product.price.noMembership[2] ? (
                          <td className="text-center text-truncate">{product.price.noMembership[2]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}
                        {product.price.noMembership[3] ? (
                          <td className="text-center text-truncate">{product.price.noMembership[3]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}
                        {product.price.noMembership[4] ? (
                          <td className="text-center text-truncate">{product.price.noMembership[4]}</td>
                        ) : (
                          <td className="text-center">N/A</td>
                        )}
                        {product.price.closure ? <td className="text-center text-truncate">{product.price.closure}</td> : <td className="text-center">N/A</td>}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center bg-danger text-white">
                      Erro
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <hr />

        <div>
          {family.addInfoLink ? (
            <>
              <h4>Informação adicional da família:</h4>
              <img style={{ width: "100%" }} src={family.addInfoLink} alt="Informação adicional da família" />
            </>
          ) : null}
        </div>

        {user.role === "suporte a operações" || user.admin === true ? (
          <div className="mt-2">
            <Link to={`${import.meta.env.VITE_GA_LINK}`} target="_blank" rel="noopener noreferrer">
              Guias de Instalação
            </Link>
          </div>
        ) : null}

        <div>
          <hr />
          <p className="m-0 p-0">
            {family._id} - Atualizado em: {new Date(family.updatedAt).toLocaleString()}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeeMoreFamily;
