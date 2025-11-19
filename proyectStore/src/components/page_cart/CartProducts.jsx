import { useContext } from "react";
import { CartContext } from "../../contexts/contextCart.jsx";

export const CartProducts = () => {
    const { cartProducts, setCartProducts } = useContext(CartContext);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            setCartProducts( prev => (prev.map( p => {
                if (p.productId === productId) {
                    return { ...p, quantity: parseInt(newQuantity) };
                }
                return p;
            })));
            return;
        }
        setCartProducts(prev => (prev.filter( p => p.productId !== productId )));
    }
    
    return (
        <>
            {cartProducts?.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500"></th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Producto</th>
                                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Precio</th>
                                <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Cantidad</th>
                                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Subtotal</th>
                                <th className="px-4 py-2 text-center text-sm font-medium text-gray-500"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cartProducts?.map((product) => {
                                const subtotal = (Number(product.price) || 0) * (Number(product.quantity) || 0);
                                return (
                                    <tr key={product.productId}>
                                        <td className="px-4 py-3">
                                            <img
                                                src={product.image}
                                                alt={product.title || "producto"}
                                                className="h-16 w-16 object-cover rounded"
                                            />
                                        </td>
                                        <td title={product.title} className="px-4 py-3 max-w-10 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">{product.title}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                            ${Number(product.price || 0).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-auto text-sm text-gray-700 text-center">
                                            <div className="flex justify-center items-center">
                                                <button onClick={() => handleQuantityChange(product.productId, product.quantity - 1)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-800 cursor-pointer">-</button>
                                                <span className="px-2 py-1 bg-gray-200 rounded ">{product.quantity}</span>
                                                <button onClick={() => handleQuantityChange(product.productId, product.quantity + 1)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-800 cursor-pointer">+</button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                            ${subtotal.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleQuantityChange(product.productId, 0)}
                                                className="text-red-600 hover:text-red-800 px-2 py-1 cursor-pointer"
                                                aria-label={`Eliminar ${product.title}`}
                                            >
                                                ✖
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}