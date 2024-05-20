import { useEffect, useState } from "react"
import axios from "axios"

import Card from "../components/Card/Card"
import Searchbar from "../components/Searchbar"
import CreateFamily from "../components/CreateFamilyButton"

const Home = () => {
  const [families, setFamilies] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:5555/api/families/')
      .then((response) => {
        setFamilies(response.data)
      }).catch((error) => {
        alert("Ocorreu um erro, olhe o console")
        console.log(error)
      })
  })

  // useEffect(() => {
  //   const fetchFamilies = async () => {
  //     const response = await fetch('http://localhost:5555/api/families/')
  //     const json = await response.json()

  //     if (response.ok) {
  //       setFamilies(json)
  //     }
  //   }

  //   fetchFamilies()
  // }, [])

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <CreateFamily />
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