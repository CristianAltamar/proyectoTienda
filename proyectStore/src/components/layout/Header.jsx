import { Navbar } from "./Nav"
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../contexts/contextCart.jsx";

export const Header = () => {
    const [userName, setUserName] = useState(false);
    const url = window.location.pathname.split('/').pop();
    const { cartSubtotal, cartCount } = useContext(CartContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1]));
            setUserName(user.user);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cartData");
        window.location.replace("/login");
    }


    return (
        <header className="w-full flex flex-col items-center p-4 bg-gray-600 relative">
            <div className="mb-4">
                <a href="/">
                    <h1 className="flex flex-col items-center cursor-pointer">
                        <span className="text-2xl text-white leading-none">Tienda</span>
                        <span className="text-3xl leading-none font-bold text-[#4CE9D7]">Practica</span>
                    </h1>
                </a>
            </div>
            { url !== "login" && url !== "create-account" && 
            <Navbar/>}
            { url !== "login" && url !== "create-account" && 
            <div className="absolute right-4 top-4">
                {userName ?
                    <div className="flex">
                        <a href="/profile" className="text-white hover:underline">Hola, {userName}</a>
                        <span onClick={logout} title="Logout" className="text-white cursor-pointer ml-2">
                            <svg className="w-6 h-6 text-white fill-current relative" aria-hidden="true" focusable="false" role="img">
                                <use href={"/icons.svg#logout-icon"} />
                            </svg>
                        </span>
                    </div>
                    :
                    <a className="text-white hover:underline" href="/login">Iniciar Sesión</a>
                }
            </div>}
            { url !== "login" && url !== "create-account" && 
            <div className="absolute flex right-8 bottom-8 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => window.location.replace("/cart")}>
                <span className="ml-1 text-white hidden md:block">$ {cartSubtotal?.toFixed(2) || "0.00"}</span>
                <svg className="w-6 h-6 text-white fill-current relative" aria-hidden="true" focusable="false" role="img">
                    <use href={"/icons.svg#icon-cart"} />
                </svg>
                <span className="absolute -top-2 -right-2 text-xs bg-gray-600 text-white ">{cartCount || 0}</span>
            </div>}
        </header>
    )
}