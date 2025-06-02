import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const List = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBom, setSelectedBom] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const { user } = useContext(UserContext);

  const handleShowModal = (bom, key) => {
    setSelectedBom(bom);
    setSelectedType(key);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBom(null);
    setSelectedType("");
  };

  const keyTranslations = {
    car: "Carro",
    motorcycle: "Moto",
    vessel: "Embarcação",
    truck: "Caminhão",
    machine: "Máquina",
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{product.qbmCode}</h5>
          <div>
            {["car", "motorcycle", "vessel", "truck", "machine"].map((key) => {
              if (product[key] && product[key].itens.length > 0) {
                return (
                  <button key={key} className="btn btn-sm btn-qblue me-2" onClick={() => handleShowModal(product[key], key)}>
                    {keyTranslations[key]}
                  </button>
                );
              }
              return null;
            })}
            <div className="float-end">
              {user && ((user.manager === true && user.role === "técnica") || user.admin === true) ? (
                <Link to={`/logistics-sector/bom/edit/${product._id}`}>
                  <button type="button" className="btn btn-sm btn-warning text-white me-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </button>
                </Link>
              ) : (
                <></>
              )}
              {user && user.admin === true ? (
                <Link to={`/logistics-sector/bom/delete/${product._id}`}>
                  <button type="button" className="btn btn-sm btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {product.qbmCode} - {keyTranslations[selectedType]}
                </h5>
              </div>
              <div className="modal-body">
                {selectedBom && (
                  <div>
                    {selectedBom.observation && (
                      <div className="alert alert-warning">
                        <label>
                          <strong>Observação:</strong>
                        </label>
                        <p className="mb-0">{selectedBom.observation}</p>
                      </div>
                    )}
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Código Starsoft</th>
                          <th>Itens</th>
                          <th>Unidade</th>
                          <th>Quantidade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBom.starsoftCode.map((code, index) => (
                          <tr key={index}>
                            <td>{code}</td>
                            <td>{selectedBom.itens[index]}</td>
                            <td>{selectedBom.unit[index]}</td>
                            <td>{selectedBom.quantity[index]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
