import { useParams } from "react-router-dom"
import Searchbar from "../components/Searchbar"
import { useEffect, useState } from "react"
import axios from 'axios'
import Card from "../components/Card"

const Search = () => {
    const { name } = useParams()
    const [families, setFamilies] = useState([])

    const search = () => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/api/families/search?name=${name}`)
            .then((response) => {
                console.log(response)
                setFamilies(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                // Decidir retirar o alerta para melhorar a UX
                // alert(`Oops, algo deu errado!
                // - ${error.response.data.message}`)
                console.error(error.response.data.message)
                setFamilies([])
            })
    }

    useEffect(() => {
        search()
    }, [name])

    return (
        <div className="py-2 bg-light">
            <div className="container">
                <Searchbar />
                <p className="alert alert-secondary p-1">
                    {families.length !== 0 ?
                        `${families.length} ${families.length > 1 ? `produtos encontrados para a pesquisa: ${name} :)` : `produto encontrado para a pesquisa: ${name} :)`}` : `Nenhum produto encontrado para: ${name} :(`}
                </p>
                {
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {families && families.map((family) => (
                            <Card key={family._id} family={family} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default Search