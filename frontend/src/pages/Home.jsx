import { useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card"
import Searchbar from "../components/Searchbar"

const Home = () => {
  const [families, setFamilies] = useState(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/`)
      .then((response) => {
        setFamilies(response.data)
      }).catch((error) => {
        alert(`Oops, algo deu errado!
        - ${error.response.data.message}`)
        console.error(error)
      })
  }, [])

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <Searchbar />
        {
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {/* TODO: Achar outra forma mais coerente de organizar as famílias de produto, atualmente está por ordem alfabética */}
            {families &&
              [...families]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((family) => (
                  <Card key={family._id} family={family} />
                ))
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Home