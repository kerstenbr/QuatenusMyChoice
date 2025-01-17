import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FamilySearchbar from "../../components/family/FamilySearchbar.jsx";
import FamilyCard from "../../components/family/FamilyCard.jsx";
import Cookies from "js-cookie";

const SearchFamily = () => {
  const { name } = useParams();
  const [families, setFamilies] = useState([]);

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
        console.error(error.response.data.message);
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
        {
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {families && families.map((family) => <FamilyCard key={family._id} family={family} />)}
          </div>
        }
      </div>
    </div>
  );
};

export default SearchFamily;
