import { PurchaseRoute } from "../components/PurchaseRoute.jsx";
import { CartProducts } from "../components/page_cart/CartProducts.jsx";
import { Subtotals } from "../components/page_cart/Subtotals.jsx";
import { Products } from "../components/store/Products.jsx";
import { useEffect, useContext  } from "react";
import { ProductsContext } from "../contexts/contextProducts.jsx";
import { useNavigate } from "react-router";

export const CartPage = () => {
    const { products, setFilters } = useContext(ProductsContext);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login")
        setFilters({ limit: 4 })
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <PurchaseRoute activePage={"cart"} />
            <div className="w-full flex flex-col justify-center items-center md:flex-row max-w-6xl gap-8 p-8">
                <CartProducts />
                <Subtotals />
            </div>
            <Products products={products || []} />
        </div>
    )
}