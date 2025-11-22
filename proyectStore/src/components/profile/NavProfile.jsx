import { NavLink } from "react-router"

export const NavProfile = () => {
    return(
        <nav className="flex gap-4 mx-8 my-4 absolute top-0 left-0">
            <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? "text-blue-500 hover:text-blue-600 hover:underline" : "text-gray-400"}
            >
                Perfil
            </NavLink>
            <NavLink
            to="/orders-history"
            className={({ isActive }) => isActive ? "text-blue-500 hover:text-blue-600 hover:underline" : "text-gray-400 hover:text-gray-500 hover:underline"}
            >
                Historial de ordenes
            </NavLink>
        </nav>
    )
}