import { endpoints } from "../api/enpoints.js"
import { useFetch } from "../hooks/useFetch.jsx"
import { useEffect, useState, useContext } from "react"
import { DetailProduct } from "../components/productById/DetailProduct.jsx"
import { Products } from "../components/store/Products.jsx"
import { ProductsContext } from "../contexts/contextProducts.jsx"


export const ProductPage = () => {
    const [isCharging, setIsCharging] = useState(false)
    const [product, setProduct] = useState({})
    const { products, setProducts } = useContext(ProductsContext)

    useEffect(() => {
        setIsCharging(true)
        const url = window.location.pathname;
        const partes = url.split('/')
        const id = partes[partes.length - 1];

        const getProduct = async () => {
            const p = await useFetch(endpoints.getProducts(id))
            setProduct(p)
            setIsCharging(false)
        }

        getProduct()
    },[])

    useEffect(() => {
        const fetchProducts = async () => {
            if (!product.category) return
            const data = await useFetch(endpoints.getProductsCategory(product.category));
            if (data) setProducts(data.filter(p => p.title !== product.title).slice(0,3));
        };

        fetchProducts();
    },[product])

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