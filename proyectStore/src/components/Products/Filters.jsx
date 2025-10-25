import { Lens } from "./Lens"
import { FilterIcon } from "./FilterIcon"
import { useState } from "react"
import { setUrlFilters } from "../../utils/getFilters"

export const Filters = () => {
    const [showFilters, setShowFilters] = useState(false)

    const onInputChange = (e) => {
        clearTimeout(window.searchTimeout)
        window.searchTimeout = setTimeout(() => {
            const value = e.target.value
            setUrlFilters({ search: value })
        }, 300)
    }

    const Controls = (
        <div className="flex flex-col lg:flex-row lg:sticky lg:w-full top-0 left-0 gap-2 mb-8">
            <div className="relative w-full lg:w-4/12">
                <input type="text" placeholder="Buscar productos..." className="border p-2 rounded-2xl w-full" onChange={onInputChange} />
                <Lens />
            </div>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 cursor-pointer" onClick={() => setUrlFilters({ orderBy: "price-asc" })}>
                Precio ascendente
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 cursor-pointer" onClick={() => setUrlFilters({ orderBy: "price-desc" })}>
                Precio descendente
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 cursor-pointer" onClick={() => setUrlFilters({ orderBy: "A-Z" })}>
                A-Z
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 cursor-pointer" onClick={() => setUrlFilters({ orderBy: "Z-A" })}>
                Z-A
            </button>
        </div>
    )

    return (
        <>
            <button
                className="lg:hidden px-4 absolute right-6 bottom-full mb-3 mr-2 z-50 hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                aria-controls="mobile-filters"
            >
                <FilterIcon />
            </button>

            <div className="hidden lg:flex flex-col gap-4 ">
                {Controls}
            </div>

            {showFilters && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setShowFilters(false)}
                        aria-hidden="true"
                    />

                    <aside
                        id="mobile-filters"
                        className="fixed top-0 right-0 z-50 w-80 max-w-full h-full bg-white p-4 shadow-lg transform transition-transform lg:hidden"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Filtros</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-600 hover:text-gray-900 cursor-pointer"
                                aria-label="Cerrar filtros"
                            >
                                ✕
                            </button>
                        </div>
                        {Controls}
                    </aside>
                </>
            )}
        </>
    )
}