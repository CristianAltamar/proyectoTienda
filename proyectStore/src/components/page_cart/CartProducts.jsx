export const CartProducts = cart => {
    return (
        <>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 w-full">
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 p-4 border-b border-gray-300">
                            <img src={product.image} alt={product.title} className="w-20 h-20 object-cover" />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{product.title}</h2>
                                <p className="text-gray-700">${product.price}</p>
                            </div>
                            <div>
                                <label className="mr-2">Cantidad:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    className="w-16 border border-gray-300 rounded px-2 py-1"
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}