export const OrderHistoryItem = ({ order }) => {
    const formattedDate = new Date(order.date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-700 w-full">
            <h3 className="text-2xl font-bold mb-3">Orden #{order.id}</h3>

            <p className="text-sm text-gray-300 mb-4">
                <span className="font-semibold">Fecha:</span> {formattedDate}
            </p>

            <h4 className="text-lg font-semibold mb-4">Productos</h4>

            <div className="space-y-4">
                {order.products.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700"
                    >
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
                            <p className="text-sm text-gray-300">
                                Cantidad: {item.quantity}
                            </p>

                            <p className="text-md font-semibold mt-1">
                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                <span className="font-semibold">Usuario:</span> {order.user}
                </p>
            </div>
        </div>
    );
};

