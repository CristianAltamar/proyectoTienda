import { Link } from "react-router"

export const NotFound = () => {
    return (
        <div className="flex flex-1 min-h-dvh items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">404</h1>
                <p className="text-lg text-gray-700 mb-6">El recurso que buscas no se encuentra.</p>

                <Link
                to="/"
                className="px-4 py-2 bg-teal-400 text-slate-900 font-semibold rounded-lg hover:bg-teal-300 transition"
                >
                Volver al inicio
                </Link>
            </div>
        </div>
    )
}