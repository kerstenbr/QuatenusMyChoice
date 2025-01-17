import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BomSearchbar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSearch = (data) => {
    console.log(data);
    const { qbmCode } = data;
    navigate(`/logistics-sector/bom/search/${qbmCode}`);
    reset();
  };
  return (
    <form className="input-group mb-3 mt-2" onSubmit={handleSubmit(onSearch)}>
      <input
        {...register("qbmCode", { required: true })}
        aria-invalid={errors.qbmCode ? "true" : "false"}
        type="search"
        className="form-control"
        placeholder="Pesquise aqui"
      />
      {errors.qbmCode?.type === "required"}
      <button type="submit" className="btn btn-sm btn-qorange">
        Pesquisar
      </button>
    </form>
  );
};

export default BomSearchbar;
