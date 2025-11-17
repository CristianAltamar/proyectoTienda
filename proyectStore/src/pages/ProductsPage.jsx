import { Products } from "../components/store/Products";
import { useContext } from "react";
import { ProductsContext } from "../contexts/contextProducts";
import { Sidebar } from "../components/Products/Sidebar";
import { Filters } from "../components/Products/Filters";


export const ProductsPage = () => {
    const { products, isCharging } = useContext(ProductsContext);

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