import { PurchaseRoute } from "../components/PurchaseRoute.jsx";
import { CartProducts } from "../components/page_cart/CartProducts.jsx";
import { Subtotals } from "../components/page_cart/Subtotals.jsx";
import { Products } from "../components/store/Products.jsx";


export const CartPage = () => {
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <PurchaseRoute />
            <div className="w-full flex justify-center max-w-6xl gap-8 p-8">
                <CartProducts />
                <Subtotals />
            </div>
        </div>
    )
}