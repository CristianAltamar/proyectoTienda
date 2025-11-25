export const MobileTable = ({ cartProducts, handleQuantityChange }) => {
    return (
        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-700 w-full md:hidden">
            <div className="space-y-4">
                {cartProducts.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 relative"
                    >
                        <button
                            onClick={() => handleQuantityChange(item.productId, 0)}
                            className="text-red-600 hover:text-red-800 px-2 py-1 cursor-pointer absolute top-0 left-0"
                            aria-label={`Eliminar ${item.title}`}
                        >
                            ✖
                        </button>
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                            <p className="w-full font-semibold text-lg">{item.title}</p>

                            <p className="text-sm text-gray-400">
                                ID Producto: {item.productId}
                            </p>

                            <p className="text-sm text-gray-300">
                                Precio: ${item.price?.toFixed(2)}
                            </p>

                            <div className="flex items-center">
                                Cantidad:  
                                <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-400 cursor-pointer">-</button>
                                <span className="px-2 py-1 bg-transparent rounded ">{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-400 cursor-pointer">+</button>
                            </div>

                            <p className="text-md font-semibold mt-1">
                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}