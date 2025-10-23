import { Hero } from "../components/home/Hero";
import { Products } from "../components/store/Products";
import { endpoints } from "../api/enpoints";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";


export const Home = () => {
    const [products, setProducts] = useState([]);
    const [isCharging, setIsCharging] = useState(false);
    
    useEffect(() => {
        const fetchProducts = async () => {
            setIsCharging(true);
            const products = await useFetch(endpoints.getProducts());
            if (products) {
                setProducts(products.slice(0, 6));
            }
            setIsCharging(false);
        };
        fetchProducts();
    }, []);

    return (
        <>
            <Hero />
            {isCharging ? <p>Cargando productos...</p> : <Products products={products} />}
        </>
    )
}