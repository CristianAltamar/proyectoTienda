import { validation } from "../utils/validation.js";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { ProfileContext } from "../contexts/contexProfile.jsx";

export const LogingPage = () => {
    const navigate = useNavigate()
    const { getProfileData } = useContext(ProfileContext)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("orderHistory")
            return;
        }
        navigate("/profile");
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const user = form[0].value;
        const password = form[1].value;
        
        const isValid = await validation(user, password);
        
        if (isValid) { 
            navigate("/");
            getProfileData()
        }
    }

    return (
        <div className="flex justify-center w-full">
            <div className="max-w-md mx-5 mt-10 p-8 bg-gray-950 rounded-2xl shadow-lg shadow-gray-400 text-[#4CE9D7]">
                <h1 className="pb-4 font-bold text-4xl">Iniciar Sesión</h1>
                <form onSubmit={(e) => onSubmit(e)} action="login" className="grid grid-cols-1 gap-4 my-8">
                    <label className="flex flex-col" htmlFor="user">
                        Usuario:
                        <input className="border-b border-b-gray-900 rounded-2xl py-1 px-2 placeholder:text-gray-500" type="text" placeholder="Usuario123" />
                    </label>
                    <label className="flex flex-col" htmlFor="password">
                        Contraseña:
                        <input className="border-b border-b-gray-900 rounded-2xl py-1 px-2 placeholder:text-gray-500" type="password" placeholder="********" />
                    </label>
                    <button className="bg-[#4CE9D7] text-black font-bold rounded-2xl py-2 px-4 hover:bg-white hover:text-[#0f9c8c] cursor-pointer" type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    )
}