import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/family/Card.jsx";
import Searchbar from "../components/family/Searchbar.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import NotActiveAccountAlert from "../components/NotActiveAccountAlert.jsx";

const Home = () => {
  const [families, setFamilies] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/`)
      .then((response) => {
        setFamilies(response.data);
      })
      .catch((error) => {
        navigate("*");
        console.error(error.response.data.message);
      });
  }, []);

  return (
    <div className="py-2 bg-light">
      <div className="container">
        {user.role !== "undefined" ? (
          <>
            <Searchbar />
            {
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {/* TODO: Achar outra forma mais coerente de organizar as famílias de produto, atualmente está por ordem alfabética */}
                {families && [...families].sort((a, b) => a.name.localeCompare(b.name)).map((family) => <Card key={family._id} family={family} />)}
              </div>
            }
          </>
        ) : (
          <>
            <NotActiveAccountAlert />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
