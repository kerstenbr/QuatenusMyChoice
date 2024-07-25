import { Link } from "react-router-dom";

const PanelNavbar = () => {
  return (
    <div className="mb-3">
      <Link to={`/panel/users`}>
        <button type="button" className="btn btn-sm btn-qblue mb-1 mt-1 ms-1">
          Usuários
        </button>
      </Link>
      <button type="button" className="btn btn-sm btn-qblue mb-1 mt-1 ms-1" onClick={() => alert("Não está pronto")}>
        Bulk Uploud
      </button>
      <button type="button" className="btn btn-sm btn-qblue mb-1 mt-1 ms-1" onClick={() => alert("Não está pronto")}>
        Dashboard
      </button>
    </div>
  );
};

export default PanelNavbar;
