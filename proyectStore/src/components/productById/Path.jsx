export const Path = ({ category, productName }) => {
    const baseUrl = window.location.origin
    return (
        <div className="flex gap-1 w-full">
            <a className="text-gray-500 hover:text-black transition whitespace-nowrap overflow-hidden text-ellipsis"
            href={`${baseUrl}/products`}>Productos</a>
            <span>/</span>
            <a className="text-gray-500 hover:text-gray-900 transition whitespace-nowrap overflow-hidden text-ellipsis"
            href={`${baseUrl}/products?category=${category}`}>{category}</a>
            <span>/</span>
            <div className="text-gray-500 hover:text-gray-900 transition cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
            >{productName}</div>
        </div>
    )
}