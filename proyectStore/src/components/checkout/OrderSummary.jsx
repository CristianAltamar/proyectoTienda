// Componente de Resumen de Pedido
export function OrderSummary() {
    return (
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-center text-lg font-semibold mb-4">TU PEDIDO</h2>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2">PRODUCTO</th>
                        <th className="text-right py-2">SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody>
                {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="border-b">
                        <td className="py-2">ProductName x1</td>
                        <td className="text-right py-2">$ 50.000,00</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="mt-4 text-sm space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$ 200.000,00</span>
                </div>
                <div className="flex justify-between">
                    <span>Impo</span>
                    <span>$ 40.000,00</span>
                </div>
                <div className="flex justify-between">
                    <span>Envío</span>
                    <span>$ 70.000,00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>$ 320.000,00</span>
                </div>
            </div>

            <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition">
                Realizar pago
            </button>
        </div>
    );
}