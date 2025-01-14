import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import BomList from "../../components/logistics-sector/BomList.jsx";
import BomSearchbar from "../../components/logistics-sector/BomSearchbar.jsx";

const SearchBom = () => {
  const { qbmCode } = useParams();
  const [products, setProducts] = useState([]);

  const search = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/bom/search?qbmCode=${qbmCode}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setProducts([]);
      });
  };

  useEffect(() => {
    search();
  }, [qbmCode]);

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <BomSearchbar />
        <p className="alert alert-secondary p-1">
          {products.length !== 0
            ? `${products.length} ${products.length > 1 ? `produtos correspondem a pesquisa: ${qbmCode}` : `produto corresponde a pesquisa: ${qbmCode}`}`
            : `Nenhum produto encontrado para: ${qbmCode} :(`}
        </p>
        {<div className="row">{products && products.map((product) => <BomList key={product._id} product={product} />)}</div>}
      </div>
    </div>
  );
};

export default SearchBom;
