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

  // Mapeamento de chaves em inglês para português
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
            {/* Itera sobre os campos específicos e cria um botão para cada um, caso esteja presente no documento */}
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
                  <button type="button" className="btn btn-sm btn-warning me-1 text-white">
                    Editar
                  </button>
                </Link>
              ) : (
                <></>
              )}
              {user && user.admin === true ? (
                <Link to={`/logistics-sector/bom/delete/${product._id}`}>
                  <button type="button" className="btn btn-sm btn-danger">
                    Excluir
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
