export const LogingPage = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-950 rounded-2xl shadow-lg shadow-gray-400 text-[#4CE9D7]">
            <h1 className="pb-4 font-bold text-4xl">Iniciar Sesión</h1>
            <form action="login" className="grid grid-cols-1 gap-4 my-8">
                <label className="flex flex-col" htmlFor="user">
                    Correo electrónico:
                    <input className="border-b border-b-gray-900 rounded-2xl py-1 px-2 placeholder:text-gray-500" type="text" placeholder="Usuario123" />
                </label>
                <label className="flex flex-col" htmlFor="password">
                    Contraseña:
                    <input className="border-b border-b-gray-900 rounded-2xl py-1 px-2 placeholder:text-gray-500" type="password" placeholder="********" />
                </label>
                <a href="#" className="text-sm text-gray-500 hover:underline">Olvidé mi contraseña</a>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <button className="bg-white text-[#0f9c8c] font-bold rounded-2xl py-2 px-4 hover:bg-[#4CE9D7] hover:text-black cursor-pointer">Crear</button>
                    <button className="bg-[#4CE9D7] text-black font-bold rounded-2xl py-2 px-4 hover:bg-white hover:text-[#0f9c8c] cursor-pointer" type="submit">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    )
}