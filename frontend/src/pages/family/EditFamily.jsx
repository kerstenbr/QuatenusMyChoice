import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import BackButton from "../../components/BackButton.jsx";

const EditFamily = () => {
  const [name, setName] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [qbmCode, setQbmCode] = useState("");
  const [desc, setDesc] = useState("");
  const [observations, setObservations] = useState("");
  const [links, setLinks] = useState([]);
  const [canvaLink, setCanvaLink] = useState("");
  const [addInfoLink, setAddInfoLink] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        const { name, bannerLink, qbmCode, desc, observations, links, canvaLink, addInfoLink, products } = response.data;

        const productsArray = products
          ? Object.keys(products).map((productName) => ({
              name: productName,
              ...products[productName],
              telemetry: products[productName].telemetry || {
                digital: "",
                analog: "",
              },
            }))
          : [];

        const linksArray = links
          ? Object.keys(links).map((key) => ({
              key,
              url: links[key],
            }))
          : [];

        setName(name);
        setBannerLink(bannerLink);
        setQbmCode(qbmCode);
        setDesc(desc);
        setObservations(observations);
        setLinks(linksArray);
        setCanvaLink(canvaLink);
        setAddInfoLink(addInfoLink);
        setProducts(productsArray);
      })
      .catch((error) => {
        navigate("*");
        console.error(error.response.data.message);
      });
  }, [id]);

  const removeEmptyTelemetry = (product) => {
    if (!product.telemetry.digital && !product.telemetry.analog) {
      delete product.telemetry;
    }
  };

  const handleEditFamily = () => {
    const productsObject = products.reduce((acc, product) => {
      removeEmptyTelemetry(product);
      acc = {
        name: product.name,
        qbmCode: product.qbmCode,
        desc: product.desc,
        price: product.price,
        telemetry: product.telemetry,
      };
      return acc;
    }, {});

    const linksObject = links.reduce((acc, link) => {
      acc[link.key] = link.url;
      return acc;
    }, {});

    const data = {
      name,
      bannerLink,
      qbmCode,
      desc,
      observations,
      links: linksObject,
      canvaLink,
      addInfoLink,
      products: productsObject,
    };

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(`Oops, algo deu errado! - ${error.response.data.message}`);
        console.error(error.response.data.message);
      });
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        qbmCode: "",
        desc: "",
        price: {
          withMembership: Array(4).fill(""),
          noMembership: Array(5).fill(""),
          renovation: Array(5).fill(""),
          closure: "",
          renovationClosure: "",
        },
        telemetry: {
          digital: "",
          analog: "",
        },
      },
    ]);
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
    newProducts[productIndex].price[type][priceIndex] = value;
    setProducts(newProducts);
  };

  const handleProductPriceClosureChange = (productIndex, value) => {
    const newProducts = [...products];
    newProducts[productIndex].price.closure = value;
    setProducts(newProducts);
  };

  const handleProductPriceRenovationClosureChange = (productIndex, value) => {
    const newProducts = [...products];
    newProducts[productIndex].price.renovationClosure = value;
    setProducts(newProducts);
  };

  const handleTelemetryChange = (productIndex, key, value) => {
    const newProducts = [...products];
    newProducts[productIndex].telemetry = newProducts[productIndex].telemetry || {};
    newProducts[productIndex].telemetry[key] = value;
    setProducts(newProducts);
  };

  const handleAddLink = () => {
    setLinks([...links, { key: "", url: "" }]);
  };

  const handleDeleteLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <BackButton />
        <h1 className="mt-3 mb-4">Editar Família</h1>
        <div className="row">
          <div className="col-6 mb-2">
            <label>Nome</label>
            <input type="text" className="form-control form-control-sm" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-6 mb-2">
            <label>Código do QBM</label>
            <input type="text" className="form-control form-control-sm" value={qbmCode} onChange={(e) => setQbmCode(e.target.value)} />
          </div>
          <div className="mb-2">
            <label>Link do Banner</label>
            <input type="text" className="form-control form-control-sm" value={bannerLink} onChange={(e) => setBannerLink(e.target.value)} />
          </div>
          <div className="mb-2">
            <label>Descrição</label>
            <input type="text" className="form-control form-control-sm" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="col-6 mb-2">
            <label>Link do Canva</label>
            <input type="text" className="form-control form-control-sm" value={canvaLink} onChange={(e) => setCanvaLink(e.target.value)} />
          </div>
          <div className="col-6 mb-2">
            <label>Link da Informação Adicional</label>
            <input type="text" className="form-control form-control-sm" value={addInfoLink} onChange={(e) => setAddInfoLink(e.target.value)} />
          </div>
          <div className="col-6 mb-2">
            <label>Observações</label>
            <textarea className="form-control" rows={2} value={observations} onChange={(e) => setObservations(e.target.value)} />
          </div>
        </div>
        <div>
          <label>Links</label>
          {links.map((link, index) => (
            <div key={index} className="row mb-2">
              <div className="col-5">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder={`Nome`}
                  value={link.key}
                  onChange={(e) => handleLinkChange(index, "key", e.target.value)}
                />
              </div>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                />
              </div>
              <div className="col-2">
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteLink(index)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-sm btn-primary mb-2" onClick={handleAddLink}>
          Adicionar Link
        </button>
        <div>
          <label>Segmento de Produtos</label>
          {products.map((product, productIndex) => (
            <div key={productIndex} className="row mb-3 border p-3">
              <div className="col-6 mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nome do Produto"
                  value={product.name}
                  onChange={(e) => handleProductNameChange(productIndex, e.target.value)}
                />
              </div>
              <div className="col-6 mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Código do Produto"
                  value={product.qbmCode}
                  onChange={(e) => handleProductValueChange(productIndex, "qbmCode", e.target.value)}
                />
              </div>
              <div className="col-12 mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Descrição"
                  value={product.desc}
                  onChange={(e) => handleProductValueChange(productIndex, "desc", e.target.value)}
                />
              </div>
              <div className="row mt-2">
                <label>Preços com Adesão</label>
                {product.price.withMembership.map((value, valueIndex) => (
                  <div className="col-2" key={valueIndex}>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      placeholder={
                        valueIndex === 0 ? "Adesão" : valueIndex === 1 ? "12 meses" : valueIndex === 2 ? "24 meses" : valueIndex === 3 ? "36 meses" : "Erro"
                      }
                      value={value}
                      onChange={(e) => handleProductPriceChange(productIndex, "withMembership", valueIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="row">
                <label>Preços sem Adesão</label>
                {product.price.noMembership.map((value, valueIndex) => (
                  <div className="col-2" key={valueIndex}>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      placeholder={
                        valueIndex === 0
                          ? "12 meses"
                          : valueIndex === 1
                          ? "24 meses"
                          : valueIndex === 2
                          ? "36 meses"
                          : valueIndex === 3
                          ? "48 meses"
                          : valueIndex === 4
                          ? "60 meses"
                          : "Erro"
                      }
                      value={value}
                      onChange={(e) => handleProductPriceChange(productIndex, "noMembership", valueIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="mb-2 col-2">
                <label>Preço de Fechamento</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={product.price.closure}
                  onChange={(e) => handleProductPriceClosureChange(productIndex, e.target.value)}
                />
              </div>
              <div className="row mt-2">
                <label>Preços da Renovação</label>
                {product.price.renovation.map((value, valueIndex) => (
                  <div className="col-2" key={valueIndex}>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      placeholder={
                        valueIndex === 0
                          ? "12 meses"
                          : valueIndex === 1
                          ? "24 meses"
                          : valueIndex === 2
                          ? "36 meses"
                          : valueIndex === 3
                          ? "48 meses"
                          : valueIndex === 4
                          ? "60 meses"
                          : "Erro"
                      }
                      value={value}
                      onChange={(e) => handleProductPriceChange(productIndex, "renovation", valueIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <label>Preço de Fechamento da Renovação</label>
              <div className="mb-2 col-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={product.price.renovationClosure}
                  onChange={(e) => handleProductPriceRenovationClosureChange(productIndex, e.target.value)}
                />
              </div>
              <div className="row mb-2 mt-2">
                <label>Telemetria</label>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Digital"
                    value={product.telemetry?.digital || ""}
                    onChange={(e) => handleTelemetryChange(productIndex, "digital", e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Analógico"
                    value={product.telemetry?.analog || ""}
                    onChange={(e) => handleTelemetryChange(productIndex, "analog", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(productIndex)}>
                  Excluir {product.name}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-sm btn-primary" onClick={handleAddProduct}>
            Adicionar Produto
          </button>
          <button className="btn btn-sm btn-success" onClick={handleEditFamily}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFamily;
