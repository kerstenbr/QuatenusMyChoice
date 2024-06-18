import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const SeeMoreFamily = () => {
  const { user } = useContext(UserContext)
  const [family, setFamily] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`)
      .then((response) => {
        setFamily(response.data);
      })
      .catch((error) => {
        alert(`Oops, algo deu errado! 
        - ${error.response.data.message}`)
        console.error(error.response.data.message);
      });
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="py-2 bg-light">
      <div className="container">

        <button className="btn btn-sm btn-qorange mb-2 float-end" onClick={goBack}>Voltar</button>
        {user && user.admin === true ? (
          <>
            <Link to={`/family/edit/${family._id}`}>
              <button type="button" className="btn btn-sm btn-warning me-1 text-white float-end">Editar</button>
            </Link>
          </>
        ) : (<></>)}

        <div>
          <h3 className="mt-1">{family.name} - {family.qbmCode}</h3>
          <hr className="mt-0" />
        </div>

        <div>
          <h4>Visão geral da família:</h4>
          <p>{family.desc}</p>
        </div>

        {family.canvaLink ? (
          <>
            <img style={{ width: '1296px' }} src={family.canvaLink} alt="Canva" />
            <hr />
          </>
        ) : (<></>)}

        <div>
          <h4>Segmentos de produtos:</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Produto</th>
                  <th scope="col" className="text-center">Adesão</th>
                  <th colSpan="3" className="text-center">Com adesão</th>
                  <th colSpan="5" className="text-center">Sem adesão</th>
                  <th scope="col" className="text-center">Fecho</th>
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
                  Object.keys(family.products).map((productName) => {
                    const product = family.products[productName];
                    return (
                      <tr key={productName}>
                        <td title={product.desc}>{product.codigoQbm} - {productName}</td>
                        <td className="text-center">R$ {product.preco.comAdesao[0]}</td>
                        <td className="text-center">R$ {product.preco.comAdesao[1]}</td>
                        <td className="text-center">R$ {product.preco.comAdesao[2]}</td>
                        <td className="text-center">R$ {product.preco.comAdesao[3]}</td>
                        <td className="text-center">R$ {product.preco.semAdesao[0]}</td>
                        <td className="text-center">R$ {product.preco.semAdesao[1]}</td>
                        <td className="text-center">R$ {product.preco.semAdesao[2]}</td>
                        <td className="text-center">R$ {product.preco.semAdesao[3]}</td>
                        <td className="text-center">R$ {product.preco.semAdesao[4]}</td>
                        <td className="text-center">R$ {product.preco.fecho}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">Nenhum produto encontrado nessa família</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {family.products ? (<hr />) : (<></>)}

        <div>
          {family.addInfoLink ? (
            <>
              <h4>Informação adicional da família:</h4>
              <img style={{ width: '1296px' }} src={family.addInfoLink} alt="Informação adicional da família" />
            </>
          ) : (<></>)}
        </div>

        <div>
          <hr />
          <p className="m-0 p-0">{family._id} - Atualizado em: {new Date(family.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default SeeMoreFamily;