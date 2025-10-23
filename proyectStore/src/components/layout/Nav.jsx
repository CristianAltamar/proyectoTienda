

export const Navbar = () => {
    // Función mejorada que maneja rutas anidadas
    const isActive = (path) => {
        return window.location.pathname.startsWith(path);
    }

    // Función para rutas exactas
    const isExactActive = (path) => {
        return window.location.pathname === path;
    }

    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
    const activeClasses = "text-[#4CE9D7] font-semibold border-b-2 border-[#4CE9D7]"
    const inactiveClasses = "text-white  hover:text-[#4CE9D7]"

    return (
        <nav className="flex justify-center mb-2">
            <a
            href="/"
            className={`${baseClasses} ${
                isExactActive('/') ? activeClasses : inactiveClasses
            }`}
            >
                <span>Inicio</span>
            </a>

            <a
            href="/products"
            className={`${baseClasses} ${
                isActive('/products') ? activeClasses : inactiveClasses
            }`}
            >
                <span>Productos</span>
            </a>

            <a
            href="/about"
            className={`${baseClasses} ${
                isActive('/about') ? activeClasses : inactiveClasses
            }`}
            >
                <span>Sobre nosotros</span>
            </a>

            <a
            href="/contact"
            className={`${baseClasses} ${
                isActive('/contact') ? activeClasses : inactiveClasses
            }`}
            >
                <span>Contacto</span>
            </a>
        </nav>
    )
}