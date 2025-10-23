export const CardProduct = ({ product }) => {
    return (
        <div className="border p-4 rounded shadow-md flex flex-col items-center justify-between hover:shadow-lg transition-shadow duration-300">
            <img src={product.image} alt={product.title} className="w-full h-auto aspect-square" />
            <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
                <p className="text-gray-700 mb-4 text-center">${product.price}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Agregar al carrito
                </button>
            </div>
        </div>
    )
}