import { Hero } from "../components/home/Hero";
import { Products } from "../components/store/Products";
import { endpoints } from "../api/enpoints";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useFilters } from "../hooks/useFilters";
import { useContext } from "react";
import { ProductsContext } from "../contexts/contextProducts";


export const HomePage = () => {
    const [isCharging, setIsCharging] = useState(false);
    const { filterProducts } = useFilters();
    const { products, setProducts } = useContext(ProductsContext);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsCharging(true);
            const data = await useFetch(endpoints.getProducts());
            if (data) {
                const p = filterProducts({ products:data, home: true });
                setProducts(p);
            }
            setIsCharging(false);
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col items-center w-full max-w-4xl m-8 mx-auto">
            <Hero />
            <h2 className="text-2xl font-bold mb-4">Productos destacados</h2>
            {isCharging ? <p>Cargando productos...</p> : 
            <Products products={products} />}
        </div>
    )
}