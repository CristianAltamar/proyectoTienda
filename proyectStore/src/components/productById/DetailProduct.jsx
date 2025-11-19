import { useContext } from "react";
import { CartContext } from "../../contexts/contextCart.jsx";
import { Path } from "./Path.jsx";

export const DetailProduct = ({ product }) => {
    const { cartData, setCartData } = useContext(CartContext)
    const isInCartProduct = cartData?.products?.some(p => p.productId === product.id)
    const quantity = isInCartProduct ? cartData?.products?.find(p => p.productId === product.id).quantity : 0;

    const onAddProduct = () => {
        if (isInCartProduct) {
            setCartData( prev => ({ ...prev, products: prev.products.map( p => {
                if (p.productId === product.id) {
                    return { ...p, quantity: p.quantity + 1 };
                }
                return p;
            })}))
            return;
        }
        const p = {
            productId: product.id,
            quantity: 1,
            price: product.price,
            image: product.image,
            subtotal: product.price,
            title: product.title
        }
        setCartData(prev =>  ({...prev, products: [...prev.products, p]}))
    }
    return (
        <div className="w-full flex flex-col items-center">
            <Path category={product.category} productName={product.title} />
            <div className="grid grid-cols-1 w-full gap-6 m-6 p-6 max-w-5xl sm:grid-cols-2">
                <img src={`${product.image}`} alt={`${product.title}`} />
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-3xl">{product.title}</h1>
                    <span className="text-2xl font-medium text-gray-800">$ {product.price?.toFixed(2)}</span>
                    <p>{product.description}</p>
                    <button onClick={onAddProduct} className="bg-gray-950 px-1.5 py-2 rounded-2xl text-[#4CE9D7] mt-4 cursor-pointer">Agregar al carrito </button>
                    <details>
                        <summary>Envío</summary>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </details>
                </div>
            </div>
        </div>
    )
}