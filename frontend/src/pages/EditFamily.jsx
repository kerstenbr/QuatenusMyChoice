import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Cookies from "js-cookie";

const EditFamily = () => {
  const [name, setName] = useState('');
  const [bannerLink, setBannerLink] = useState('');
  const [qbmCode, setQbmCode] = useState('');
  const [desc, setDesc] = useState('');
  const [canvaLink, setCanvaLink] = useState('');
  const [addInfoLink, setAddInfoLink] = useState('');
  const [products, setProducts] = useState([]);
  const [tecInfoLink, setTecInfoLink] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      .then((response) => {
        const { name, bannerLink, qbmCode, desc, canvaLink, addInfoLink, products, tecInfoLink } = response.data;

        // Transformando products em um array de objetos com os valores corretos
        const productsArray = products ? Object.keys(products).map((productName) => ({
          name: productName,
          ...products[productName]
        })) : [];

        setName(name);
        setBannerLink(bannerLink);
        setQbmCode(qbmCode);
        setDesc(desc);
        setCanvaLink(canvaLink);
        setAddInfoLink(addInfoLink);
        setProducts(productsArray);
        setTecInfoLink(tecInfoLink);
      })
      .catch((error) => {
        alert(`Oops, algo deu errado!
        - ${error.response.data.message}`);
        console.error(error.response.data.message);
      });
  }, [id]);

  const handleEditFamily = () => {
    const productsObject = products.reduce((acc, { name, codigoQbm, desc, preco }) => {
      acc[name] = { codigoQbm, desc, preco };
      return acc;
    }, {});

    const data = {
      name, bannerLink, qbmCode, desc, canvaLink, addInfoLink, products: productsObject, tecInfoLink
    };

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        alert(`Oops, algo deu errado!
        - ${error.response.data.message}`);
        console.error(error.response.data.message);
      });
  };

  const handleAddProduct = () => {
    setProducts([...products, {
      name: '',
      codigoQbm: '',
      desc: '',
      preco: {
        comAdesao: Array(4).fill(''),
        semAdesao: Array(5).fill(''),
        fecho: ''
      }
    }]);
  };

  const handleDeleteProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleProductNameChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].name = value;
    setProducts(newProducts);
  };

  const handleProductValueChange = (index, key, value) => {
    const newProducts = [...products];
    newProducts[index][key] = value;
    setProducts(newProducts);
  };

  const handleProductPriceChange = (productIndex, type, priceIndex, value) => {
    const newProducts = [...products];
    newProducts[productIndex].preco[type][priceIndex] = value;
    setProducts(newProducts);
  };

  const handleProductPriceFechoChange = (productIndex, value) => {
    const newProducts = [...products];
    newProducts[productIndex].preco.fecho = value;
    setProducts(newProducts);
  };

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <BackButton />
        <h1>EDITAR FAMÍLIA</h1>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Código do QBM</label>
          <input
            type="text"
            value={qbmCode}
            onChange={(e) => setQbmCode(e.target.value)}
          />
        </div>
        <div>
          <label>Link do Banner</label>
          <input
            type="text"
            value={bannerLink}
            onChange={(e) => setBannerLink(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <label>Link do Canva</label>
          <input
            type="text"
            value={canvaLink}
            onChange={(e) => setCanvaLink(e.target.value)}
          />
        </div>
        <div>
          <label>Link da Informação Adicional</label>
          <input
            type="text"
            value={addInfoLink}
            onChange={(e) => setAddInfoLink(e.target.value)}
          />
        </div>
        <div>
          <label>Segmento de Produtos</label>
          {products.map((product, productIndex) => (
            <div key={productIndex}>
              <input
                type="text"
                placeholder="Nome do Produto"
                value={product.name}
                onChange={(e) => handleProductNameChange(productIndex, e.target.value)}
              />
              <input
                type="text"
                placeholder="Código do Produto"
                value={product.codigoQbm}
                onChange={(e) => handleProductValueChange(productIndex, 'codigoQbm', e.target.value)}
              />
              <input
                type="text"
                placeholder="Descrição"
                value={product.desc}
                onChange={(e) => handleProductValueChange(productIndex, 'desc', e.target.value)}
              />
              <div>
                <label>Preços com Adesão</label>
                {product.preco.comAdesao.map((value, valueIndex) => (
                  <input
                    key={valueIndex}
                    type="text"
                    placeholder={
                      valueIndex === 0 ? "Adesão" :
                        valueIndex === 1 ? "12 meses" :
                          valueIndex === 2 ? "24 meses" :
                            valueIndex === 3 ? "36 meses" :
                              "Erro"
                    }
                    value={value}
                    onChange={(e) => handleProductPriceChange(productIndex, 'comAdesao', valueIndex, e.target.value)}
                  />
                ))}
              </div>
              <div>
                <label>Preços sem Adesão</label>
                {product.preco.semAdesao.map((value, valueIndex) => (
                  <input
                    key={valueIndex}
                    type="text"
                    placeholder={
                      valueIndex === 0 ? "12 meses" :
                        valueIndex === 1 ? "24 meses" :
                          valueIndex === 2 ? "36 meses" :
                            valueIndex === 3 ? "48 meses" :
                              valueIndex === 4 ? "60 meses" :
                                "Erro"
                    }
                    value={value}
                    onChange={(e) => handleProductPriceChange(productIndex, 'semAdesao', valueIndex, e.target.value)}
                  />
                ))}
              </div>
              <div>
                <label>Fecho</label>
                <input
                  type="text"
                  placeholder="Fecho"
                  value={product.preco.fecho}
                  onChange={(e) => handleProductPriceFechoChange(productIndex, e.target.value)}
                />
              </div>
              <button onClick={() => handleDeleteProduct(productIndex)}>Excluir</button>
            </div>
          ))}
          <button onClick={handleAddProduct}>Adicionar Produto</button>
        </div>
        <div>
          <label>Link da Informação Técnica</label>
          <input
            type="text"
            value={tecInfoLink}
            onChange={(e) => setTecInfoLink(e.target.value)}
          />
        </div>
        <button onClick={handleEditFamily}>Salvar</button>
      </div>
    </div>
  );
};

export default EditFamily;
