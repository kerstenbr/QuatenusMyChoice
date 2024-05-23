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
            .get(`http://localhost:5555/api/families/search?name=${name}`)
            .then((response) => {
                setFamilies(response.data)
            })
            .catch((error) => {
                console.log(error.response)
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
                        `${families.length} ${families.length > 1 ? "famílias encontradas" : "família encontrada"}` : "Nenhuma família encontrada :("}
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