import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FamilySearchbar from "../../components/family/FamilySearchbar.jsx";
import FamilyCard from "../../components/family/FamilyCard.jsx";
import FamilyList from "../../components/family/FamilyList.jsx";
import Cookies from "js-cookie";
import { ViewContext } from "../../context/viewContext";

const SearchFamily = () => {
  const { name } = useParams();
  const [families, setFamilies] = useState([]);
  const view = useContext(ViewContext);

  const search = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setFamilies(response.data);
      })
      .catch((error) => {
        console.error(error.response?.data?.message || "Erro ao buscar famílias.");
        setFamilies([]);
      });
  };

  useEffect(() => {
    search();
  }, [name]);

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <FamilySearchbar />
        <p className="alert alert-secondary p-1">
          {families.length !== 0
            ? `${families.length} ${families.length > 1 ? `famílias contém o produto: ${name}` : `família contém o produto: ${name}`}`
            : `Nenhum produto encontrado para: ${name} :(`}
        </p>
        {view.view === "card" ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {families.map((family) => (
              <FamilyCard key={family._id} family={family} />
            ))}
          </div>
        ) : (
          <div className="row m-0 p-0">
            {families.map((family) => (
              <FamilyList key={family._id} family={family} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFamily;
