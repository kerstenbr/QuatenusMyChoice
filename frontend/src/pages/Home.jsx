import { useEffect, useState } from "react"
import Card from "../components/Card"

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
    <>
      <div className="cards">
        {families && families.map((family) => (
          <Card key={family._id} family={family}/>
        ))}
      </div>
    </>
  )
}

export default Home