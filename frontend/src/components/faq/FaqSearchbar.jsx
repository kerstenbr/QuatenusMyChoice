import { useForm } from "react-hook-form";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const FaqSearchbar = () => {
  const { user } = useContext(UserContext);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const data = {
    question,
    answer,
  };

  // axios
  //   .post(`${import.meta.env.VITE_BASE_URL}/api/faq/`, data, {
  //     headers: {
  //       Authorization: `Bearer ${Cookies.get("token")}`,
  //     },
  //   })
  //   .then(() => {
  //     navigate("/");
  //   })
  //   .catch((error) => {
  //     alert(`Oops, algo deu errado! - ${error.response.data.message}`);
  //     console.error(error.response.data.message);
  //   });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <div className="input-group mb-3 mt-2">
      {user && user.admin === true ? (
        <Link to="/faq/create">
          <div className="me-2" title="Criar nova pergunta">
            <button className="btn btn-qorange" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"></path>
              </svg>
            </button>
          </div>
        </Link>
      ) : null}
      <input {...register("name")} aria-invalid={errors.name ? "true" : "false"} type="search" className="form-control" placeholder="Pesquise aqui" />
    </div>
  );
};

export default FaqSearchbar;
