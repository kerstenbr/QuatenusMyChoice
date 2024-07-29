import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSearch = (data) => {
    const { name } = data;
    navigate(`/search/${name}`);
    reset();
  };
  return (
    // TODO: Talvez fazer um search as you type?
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
        Pesquisar
      </button>
    </form>
  );
};

export default Searchbar;
