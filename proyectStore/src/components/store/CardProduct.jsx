import { useContext } from "react"
import { CartContext } from "../../contexts/contextCart.jsx"

export const CardProduct = ({ product }) => {
    const { cartProducts, setCartProducts } = useContext(CartContext)
    const baseUrl = "/product/"
    const isInCartProduct = cartProducts?.some(p => p.productId === product.id);
    const quantity = isInCartProduct ? cartProducts?.find(p => p.productId === product.id).quantity : 0;
    
    const onClickCard = e => {
        if (e.target.tagName !== "BUTTON") {
            window.location.replace(baseUrl + product.id)
        }
    }
    const onChangeQuantity = (newQuantity) => {
        if (newQuantity > 0) {
            setCartProducts( prev => ( prev.map( p => {
                if (p.productId === product.id) {
                    return { ...p, quantity: newQuantity };
                }
                return p;
            })))
            return;
        }
        setCartProducts( prev => prev.filter( p => p.productId !== product.id ))
    }

    const onAddProduct = () => {
        const p = {
            productId: product.id,
            quantity: 1,
            price: product.price,
            image: product.image,
            subtotal: product.price,
            title: product.title
        }
        setCartProducts(prev =>  ([...prev, p]))
    }

    return (
        <div onClick={(e) => onClickCard(e)} className="border p-4 rounded shadow-md flex flex-col items-center justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img src={product.image} alt={product.title} className="w-full h-auto aspect-square" />
            <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
                <p className="text-gray-700 mb-4 text-center">${product.price}</p>
                { isInCartProduct ?  
                    <div className="flex justify-center">
                        <button onClick={() => onChangeQuantity(quantity - 1)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-800 cursor-pointer">-</button>
                        <span className="px-2 py-1 bg-gray-200 rounded ">{quantity}</span>
                        <button onClick={() => onChangeQuantity(quantity + 1)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-800 cursor-pointer">+</button>
                    </div> :
                    <button onClick={() => onAddProduct()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                        Agregar al carrito
                    </button>
                }
            </div>
        </div>
    )
}