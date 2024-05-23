import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SeeMoreFamily = () => {
  const [family, setFamily] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`)
      .then((response) => {
        setFamily(response.data);
      })
      .catch((error) => {
        alert(`Oops, algo deu errado! 
        - ${error.response.data.message}`)
        console.error(error.response);
      });
  }, []);

  return (
    <div className="py-2 bg-light">
      <div className="container">

        <button className="btn btn-sm btn-qorange mb-2 float-end" onClick={() => self.close()}>Fechar</button>

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
                </tr>
              </thead>
              <tbody>
                {family.products ? (
                  Object.keys(family.products).map((productName) => {
                    const values = family.products[productName];
                    return (
                      <tr key={productName}>
                        <td>{productName}</td>
                        <td className="text-center">R$ {values[0]}</td>
                        <td className="text-center">R$ {values[1]}</td>
                        <td className="text-center">R$ {values[2]}</td>
                        <td className="text-center">R$ {values[3]}</td>
                        <td className="text-center">R$ {values[4]}</td>
                        <td className="text-center">R$ {values[5]}</td>
                        <td className="text-center">R$ {values[6]}</td>
                        <td className="text-center">R$ {values[7]}</td>
                        <td className="text-center">R$ {values[8]}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">Nenhum produto encontrado nessa família</td>
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
              <h4>Informações Adicional:</h4>
              <img style={{ width: '1296px' }} src={family.addInfoLink} alt="Informações Adicionais" />
              <hr />
            </>
          ) : (<></>)}
        </div>

        <div>
          {family.tecInfoLink ? (
            <>
              <h4>Informação Técnicas:</h4>
              <img style={{ width: '1296px' }} src={family.tecInfoLink} alt="Informações Técnicas" />
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