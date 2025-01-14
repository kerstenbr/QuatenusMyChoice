import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const DeleteBom = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bomName, setBomName] = useState("");

  useEffect(() => {
    const fetchBom = () => {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/bom/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          setBomName(response.data.qbmCode);
        })
        .catch((error) => {
          alert(`Oops, algo deu errado! 
        - ${error.response.data.message}`);
          console.error(error.response);
        });
    };
    fetchBom();
  }, [id]);

  const handleDeleteBom = () => {
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}/api/bom/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        navigate("/logistics-sector/bom");
      })
      .catch((error) => {
        alert(`Oops, algo deu errado! 
        - ${error.response.data.message}`);
        console.error(error.response);
      });
  };

  return (
    <div className="py-5 bg-light d-flex">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card p-4 shadow-sm">
              <div className="card-body">
                <h3 className="mb-3 fw-normal text-center">Deletar BOM</h3>
                <h5 className="mb-3 fw-normal text-center">Você quer mesmo excluir o BOM "{bomName}"? É impossível reverter essa ação.</h5>
                <div className="text-center">
                  <button className="btn btn-danger me-1" onClick={handleDeleteBom}>
                    Sim, excluir
                  </button>
                  <button className="btn btn-success" onClick={() => navigate("/logistics-sector/bom")}>
                    Cancelar
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

export default DeleteBom;
