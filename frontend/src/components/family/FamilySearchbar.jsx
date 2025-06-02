import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ViewContext } from "../../context/viewContext";
import { useContext } from "react";

const FamilySearchbar = () => {
  const view = useContext(ViewContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSearch = (data) => {
    const { name } = data;
    navigate(`/family/search/${name}`);
    reset();
  };
  return (
    <form className="input-group mb-3 mt-2" onSubmit={handleSubmit(onSearch)}>
      <input
        {...register("name", { required: true })}
        aria-invalid={errors.name ? "true" : "false"}
        type="search"
        className="form-control"
        placeholder="Pesquise aqui"
      />
      {errors.name?.type === "required"}
      <button type="submit" className="btn btn-sm btn-qorange">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
      <button className="btn btn-sm btn-qorange dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <ul className="dropdown-menu p-2">
        <li>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="viewSwitch"
              checked={view.view === "list"}
              onChange={(e) => view.setView(e.target.checked ? "list" : "card")}
            />
            <label className="form-check-label" htmlFor="viewSwitch">
              Ver em lista
            </label>
          </div>
        </li>
      </ul>
    </form>
  );
};

export default FamilySearchbar;
