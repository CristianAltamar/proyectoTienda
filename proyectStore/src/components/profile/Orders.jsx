import { OrderHistoryItem } from "./Order.jsx";

export const OrderHistory = ({ orders = [] }) => {
    orders.sort((a,b) => {
        a = {...a, date: new Date(a.date)}
        b = {...b, date: new Date(b.date)}
        return b.date.getTime() - a.date.getTime()
    })

    return (
        <div className="max-w-3xl flex flex-col w-full items-center mx-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Historial de Órdenes</h2>

            {orders.map((order, index) => (
                <OrderHistoryItem key={index} order={order} />
            ))}
        </div>
    );
};
