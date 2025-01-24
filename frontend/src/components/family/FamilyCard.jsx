import { Link } from "react-router-dom";
import { useContext } from "react";
import LimitedParagraph from "../LimitedParagraph";
import { UserContext } from "../../context/userContext";
// TODO: Adicionar páginação

const FamilyCard = ({ family }) => {
  const { user } = useContext(UserContext);

  return (
    // TODO: Melhorar a responsividade do card em si, principalmente em telas menores aonde só aparece dois cards um do lado do outro
    <div className="col" style={{ minWidth: "300px" }}>
      <div className="card shadow-sm" style={{ height: "450px" }}>
        <img className="card-img-top" width="100%" height="225" src={family.bannerLink} />
        <div className="card-body pb-0">
          <h3>{family.name}</h3>
          {/* TODO: Mudar essa parte de baixo depois. Estou checando se o nome da família tem mais de 29 caracteres, se sim, eu limito
          a descrição a 100 caracteres, se não, eu deixo nos 155 caracteres */}
          <LimitedParagraph text={family.desc} limit={family.name.length > 29 ? 140 : 190} />
        </div>

        <div className="ms-3 mb-3 me-3">
          <Link to={`/family/seemore/${family._id}`}>
            <button type="button" className="btn btn-sm btn-qblue me-1">
              Ver mais
            </button>
          </Link>
          {user && user.admin === true ? (
            <>
              <Link to={`/family/edit/${family._id}`}>
                <button type="button" className="btn btn-sm btn-warning me-1 text-white">
                  Editar
                </button>
              </Link>
              <Link to={`/family/delete/${family._id}`}>
                <button type="button" className="btn btn-sm btn-danger">
                  Excluir
                </button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyCard;
