import { useState } from "react"
import { useContext } from "react"
import { ProductsContext } from "../../contexts/contextProducts"

export const Filters = () => {
    const [showFilters, setShowFilters] = useState(false)
    const { filters, setFilters, clearFilters } = useContext(ProductsContext)

    const onInputChange = (e) => {
        clearTimeout(window.searchTimeout)
        window.searchTimeout = setTimeout(() => {
            const value = e.target.value
            setFilters(prev => ({ 
                ...prev,
                ["name"]: value
            }))
        }, 300)
    }

    const onChange = (value, key) => {
        if (filters[key] == value) {
            setFilters(prev => ({
                ...prev,
                [key]:""
            }))
            return
        }
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const baseStyles = "bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 cursor-pointer "
    const actveStyles = "text-white px-4 py-2 rounded-2xl bg-blue-600 cursor-pointer"

    const Controls = (
        <div className="flex flex-col lg:flex-row lg:sticky lg:w-full top-0 left-0 gap-2 mb-8">
            <div className="relative w-full lg:w-4/12">
                <input type="text" placeholder="Buscar productos..." className="border p-2 rounded-2xl w-full" onChange={onInputChange} />
                <svg className="w-6 h-6 text-gray-600 fill-current absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" aria-hidden="true" focusable="false" role="img">
                    <use href={"/icons.svg#search-icon"} />
                </svg>
            </div>
            <button className={ filters["orderBy"] == "price-asc" ? actveStyles : baseStyles } onClick={() => onChange("price-asc", "orderBy" )}>
                Precio ascendente
            </button>
            <button className={ filters["orderBy"] == "price-desc" ? actveStyles : baseStyles } onClick={() =>  onChange("price-desc", "orderBy" )}>
                Precio descendente
            </button>
            <button className={ filters["orderBy"] == "A-Z" ? actveStyles : baseStyles } onClick={() =>  onChange("A-Z", "orderBy" )}>
                A-Z
            </button>
            <button className={ filters["orderBy"] == "Z-A" ? actveStyles : baseStyles } onClick={() =>  onChange("Z-A", "orderBy" )}>
                Z-A
            </button>
        </div>
    )

    return (
        <>
            <button
                className="lg:hidden absolute right-20 bottom-full -top-5 z-20 hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                aria-controls="mobile-filters"
            >
                <svg className="w-6 h-6 text-gray-800 fill-current relative" aria-hidden="true" focusable="false" role="img">
                    <use href={"/icons.svg#filter-icon"} />
                </svg>
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