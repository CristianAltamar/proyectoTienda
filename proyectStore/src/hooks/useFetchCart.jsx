import { useFetch } from "../hooks/useFetch.jsx";
import { endpoints } from "../api/enpoints.js";


export const useFetchCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        const id = JSON.parse(atob(token.split(".")[1])).sub;
        const data = await useFetch(endpoints.getCarts(id), "GET", null, false);
        const products = data?.products || [];

        const updatedProducts = await Promise.all(products.map(async p => {
            const productData = await useFetch(endpoints.getProducts(p.productId), "GET", null, false);
            p = { ...p, "title": productData.title, "price": productData.price, "image": productData.image,"subtotal": productData.price * p.quantity };
            return p;
        }));
        return updatedProducts;
    }
}