import { useEffect, useState } from "react"

import Card from "../components/Card"
import Searchbar from "../components/Searchbar"

const Home = () => {
  const [families, setFamilies] = useState(null)

  useEffect(() => {
    const fetchFamilies = async () => {
      const response = await fetch('http://localhost:5555/api/families/')
      const json = await response.json()

      if (response.ok) {
        setFamilies(json)
      }
    }

    fetchFamilies()
  }, [])

  return (
    <div className="py-5 bg-light">
      <div className="container">

        <Searchbar />
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

export default Home