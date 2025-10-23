export const Header = () => {
    return (
        <header className="w-full flex flex-col items-center p-4 bg-gray-600 relative">
            <div className="mb-4">
                <h1 className="flex flex-col items-center cursor-pointer">
                    <span className="text-2xl text-white leading-none">Tienda</span>
                    <span className="text-3xl leading-none font-bold text-[#4CE9D7]">Practica</span>
                </h1>
            </div>
            <nav className="mb-4">
                <ul className="flex gap-6 text-white">
                    <li className="leading-none hover:text-[#4CE9D7] cursor-pointer">Inicio</li>
                    <li className="leading-none hover:text-[#4CE9D7] cursor-pointer">Productos</li>
                    <li className="leading-none hover:text-[#4CE9D7] cursor-pointer">Sobre nosotros</li>
                    <li className="leading-none hover:text-[#4CE9D7] cursor-pointer">Contacto</li>
                </ul>
            </nav>
            <div className="absolute right-4 top-4">
                <button className="text-gray-300 hover:text-white hover:border-b-2 cursor-pointer">Iniciar Sesión</button> 
            </div>
        </header>
    )
}