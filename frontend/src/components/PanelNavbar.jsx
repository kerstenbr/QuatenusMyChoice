import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const PanelNavbar = () => {
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBulkDownload = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/download`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "mychoice.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Erro ao baixar o arquivo", error);
        alert("Erro ao baixar o arquivo");
      });
  };

  const handleBulkUpload = () => {
    setShowModal(true);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Nenhum arquivo selecionado");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/families/upload`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Erro ao fazer upload do arquivo:", error);
        alert(`Oops, algo deu errado! - ${error.response.data.message}`);
      });
  };

  return (
    <div className="mb-3">
      <Link to={`/panel/users`}>
        <button type="button" className="btn btn-sm btn-qblue mb-1 mt-1 ms-1">
          Usuários
        </button>
      </Link>
      <button type="button" className="btn btn-sm btn-qblue mb-1 mt-1 ms-1" onClick={() => alert("Não está pronto")}>
        Dashboard
      </button>
      <button type="button" className="btn btn-sm btn-qblue mb-1 mt-1 ms-1" onClick={handleBulkUpload}>
        Uploud em Lote
      </button>
      <button type="button" className="btn btn-sm btn-qblue mb-1 mt-1 ms-1" onClick={handleBulkDownload}>
        Download em Lote
      </button>

      {/* Modal */}
      <div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload de Arquivo</h5>
            </div>
            <div className="modal-body">
              <input
                type="file"
                accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                className="form-control-file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}>
                Fechar
              </button>
              <button type="button" className="btn btn-sm btn-qorange" onClick={handleFileUpload}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelNavbar;