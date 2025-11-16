export const Subtotals = ({ cart }) => {
    const subtotal = cart.reduce((acc, p) => acc + p.subtotal, 0);

    const onHandleClick = () => window.location.replace("/purchase-address");
    
    return (
        <div className="w-80 p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Totales del carrito</h2>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>$ {subtotal}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span>Envío:</span>
                    <span>$ 60.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>$ {subtotal + 60}</span>
                </div>
                <button onClick={() => onHandleClick()} className="bg-gray-700 text-white py-2 px-4 rounded-4xl cursor-pointer hover:bg-gray-800">finalizar compra</button>
            </div>
        </div>
    )
}