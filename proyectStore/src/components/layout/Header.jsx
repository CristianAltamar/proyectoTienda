import { Navbar } from "./Nav"
export const Header = () => {
    const url = window.location.pathname.split('/').pop();
    console.log(url);
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
                <a 
                href="/login"
                className="text-gray-300 hover:text-white hover:border-b-2 cursor-pointer">
                    Iniciar Sesión
                </a> 
            </div>}
        </header>
    )
}