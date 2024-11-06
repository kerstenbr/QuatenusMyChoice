import { Link } from "react-router-dom";
// import Novo from "../../../src/assets/novo.png";
import LimitedParagraph from "../LimitedParagraph";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
// TODO: Adicionar páginação

const Card = ({ family }) => {
  const { user } = useContext(UserContext);
  //TODO: Ativar novamente o aviso de familia nova caso eu arrume o bug do excel ignorar o createdAt que eu coloco
  // const [createdWeeks, setCreatedWeeks] = useState(false);

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const creationDate = new Date(family.createdAt);
  //   const twoWeeksInMilliseconds = 14 * 24 * 60 * 60 * 1000;

  //   if (currentDate - creationDate <= twoWeeksInMilliseconds) {
  //     setCreatedWeeks(true);
  //   } else {
  //     setCreatedWeeks(false);
  //   }
  // }, [family.name]);

  return (
    // TODO: Melhorar a responsividade do card em si, principalmente em telas menores aonde só aparece dois cards um do lado do outro
    <div className="col" style={{ minWidth: "300px" }}>
      <div className="card shadow-sm" style={{ height: "450px" }}>
        <img className="card-img-top" width="100%" height="225" src={family.bannerLink} />
        {/* {createdWeeks ? <img className="position-absolute top-0 end-0" src={Novo} /> : null} */}
        <div className="card-body pb-0">
          <h3>{family.name}</h3>
          <LimitedParagraph text={family.desc} limit={155} />
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

export default Card;
