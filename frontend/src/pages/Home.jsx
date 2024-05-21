import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import Card from "../components/Card"
import Searchbar from "../components/Searchbar"

const Home = () => {
  const [families, setFamilies] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:5555/api/families/')
      .then((response) => {
        setFamilies(response.data)
      }).catch((error) => {
        // alert(error.response.data.message)
        console.log(error)
      })
  })

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <Link to='/family/create'>
          <button type="button" className="btn btn-sm btn-qorange mb-1 float-end">Criar Família</button>
        </Link>
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