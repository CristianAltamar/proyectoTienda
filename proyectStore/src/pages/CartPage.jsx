import { PurchaseRoute } from "../components/PurchaseRoute.jsx";
import { CartProducts } from "../components/page_cart/CartProducts.jsx";
import { Subtotals } from "../components/page_cart/Subtotals.jsx";
import { Products } from "../components/store/Products.jsx";
import { useEffect } from "react";
import { useContext } from "react";
import { ProductsContext } from "../contexts/contextProducts.jsx";

export const CartPage = () => {
    const { cartData, setFilters } = useContext(ProductsContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) window.location.replace("/login")
        setFilters({ limit: 4 })
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <PurchaseRoute />
            <div className="w-full flex justify-center max-w-6xl gap-8 p-8">
                <CartProducts />
                <Subtotals />
            </div>
            <Products products={cartData?.products || []} />
        </div>
    )
}