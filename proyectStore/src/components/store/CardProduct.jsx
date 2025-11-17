import { CartProducts } from "../page_cart/CartProducts"

export const CardProduct = ({ product, isInCart, quantity = 0 }) => {
    const baseUrl = "/product/"
    
    const onClickCard = id => window.location.href = `${baseUrl}${id}`

    return (
        <div className="border p-4 rounded shadow-md flex flex-col items-center justify-between hover:shadow-lg transition-shadow duration-300">
            <img src={product.image} alt={product.title} className="w-full h-auto aspect-square" />
            <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
                <p className="text-gray-700 mb-4 text-center">${product.price}</p>
                {isInCart ?  
                    <div className="flex justify-center">
                        <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-800 cursor-pointer">+</button>
                        <span className="px-2 py-1 bg-gray-200 rounded ">{quantity}</span>
                        <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-800 cursor-pointer">-</button>
                    </div> :
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    onClick={() => onClickCard(product.id)}
                    >
                        Agregar al carrito
                    </button>
                }
            </div>
        </div>
    )
}