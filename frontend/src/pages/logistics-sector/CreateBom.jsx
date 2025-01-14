import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import Cookies from "js-cookie";

const CreateBom = () => {
  const [qbmCode, setQbmCode] = useState("");
  const [boms, setBoms] = useState([]);
  const navigate = useNavigate();

  const handleCreateBom = () => {
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
      .post(`${import.meta.env.VITE_BASE_URL}/api/bom/`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then(() => {
        navigate("/logistics-sector/bom");
      })
      .catch((error) => {
        alert(`Oops, algo deu errado! - ${error.response.data.message}`);
        console.error(error.response.data);
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
        <BackButton />
        <h1 className="mt-3 mb-4">Criar BOM</h1>
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
                <select className="form-select form-select-sm" value={bom.type} onChange={(e) => handleBomChange(bomIndex, "type", e.target.value)}>
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
                      <th>Ações</th>
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
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteArrayItem(bomIndex, index)}>
                            Excluir
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
          <button className="btn btn-sm btn-primary" onClick={handleAddBom}>
            Adicionar Bom
          </button>
          <button className="btn btn-sm btn-success" onClick={handleCreateBom}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBom;
