import { useContext } from "react";
import { CartContext } from "../../contexts/contextCart.jsx";
import { useFetch } from "../../hooks/useFetch.jsx"
import { endpoints } from "../../api/enpoints.js"

export const Subtotals = () => {
    const { cartProducts, cartSubtotal } = useContext(CartContext);
    const delivery = cartSubtotal > 0 ? 60 : 0;

    const onHandleClick = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.reload()
            return;
        }
        const user = JSON.parse(atob(token.split(".")[1])) || null;

        const cartData = { date: new Date(), userId: user.sub, products: cartProducts };
        useFetch(endpoints.createCart(), "POST", cartData)
            .then((res) => {
                if (res) {
                    localStorage.removeItem("cartData")
                    let orderHistory = localStorage.getItem("orderHistory")
                    orderHistory = orderHistory ? JSON.parse(orderHistory) : []
                    orderHistory = [...orderHistory, res]
                    orderHistory = JSON.stringify(orderHistory)
                    localStorage.setItem("orderHistory", orderHistory)
                    window.location.replace("/success")
                }
            })
            .catch(e => console.error("Error creating order: ", e))
    }
    
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
                    <span>$ {(cartSubtotal + delivery)?.toFixed(2)}</span>
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