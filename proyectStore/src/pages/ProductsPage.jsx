import { Products } from "../components/store/Products";
import { endpoints } from "../api/enpoints";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useFilters } from "../hooks/useFilters";
import { useContext } from "react";
import { ProductsContext } from "../contexts/contextProducts";
import { Sidebar } from "../components/Products/Sidebar";
import { Filters } from "../components/Products/Filters";

export const ProductsPage = () => {
    const [isCharging, setIsCharging] = useState(false);
    const { filterProducts } = useFilters();
    const { products, setProducts } = useContext(ProductsContext);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsCharging(true);
            const data = await useFetch(endpoints.getProducts());
            if (data) {
                const p = filterProducts({ products: data });
                setProducts(p);
            }
            setIsCharging(false);
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex w-full max-w-6xl m-8 gap-8 relative">
            <Sidebar />
            <div className="flex-1">
                <Filters />
                {isCharging ? <p>Cargando productos...</p> :
                <Products products={products} />}
            </div>
        </div>
    )
}