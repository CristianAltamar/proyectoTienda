import { useNavigate } from "react-router"
import { useContext } from "react"
import { ProductsContext } from "../../contexts/contextProducts"

export const Path = ({ category, productName }) => {
    const navigate = useNavigate()
    const { setFilters } = useContext(ProductsContext)

    const onProducts = (category = null) => {
        const path = category ? `/products?category=${category}` : "/products"
        setFilters(prev => ({...prev, limit: null}))
        navigate(path)
    }

    return (
        <div className="flex gap-1 w-full">
            <button className="text-gray-500 hover:text-black transition whitespace-nowrap overflow-hidden text-ellipsis"
            onClick={onProducts}>Productos</button>
            <span>/</span>
            <button className="text-gray-500 hover:text-gray-900 transition whitespace-nowrap overflow-hidden text-ellipsis"
            onClick={onProducts}>{category}</button>
            <span>/</span>
            <div className="text-gray-500 hover:text-gray-900 transition cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
            >{productName}</div>
        </div>
    )
}