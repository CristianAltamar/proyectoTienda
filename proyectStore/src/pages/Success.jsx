import { PurchaseRoute } from "../components/PurchaseRoute"

export const Success = () => {
    const onViewStore = () => window.location.replace("/products")
    const onBack = () => window.location.replace("/orders-history")

    return(
        <div>
            <PurchaseRoute activePage={"orden"} />
            <div className="w-full py-16 px-6">
                <div className="bg-white rounded-lg shadow-sm p-12 flex flex-col items-center text-center">
                    <div className="flex items-center gap-6 mb-6">
                        <svg className="w-6 h-6 text-green-800 opacity-60 fill-current relative" aria-hidden="true" focusable="false" role="img">
                            <use href={"/icons.svg#star-icon"} />
                        </svg>
                        <svg className="w-6 h-6 text-green-800 opacity-60 fill-current relative" aria-hidden="true" focusable="false" role="img">
                            <use href={"/icons.svg#star-icon"} />
                        </svg>
                    </div>


                    <h1 className="text-3xl md:text-4xl font-light text-green-600 tracking-wide">Orden creada</h1>
                    <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-green-700 underline decoration-green-200 decoration-4">CORRECTAMENTE</h2>


                    <p className="mt-6 text-sm text-gray-600">Gracias por tu compra.</p>


                    <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button onClick={onViewStore} className="px-5 py-2 rounded-md bg-sky-600 text-white shadow-sm cursor-pointer">Volver a la tienda</button>
                        <button onClick={onBack} className="px-5 py-2 rounded-md border text-slate-700 cursor-pointer">Ver mis órdenes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}