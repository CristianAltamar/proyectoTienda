export const PurchaseRoute = ({ activePage }) => {

    return (
        <div className="w-full flex justify-center gap-10 py-4 px-2 bg-gray-100">
            <div className={activePage === "cart" ? "text-2xl font-bold underline" : "text-2xl"}>Carrito de compras</div>
            <div className={activePage === "orden" ? "text-2xl font-bold underline" : "text-2xl"}>Orden completa</div>
        </div>
    )
}