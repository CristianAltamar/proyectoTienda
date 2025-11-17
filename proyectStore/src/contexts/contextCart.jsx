import { createContext, useState, useEffect, use } from "react";
import { endpoints } from "../api/enpoints";
import { useFetch } from "../hooks/useFetch";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const id = JSON.parse(atob(token.split(".")[1])).sub;
                const data = await useFetch(endpoints.getCarts(id), "GET", null, false);
                const products = data?.products || [];

                const updatedProducts = await Promise.all(products.map(async p => {
                    const productData = await useFetch(endpoints.getProducts(p.productId), "GET", null, false);
                    p = { ...p, "title": productData.title, "price": productData.price, "image": productData.image,"subtotal": productData.price * p.quantity };
                    return p;
                }));
                setCartProducts(updatedProducts);
                setCartSubtotal(updatedProducts.reduce((acc, item) => acc + item.quantity * item.price, 0));
                setCartCount(updatedProducts.reduce((acc, item) => acc + item.quantity, 0));
            }
        }
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, cartSubtotal, setCartSubtotal, cartCount, setCartCount }}>
        {children}
        </CartContext.Provider>
    );
}