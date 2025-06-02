import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FamilySearchbar from "../../components/family/FamilySearchbar";
import FamilyCard from "../../components/family/FamilyCard";
import FamilyList from "../../components/family/FamilyList";
import Cookies from "js-cookie";
import { ViewContext } from "../../context/viewContext";

const Families = () => {
  const [families, setFamilies] = useState([]);
  const navigate = useNavigate();
  // const [cardView, setCardView] = useState(true);
  const view = useContext(ViewContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setFamilies(response.data);
      })
      .catch((error) => {
        navigate("*");
        console.error(error.response.data.message);
      });
  }, [navigate]);

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <div>
          <FamilySearchbar />
        </div>
        {view.view === "card" ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {families && [...families].sort((a, b) => a.name.localeCompare(b.name)).map((family) => <FamilyCard key={family._id} family={family} />)}
          </div>
        ) : (
          <div className="row m-0 p-0">
            {families && [...families].sort((a, b) => a.name.localeCompare(b.name)).map((family) => <FamilyList key={family._id} family={family} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Families;
