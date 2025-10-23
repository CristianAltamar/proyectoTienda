import { CardProduct } from "./CardProduct";

export const Products = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <h2 className="col-span-full text-xl font-bold mb-4">Productos destacados</h2>
            {products.map((product) => (
                <CardProduct key={product.id} product={product} />
            ))}
        </div>
    );
};
