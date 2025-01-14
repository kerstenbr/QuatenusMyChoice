import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BomList from "../../components/logistics-sector/BomList.jsx";
import BomSearchbar from "../../components/logistics-sector/BomSearchbar.jsx";

const Bom = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/bom/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        navigate("*");
        console.error(error.response.data.message);
      });
  }, [navigate]);

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <BomSearchbar />
        <div className="row">
          {products && products.sort((a, b) => a.qbmCode.localeCompare(b.qbmCode)).map((product) => <BomList key={product._id} product={product} />)}
        </div>
      </div>
    </div>
  );
};

export default Bom;
