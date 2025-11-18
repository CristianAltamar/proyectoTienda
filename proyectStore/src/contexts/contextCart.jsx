import { createContext, useState, useEffect, use } from "react";
import { endpoints } from "../api/enpoints";
import { useFetch } from "../hooks/useFetch";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData , setCartData] = useState({});
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        console.log("Fetching cart data...");
        const fetchCart = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const id = JSON.parse(atob(token.split(".")[1])).sub;
                let data = localStorage.getItem("cartData");
                data = data ? JSON.parse(data) : null;
                if (!data) {
                    console.log("No cart data in localStorage, fetching from API...");
                    data = await useFetch(endpoints.getCarts(id), "GET", null, false);
                    localStorage.setItem("cartData", JSON.stringify(data));
                }

                const updatedProducts = await Promise.all(data?.products?.map(async p => {
                    const productData = await useFetch(endpoints.getProducts(p.productId), "GET", null, false);
                    p = { ...p, "title": productData.title, "price": productData.price, "image": productData.image,"subtotal": productData.price * p.quantity };
                    return p;
                }));
                setCartData({ ...data, products: updatedProducts });
                setCartSubtotal(updatedProducts.reduce((acc, item) => acc + item.quantity * item.price, 0));
                setCartCount(updatedProducts.reduce((acc, item) => acc + item.quantity, 0));
            }
        }
        fetchCart();
    }, []);

    useEffect(() => {
        setCartSubtotal(cartData?.products?.reduce((acc, item) => acc + item.quantity * item.price, 0));
        setCartCount(cartData?.products?.reduce((acc, item) => acc + item.quantity, 0));
        //Aquí es donde debería utilizar la API para actualizar el carrito del usuario
        //useFetch(endpoints.updateCart(...), "PUT", {products: cartProducts}, false);
        localStorage.setItem("cartData", JSON.stringify(cartData));
    }, [cartData]);

    return (
        <CartContext.Provider value={{ cartData, setCartData, cartSubtotal, setCartSubtotal, cartCount, setCartCount }}>
        {children}
        </CartContext.Provider>
    );
}