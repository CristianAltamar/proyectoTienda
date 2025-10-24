import { createContext, useState, useEffect } from "react";
import { endpoints } from "../api/enpoints";
import { useFetch } from "../hooks/useFetch";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
        {children}
        </ProductsContext.Provider>
    );
};