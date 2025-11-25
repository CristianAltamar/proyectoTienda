import { useContext } from "react";
import { CartContext } from "../../contexts/contextCart.jsx";
import { CartTable } from "./CartTable.jsx";
import { MobileTable } from "./MobileTable.jsx";

export const CartProducts = () => {
    const { cartProducts, setCartProducts } = useContext(CartContext);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            setCartProducts( prev => (prev.map( p => {
                if (p.productId === productId) {
                    return { ...p, quantity: parseInt(newQuantity) };
                }
                return p;
            })));
            return;
        }
        setCartProducts(prev => (prev.filter( p => p.productId !== productId )));
    }
    
    return (
        <>
            {cartProducts?.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    <CartTable 
                        cartProducts={cartProducts} 
                        handleQuantityChange={handleQuantityChange}
                    />
                    <MobileTable
                        cartProducts={cartProducts}
                        handleQuantityChange={handleQuantityChange}
                    />
                </>
            )}
        </>
    )
}