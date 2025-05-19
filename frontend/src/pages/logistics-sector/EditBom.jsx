import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Cookies from "js-cookie";
import { UserContext } from "../../context/userContext.jsx";

const EditBom = () => {
  const [qbmCode, setQbmCode] = useState("");
  const [boms, setBoms] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/bom/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        const { qbmCode, ...bomsData } = response.data;
        setQbmCode(qbmCode);
        const bomsArray = Object.keys(bomsData)
          .map((key) => ({
            type: key,
            observation: bomsData[key].observation || "",
            starsoftCode: bomsData[key].starsoftCode || [],
            itens: bomsData[key].itens || [],
            unit: bomsData[key].unit || [],
            quantity: bomsData[key].quantity || [],
          }))
          .filter((bom) => bom.starsoftCode.length > 0);
        setBoms(bomsArray);
      })
      .catch((error) => {
        navigate("*");
        console.error(error.response.data.message);
      });
  }, [id, navigate]);

  const handleEditBom = () => {
    const bomsObject = boms.reduce((acc, bom) => {
      acc[bom.type] = {
        observation: bom.observation,
        starsoftCode: bom.starsoftCode,
        itens: bom.itens,
        unit: bom.unit,
        quantity: bom.quantity,
      };
      return acc;
    }, {});

    const data = {
      qbmCode,
      ...bomsObject,
    };

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/bom/${id}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then(() => {
        navigate("/logistics-sector/bom");
      })
      .catch((error) => {
        alert(`Oops, algo deu errado! - ${error.response.data.message}`);
        console.error(error.response.data.message);
      });
  };

  const handleAddBom = () => {
    setBoms([
      ...boms,
      {
        type: "",
        observation: "",
        starsoftCode: [""],
        itens: [""],
        unit: [""],
        quantity: [""],
      },
    ]);
  };

  const handleDeleteBom = (index) => {
    const newBoms = [...boms];
    newBoms.splice(index, 1);
    setBoms(newBoms);
  };

  const handleBomChange = (index, key, value) => {
    const newBoms = [...boms];
    newBoms[index][key] = value;
    setBoms(newBoms);
  };

  const handleBomArrayChange = (bomIndex, key, arrayIndex, value) => {
    const newBoms = [...boms];
    newBoms[bomIndex][key][arrayIndex] = value;
    setBoms(newBoms);
  };

  const handleAddArrayItem = (bomIndex) => {
    const newBoms = [...boms];
    newBoms[bomIndex].starsoftCode.push("");
    newBoms[bomIndex].itens.push("");
    newBoms[bomIndex].unit.push("");
    newBoms[bomIndex].quantity.push("");
    setBoms(newBoms);
  };

  const handleDeleteArrayItem = (bomIndex, arrayIndex) => {
    const newBoms = [...boms];
    newBoms[bomIndex].starsoftCode.splice(arrayIndex, 1);
    newBoms[bomIndex].itens.splice(arrayIndex, 1);
    newBoms[bomIndex].unit.splice(arrayIndex, 1);
    newBoms[bomIndex].quantity.splice(arrayIndex, 1);
    setBoms(newBoms);
  };

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <div className="sticky-top" style={{ top: "80px", zIndex: "1" }}>
          <BackButton />
        </div>

        <h1 className="mt-3 mb-4">Editar BOM</h1>
        <div className="row">
          <div className="col-6 mb-2">
            <label>Código do QBM</label>
            <input type="text" className="form-control form-control-sm" value={qbmCode} onChange={(e) => setQbmCode(e.target.value)} />
          </div>
        </div>
        <div>
          <label>BOM</label>
          {boms.map((bom, bomIndex) => (
            <div key={bomIndex} className="row mb-3 border p-3">
              <div className="col-6 mb-2">
                <label>Tipo de Veículo</label>
                <select className="form-control form-control-sm" value={bom.type} onChange={(e) => handleBomChange(bomIndex, "type", e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="car">Carro</option>
                  <option value="motorcycle">Moto</option>
                  <option value="vessel">Embarcação</option>
                  <option value="truck">Caminhão</option>
                  <option value="machine">Máquina</option>
                </select>
              </div>
              <div className="col-12 mb-2">
                <label>Observação</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={bom.observation}
                  onChange={(e) => handleBomChange(bomIndex, "observation", e.target.value)}
                />
              </div>
              <div className="col-12 mb-2">
                <label>Tabela de Veículo</label>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Código Starsoft</th>
                      <th>Item</th>
                      <th>Unidade</th>
                      <th>Quantidade</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bom.starsoftCode.map((code, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={code}
                            onChange={(e) => handleBomArrayChange(bomIndex, "starsoftCode", index, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={bom.itens[index]}
                            onChange={(e) => handleBomArrayChange(bomIndex, "itens", index, e.target.value)}
                          />
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={bom.unit[index]}
                            onChange={(e) => handleBomArrayChange(bomIndex, "unit", index, e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="un">un</option>
                            <option value="kit">kit</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                            <option value="sv">sv</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={bom.quantity[index]}
                            onChange={(e) => handleBomArrayChange(bomIndex, "quantity", index, e.target.value)}
                          />
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteArrayItem(bomIndex, index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn btn-sm btn-primary mb-2" onClick={() => handleAddArrayItem(bomIndex)}>
                  Adicionar Item
                </button>
              </div>
              <div>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBom(bomIndex)}>
                  Excluir BOM
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          {user && user.admin === true ? (
            <button className="btn btn-sm btn-primary" onClick={handleAddBom}>
              Adicionar Bom
            </button>
          ) : (
            <> </>
          )}
          <button className="btn btn-sm btn-success" onClick={handleEditBom}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBom;
