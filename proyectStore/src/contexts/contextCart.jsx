import { createContext, useState, useEffect, useRef } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartProducts , setCartProducts] = useState([]);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        let data = localStorage.getItem("cartData");
        data = data ? JSON.parse(data) : null
        if (data) setCartProducts(data)
    }, []);

    useEffect(() => {
        setCartSubtotal(cartProducts?.reduce((acc, item) => acc + item.quantity * item.price, 0));
        setCartCount(cartProducts?.reduce((acc, item) => acc + item.quantity, 0));
        //Aquí es donde debería utilizar la API para actualizar el carrito del usuario
        //useFetch(endpoints.updateCart(...), "PUT", {products: cartProducts}, false);
        localStorage.setItem("cartData", JSON.stringify(cartProducts));
    }, [cartProducts]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, cartSubtotal, setCartSubtotal, cartCount, setCartCount }}>
        {children}
        </CartContext.Provider>
    );
}