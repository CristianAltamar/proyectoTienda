import { useState, useContext } from "react";
import { NavLink } from "react-router";
import { ProductsContext } from "../../contexts/contextProducts";

export const Navbar = () => {
    const [showFilters, setShowFilters] = useState(false)
    const { setFilters } = useContext(ProductsContext)

    const onProducts = () => setFilters({})

    const activeClasses = "px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 text-[#4CE9D7] font-semibold md:border-b-2 md:border-[#4CE9D7]"
    const inactiveClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 text-gray-800 md:text-white hover:text-[#4CE9D7]"

    const navItems = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? activeClasses : inactiveClasses}
            >
                Inicio
            </NavLink>

            <NavLink
                onClick={() => onProducts()}
                to="/products"
                className={({ isActive }) => isActive ? activeClasses : inactiveClasses}
            >
                Productos
            </NavLink>

            <NavLink
                to="/about"
                className={({ isActive }) => isActive ? activeClasses : inactiveClasses}
            >
                Sobre nosotros
            </NavLink>

            <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? activeClasses : inactiveClasses}
            >
                Contacto
            </NavLink>
        </>
    )

    return (
        <>
            <button
                className="md:hidden absolute left-10 bottom-full top-10 z-20 hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                aria-controls="mobile-filters"
            >
                <svg className="w-6 h-6 text-white fill-current" aria-hidden="true" focusable="false" role="img">
                    <use href={"/icons.svg#sidebar-icon"} />
                </svg>
            </button>

            <nav className="hidden md:flex justify-center mb-2">
                {navItems}
            </nav>

            {showFilters && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setShowFilters(false)}
                        aria-hidden="true"
                    />

                    <aside
                        id="mobile-filters"
                        className="fixed top-0 left-0 z-50 w-80 max-w-full h-full bg-white p-4 shadow-lg transform transition-transform md:hidden"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Menú de navegación</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-600 hover:text-gray-900 cursor-pointer"
                                aria-label="Cerrar filtros"
                            >
                                ✕
                            </button>
                        </div>
                        {navItems}
                    </aside>
                </>
            )}
        </>
    )
}