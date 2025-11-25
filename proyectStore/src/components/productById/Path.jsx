import { useContext } from "react"
import { NavLink } from "react-router"
import { ProductsContext } from "../../contexts/contextProducts"


export const Path = ({ category, productName }) => {
    const { setFilters } = useContext(ProductsContext)

    const onProducts = (category=null) => {
        const filters = category ? {category: category} : {}
        setFilters(filters)
    }

    return (
        <div className="flex gap-1 w-full">
            <NavLink 
                onClick={() => onProducts()}
                className="text-gray-500 hover:text-black transition whitespace-nowrap overflow-hidden text-ellipsis"
                to="/products"
            >
                Productos
            </NavLink>
            <span>/</span>
            <NavLink 
                onClick={() => onProducts(category)}
                className="text-gray-500 hover:text-gray-900 transition whitespace-nowrap overflow-hidden text-ellipsis"
                to={`/products?category=${category}`}
            >
                {category}
            </NavLink>
            <span>/</span>
            <div className="text-gray-500 hover:text-gray-900 transition cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
            >{productName}</div>
        </div>
    )
}