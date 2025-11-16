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
    const { products, setProducts, filters } = useContext(ProductsContext);

    useEffect(() => {
        console.log(filters)
        const fetchProducts = async () => {
            setIsCharging(true);
            const data = await useFetch(endpoints.getProducts());
            if (data) {
                const p = filterProducts({ products: data, ...filters });
                setProducts(p);
            }
            setIsCharging(false);
        };
        fetchProducts();

    }, [filters]);

    return (
        <div className="flex w-full justify-center max-w-6xl my-8 mx-auto gap-8 relative">
            <Sidebar />
            <div className="w-full">
                <Filters />
                {isCharging ? <p>Cargando productos...</p> :
                <Products products={products} />}
            </div>
        </div>
    )
}