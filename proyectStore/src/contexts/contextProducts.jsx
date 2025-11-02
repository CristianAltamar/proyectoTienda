import { createContext, useState, useEffect } from "react";
import { endpoints } from "../api/enpoints";
import { useFetch } from "../hooks/useFetch";
import { useFilters } from "../hooks/useFilters";
import { getUrlFilters } from "../utils/getFilters";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({category:"all", orderBy:"", name:""});

    const clearFilters = () => setFilters({category:"all", orderBy:"", name:""})

    return (
        <ProductsContext.Provider value={{ products, setProducts, filters, setFilters, clearFilters }}>
        {children}
        </ProductsContext.Provider>
    );
};