import { endpoints } from "./api/enpoints"
import { useFetch } from "./hooks/useFetch"
import { useEffect } from "react"

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const products = await useFetch(endpoints.createCart(), 'POST', {
        userId: 1,
        date: new Date(),
        products: [{productId: 1, quantity: 3}]
      })
      console.log(products)
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="bg-amber-400"></div>
    </>
  )
}

export default App
