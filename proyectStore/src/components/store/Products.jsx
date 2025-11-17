import { CardProduct } from "./CardProduct";
import { useContext } from "react"
import { CartContext } from "../../contexts/contextCart.jsx"

export const Products = ({ products }) => {
    const { cartProducts } = useContext(CartContext)

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-full p-4">
            {products.map((product) => (
                <CardProduct 
                    key={product.id} 
                    product={product} 
                    isInCart={cartProducts.some(cartProduct => cartProduct.title === product.title)} 
                    quantity={cartProducts.find(cartProduct => cartProduct.title === product.title)?.quantity || 0} 
                />
            ))}
        </div>
    );
};
