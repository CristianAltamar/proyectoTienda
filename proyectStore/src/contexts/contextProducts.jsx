import { createContext, useState, useEffect } from "react";
import { endpoints } from "../api/enpoints";
import { useFetch } from "../hooks/useFetch";
import { useFilters } from "../hooks/useFilters";
import { getUrlFilters } from "../utils/getFilters";
import { setUrlFilters } from "../utils/getFilters";


export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [isCharging, setIsCharging] = useState(false);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});

    const clearFilters = () => setFilters({})

    useEffect(() => {
        const urlFilters = getUrlFilters();
        setFilters(prev => ({...prev, ...urlFilters}))
    }, []);

    useEffect(() => {
        const currentLocation = window.location.pathname.split('/').pop();
        if (currentLocation === "products") setUrlFilters(filters);

        const fetchProducts = async () => {
            setIsCharging(true);
            let data;
            if (filters.category === "all" || !filters.category) {
                data = await useFetch(endpoints.getProducts());
            } else {
                data = await useFetch(endpoints.getProductsCategory(filters.category));
            }
            if (data) {
                const filteredProducts = useFilters(data, filters);
                setProducts(filteredProducts);
            }
            setIsCharging(false);
        }
        fetchProducts();
    }, [filters]);

    return (
        <ProductsContext.Provider value={{ products, setProducts, filters, setFilters, clearFilters, isCharging }}>
        {children}
        </ProductsContext.Provider>
    );
};