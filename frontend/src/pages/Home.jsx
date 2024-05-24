import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Card from "../components/Card"
import Searchbar from "../components/Searchbar"

const Home = () => {
  const [families, setFamilies] = useState(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/`)
      .then((response) => {
        setFamilies(response.data)
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    // console.log(Cookies.get("token"))
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