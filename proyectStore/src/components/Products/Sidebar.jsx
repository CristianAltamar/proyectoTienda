import { useState } from "react"

const categories = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing"
]

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button 
                className="lg:hidden absolute top-0 right-0 z-20 pr-2"
                title="Categorías"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            <aside className={`
                fixed lg:static top-0 left-0 z-10
                h-full lg:h-96 
                w-64 lg:w-48 
                border-r-2 p-4 
                bg-white
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0
                transition-transform duration-200 ease-in-out
                lg:sticky lg:top-5
            `}>
                <h2 className="font-bold text-lg">Categorías</h2>
                <ul className="mt-4 space-y-2">
                    {categories.map(category => (
                        <li key={category} className="hover:text-[#4CE9D7] cursor-pointer">{category}</li>
                    ))}
                </ul>
            </aside>
        </>
    )
}