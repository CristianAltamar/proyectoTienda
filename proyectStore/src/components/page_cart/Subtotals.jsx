import { useContext } from "react";
import { CartContext } from "../../contexts/contextCart.jsx";

export const Subtotals = () => {
    const { cartSubtotal } = useContext(CartContext);
    const delivery = cartSubtotal > 0 ? 60 : 0;

    const onHandleClick = () => window.location.replace("/checkout");
    
    return (
        <div className="w-80 p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Totales del carrito</h2>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>$ {cartSubtotal?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span>Envío:</span>
                    <span>$ {delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>$ {(cartSubtotal || 0 + delivery)?.toFixed(2)}</span>
                </div>
                <button 
                    onClick={() => onHandleClick()} 
                    className={"bg-gray-700 text-white py-2 px-4 rounded-4xl cursor-pointer hover:bg-gray-800"} 
                    disabled={cartSubtotal === 0}
                >
                    finalizar compra
                </button>
            </div>
        </div>
    )
}