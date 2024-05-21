import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton'

const CreateFamily = () => {
    const [name, setName] = useState('');
    const [alias, setAlias] = useState('');
    const [bannerLink, setBannerLink] = useState('');
    const [qbmCode, setQbmCode] = useState('');
    const [desc, setDesc] = useState('');
    const [canvaLink, setCanvaLink] = useState('');
    const [addInfoLink, setAddInfoLink] = useState('');
    const [products, setProducts] = useState([]);
    const [tecInfoLink, setTecInfoLink] = useState('');
    const navigate = useNavigate();

    const handleCreateFamily = () => {
        // transformando o array products em um objeto onde as chaves são os nomes dos produtos e os valores são os arrays de valores associados a cada produto.
        const productsObject = products.reduce((acc, { name, values }) => {
            acc[name] = values;
            return acc;
        }, {});

        const data = {
            name, alias, bannerLink, qbmCode, desc, canvaLink, addInfoLink, products: productsObject, tecInfoLink
        };

        axios
            .post('http://localhost:5555/api/families/', data)
            .then(() => {
                navigate('/');
            }).catch((error) => {
                alert(error.response.data.message);
                console.log(error);
            });
    };

    const handleAddProduct = () => {
        setProducts([...products, { name: '', values: Array(9).fill('') }]);
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

    const handleProductValueChange = (productIndex, valueIndex, value) => {
        const newProducts = [...products];
        newProducts[productIndex].values[valueIndex] = value;
        setProducts(newProducts);
    };

    return (
        <div className="py-2 bg-light">
            <div className="container">
                <BackButton />
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Alias</label>
                    <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
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
                    <label>Código do QBM</label>
                    <input
                        type="text"
                        value={qbmCode}
                        onChange={(e) => setQbmCode(e.target.value)}
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
                            {product.values.map((value, valueIndex) => (
                                <input
                                    key={valueIndex}
                                    type="text"
                                    placeholder={valueIndex === 0 ? "Adesão" : valueIndex === 1 ? "12 meses" : valueIndex === 2 ? "24 meses" : valueIndex === 3 ? "36 meses" : valueIndex === 4 ? "12 meses S/A" : valueIndex === 5 ? "24 meses S/A" : valueIndex === 6 ? "36 meses S/A" : valueIndex === 7 ? "48 meses S/A" : valueIndex === 8 ? "60 meses S/A" : "Valor"}
                                    value={value}
                                    onChange={(e) => handleProductValueChange(productIndex, valueIndex, e.target.value)}
                                />
                            ))}
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
                <button onClick={handleCreateFamily}>Criar</button>
            </div>
        </div>
    );
};

export default CreateFamily;
