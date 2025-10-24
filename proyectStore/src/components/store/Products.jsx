import { CardProduct } from "./CardProduct";

export const Products = ({ products }) => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-full">
            {products.map((product) => (
                <CardProduct key={product.id} product={product} />
            ))}
        </div>
    );
};
