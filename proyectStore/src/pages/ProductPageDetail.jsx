import { endpoints } from "../api/enpoints.js"
import { useFetch } from "../hooks/useFetch.jsx"
import { useEffect, useState, useContext } from "react"
import { DetailProduct } from "../components/productById/DetailProduct.jsx"
import { Products } from "../components/store/Products.jsx"
import { ProductsContext } from "../contexts/contextProducts.jsx"


export const ProductPage = () => {
    const [isCharging, setIsCharging] = useState(false)
    const [product, setProduct] = useState({})
    const { products, setFilters } = useContext(ProductsContext)

    useEffect(() => {
        setIsCharging(true)
        const url = window.location.pathname;
        const partes = url.split('/')
        const id = partes[partes.length - 1];

        const getProduct = async () => {
            const p = await useFetch(endpoints.getProducts(id))
            setProduct(p)
            setFilters({category: p.category, limit: 4})
            setIsCharging(false)
        }

        getProduct()

    },[])

    return(
        <>
            {!isCharging ?
                <div>
                    <DetailProduct
                        product={product}
                    />
                    <Products 
                        products={products} 
                    />
                </div>
                :
                <p>Cargando...</p>
            }
        </>
    )
}