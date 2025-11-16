import { PurchaseRoute } from "../components/PurchaseRoute.jsx";
import { CartProducts } from "../components/page_cart/CartProducts.jsx";
import { Subtotals } from "../components/page_cart/Subtotals.jsx";
import { Products } from "../components/store/Products.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch.jsx";
import { endpoints } from "../api/enpoints.js";

export const CartPage = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchCart = async () => {
                const id = JSON.parse(atob(token.split(".")[1])).sub;
                const data = await useFetch(endpoints.getCarts(id), "GET", null, false);
                const products = data?.products || [];

                const updatedProducts = await Promise.all(products.map(async p => {
                    const productData = await useFetch(endpoints.getProducts(p.productId), "GET", null, false);
                    p = { ...p, "title": productData.title, "price": productData.price, "image": productData.image };
                    return p;
                }));
                setCartProducts(updatedProducts);
            }
            fetchCart();
            return;
        }
        setCartProducts([]);
        window.location.replace("/login")
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <PurchaseRoute />
            <div className="w-full flex justify-center max-w-6xl gap-8 p-8">
                <CartProducts cart={cartProducts} />
                <Subtotals cart={cartProducts} />
            </div>
        </div>
    )
}