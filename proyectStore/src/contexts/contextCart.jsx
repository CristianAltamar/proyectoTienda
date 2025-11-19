import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData , setCartData] = useState({});
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const token = localStorage.getItem("token");
    let id;

    useEffect(() => {
        if (token) {
            id = JSON.parse(atob(token.split(".")[1])).sub;
            console.log("J",id)
            let data = localStorage.getItem("cartData");
            data = data ? JSON.parse(data) : null;
            console.log(data)
            if (!data) {
                setCartData({ id:7, userId: id, date: new Date(), products:[], __v: 0})
                return;
            } 
            setCartData(data);
        }
    }, []);

    useEffect(() => {
        if (token) {
            console.log(cartCount.userId)
            setCartSubtotal(cartData?.products?.reduce((acc, item) => acc + item.quantity * item.price, 0));
            setCartCount(cartData?.products?.reduce((acc, item) => acc + item.quantity, 0));
            //Aquí es donde debería utilizar la API para actualizar el carrito del usuario
            //useFetch(endpoints.updateCart(...), "PUT", {products: cartProducts}, false);
            localStorage.setItem("cartData", JSON.stringify(cartData));
        }
    }, [cartData]);

    return (
        <CartContext.Provider value={{ cartData, setCartData, cartSubtotal, setCartSubtotal, cartCount, setCartCount }}>
        {children}
        </CartContext.Provider>
    );
}