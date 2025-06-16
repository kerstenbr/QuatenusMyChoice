import { useForm } from "react-hook-form";
import { ViewContext } from "../../context/viewContext";
import { useContext, useEffect } from "react";
import Select from "react-select";

const FamilySearchbar = ({ searchTerm, setSearchTerm, tagOptions, selectedTags, setSelectedTags }) => {
  const view = useContext(ViewContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", searchTerm);
  }, [searchTerm, setValue]);

  const onSearch = (data) => {
    setSearchTerm(data.name || "");
  };

  return (
    <div className="input-group mb-3 mt-2" onChange={handleSubmit(onSearch)}>
      <input
        {...register("name")}
        aria-invalid={errors.name ? "true" : "false"}
        type="search"
        className="form-control"
        placeholder="Pesquise aqui"
        defaultValue={searchTerm}
      />
      <div className="ms-2" style={{ minWidth: 220 }}>
        <Select isMulti options={tagOptions} value={selectedTags} onChange={setSelectedTags} placeholder="Filtros" />
      </div>
      <button className="btn btn-sm btn-qorange" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </button>
      {/* <button type="submit" className="btn btn-sm btn-qorange">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button> */}
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
    </div>
  );
};

export default FamilySearchbar;
