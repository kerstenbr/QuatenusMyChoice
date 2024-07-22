import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Cookies from "js-cookie";

const CreateFamily = () => {
  const [name, setName] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [qbmCode, setQbmCode] = useState("");
  const [desc, setDesc] = useState("");
  const [canvaLink, setCanvaLink] = useState("");
  const [addInfoLink, setAddInfoLink] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleCreateFamily = () => {
    const removeEmptyTelemetry = (product) => {
      if (!product.telemetry.digital && !product.telemetry.analog) {
        delete product.telemetry;
      }
    };

    const productsObject = products.reduce((acc, product) => {
      removeEmptyTelemetry(product);
      acc[product.name] = {
        codigoQbm: product.codigoQbm,
        desc: product.desc,
        preco: product.preco,
        telemetry: product.telemetry,
      };
      return acc;
    }, {});

    const data = {
      name,
      bannerLink,
      qbmCode,
      desc,
      canvaLink,
      addInfoLink,
      products: productsObject,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/families/`, data, {
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
        codigoQbm: "",
        desc: "",
        preco: {
          comAdesao: Array(4).fill(""),
          semAdesao: Array(5).fill(""),
          fecho: "",
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
    newProducts[productIndex].preco[type][priceIndex] = value;
    setProducts(newProducts);
  };

  const handleProductPriceFechoChange = (productIndex, value) => {
    const newProducts = [...products];
    newProducts[productIndex].preco.fecho = value;
    setProducts(newProducts);
  };

  const handleTelemetryChange = (productIndex, key, value) => {
    const newProducts = [...products];
    newProducts[productIndex].telemetry =
      newProducts[productIndex].telemetry || {};
    newProducts[productIndex].telemetry[key] = value;
    setProducts(newProducts);
  };

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <BackButton />
        <h1 className="mt-3 mb-4">Criar Família</h1>
        <div className="row">
          <div className="col-6 mb-2">
            <label>Nome</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-6 mb-2">
            <label>Código do QBM</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={qbmCode}
              onChange={(e) => setQbmCode(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Link do Banner</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={bannerLink}
              onChange={(e) => setBannerLink(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Descrição</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="col-6 mb-2">
            <label>Link do Canva</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={canvaLink}
              onChange={(e) => setCanvaLink(e.target.value)}
            />
          </div>
          <div className="col-6 mb-2">
            <label>Link da Informação Adicional</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={addInfoLink}
              onChange={(e) => setAddInfoLink(e.target.value)}
            />
          </div>
        </div>
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
                  onChange={(e) =>
                    handleProductNameChange(productIndex, e.target.value)
                  }
                />
              </div>
              <div className="col-6 mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Código do Produto"
                  value={product.codigoQbm}
                  onChange={(e) =>
                    handleProductValueChange(
                      productIndex,
                      "codigoQbm",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col-12 mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Descrição"
                  value={product.desc}
                  onChange={(e) =>
                    handleProductValueChange(
                      productIndex,
                      "desc",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="row">
                <label>Preços com Adesão</label>
                {product.preco.comAdesao.map((value, valueIndex) => (
                  <div className="col-2" key={valueIndex}>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      placeholder={
                        valueIndex === 0
                          ? "Adesão"
                          : valueIndex === 1
                          ? "12 meses"
                          : valueIndex === 2
                          ? "24 meses"
                          : valueIndex === 3
                          ? "36 meses"
                          : "Erro"
                      }
                      value={value}
                      onChange={(e) =>
                        handleProductPriceChange(
                          productIndex,
                          "comAdesao",
                          valueIndex,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="row">
                <label>Preços sem Adesão</label>
                {product.preco.semAdesao.map((value, valueIndex) => (
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
                      onChange={(e) =>
                        handleProductPriceChange(
                          productIndex,
                          "semAdesao",
                          valueIndex,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="mb-2">
                <label>Fecho</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Fecho"
                  value={product.preco.fecho}
                  onChange={(e) =>
                    handleProductPriceFechoChange(productIndex, e.target.value)
                  }
                />
              </div>
              <div className="mb-2 row">
                <label>Telemetria</label>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Digital"
                    value={product.telemetry?.digital || ""}
                    onChange={(e) =>
                      handleTelemetryChange(
                        productIndex,
                        "digital",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Analógico"
                    value={product.telemetry?.analog || ""}
                    onChange={(e) =>
                      handleTelemetryChange(
                        productIndex,
                        "analog",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteProduct(productIndex)}>
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
          <button
            className="btn btn-sm btn-success"
            onClick={handleCreateFamily}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFamily;
