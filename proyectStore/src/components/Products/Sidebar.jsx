import { useState, useRef, useEffect, useContext } from "react"
import { setUrlFilters } from "../../utils/getFilters"
import { ProductsContext } from "../../contexts/contextProducts"

const categories = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
]

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const panelRef = useRef(null)
    const { filters, setFilters, clearFilters } = useContext(ProductsContext)

    // close on ESC
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        if (isOpen) document.addEventListener("keydown", onKey)
        else document.removeEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
            setTimeout(() => panelRef.current?.querySelector("button, [tabindex], a, input")?.focus(), 0)
        } else {
            document.body.style.overflow = ""
        }
        return () => (document.body.style.overflow = "")
    }, [isOpen])

    const onClickCategory = (category) => {
        if (filters["category"] === category) {
            setFilters(prev => ({
                ...prev,
                ["category"]: "all"
            }))
            return
        }
        setFilters(prev => ({
            ...prev,
            ["category"]: category
        }))
    }

    const baseStyles = "hover:text-[#4CE9D7] cursor-pointer"
    const activeStyles = "text-[#4CE9D7] cursor-pointer"

    return (
        <>
            <button
                className="lg:hidden absolute bottom-full right-0 z-20 pr-2 pb-3 cursor-pointer hover:scale-105 transition-transform duration-200"
                title="Categorías"
                onClick={() => setIsOpen(true)}
            >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <aside
                className={`
                    hidden lg:block top-0 left-0 z-10
                    h-96 w-48 border-r-2 p-4 bg-white
                    lg:sticky lg:top-5
                `}
            >
                <h2 className="font-bold text-lg">Categorías</h2>
                <ul className="mt-4 space-y-2">
                    {categories.map((category) => (
                        <li key={category} 
                        className={ filters["category"] == category ? activeStyles : baseStyles }
                        onClick={() => onClickCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    role="dialog"
                    aria-modal="true"
                >

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />

                    <div
                        ref={panelRef}
                        className="relative w-80 max-w-full h-full bg-white shadow-xl p-4 transform translate-x-0 transition-transform duration-200"
                        style={{ maxWidth: "18rem" }}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-lg">Categorías</h2>
                            <button
                                aria-label="Cerrar"
                                className="p-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <ul className="mt-4 space-y-2">
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    className={ filters["category"] == category ? activeStyles : baseStyles }
                                    onClick={() =>{ setIsOpen(false); onClickCategory(category)}}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}