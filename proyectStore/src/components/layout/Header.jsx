import { Navbar } from "./Nav"
import { useContext } from "react";
import { CartContext } from "../../contexts/contextCart.jsx";
import { ProfileContext } from "../../contexts/contexProfile.jsx";
import { Link } from "react-router";

export const Header = () => {
    const url = window.location.pathname.split('/').pop();
    const { cartSubtotal, cartCount } = useContext(CartContext);
    const { profileData } = useContext(ProfileContext)

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cartData");
        localStorage.removeItem("orderHistory")
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
                {profileData?.username ?
                    <div className="flex">
                        <Link to="/profile" className="text-white hover:underline">Hola, {profileData.username}</Link>
                        <span onClick={logout} title="Logout" className="text-white cursor-pointer ml-2">
                            <svg className="w-6 h-6 text-white fill-current relative" aria-hidden="true" focusable="false" role="img">
                                <use href={"/icons.svg#logout-icon"} />
                            </svg>
                        </span>
                    </div>
                    :
                    <Link className="text-white hover:underline" to="/login">Iniciar Sesión</Link>
                }
            </div>}
            { url !== "login" && url !== "create-account" && 
            <Link to="/cart" className="absolute flex right-8 bottom-8 cursor-pointer hover:scale-105 transition-transform duration-200" >
                <span className="ml-1 text-white hidden md:block">$ {cartSubtotal?.toFixed(2) || "0.00"}</span>
                <svg className="w-6 h-6 text-white fill-current relative" aria-hidden="true" focusable="false" role="img">
                    <use href={"/icons.svg#icon-cart"} />
                </svg>
                <span className="absolute -top-2 -right-2 text-xs bg-gray-600 text-white ">{cartCount || 0}</span>
            </Link>}
        </header>
    )
}