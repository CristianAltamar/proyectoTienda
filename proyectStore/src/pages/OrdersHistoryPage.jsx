import { useState, useEffect } from "react";
import { OrderHistory } from "../components/profile/Orders.jsx";
import { useFetch } from "../hooks/useFetch.jsx";
import { endpoints } from "../api/enpoints.js";
import { NavProfile } from "../components/profile/NavProfile.jsx";

export const OrdersHistoryPage = () => {
    const [orders, setOrders] = useState([])
    const [isCharging, setIsCharging] = useState(false)

    useEffect(() => {
        const fetchCarts = async () => {
            setIsCharging(true)
            const token = localStorage.getItem("token")
            const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
            if (!user) {
                window.location.replace("/login")
                return;
            }
            
            let cartsAPI = await useFetch(endpoints.getCarts(), "GET")
            cartsAPI = cartsAPI.filter(c => c.userId === user.sub)
            const productsInfo = await useFetch(endpoints.getProducts(), "GET")
            cartsAPI = cartsAPI.map(c => {
                c.products = c.products.map(p => {
                    const pInfo = productsInfo.find(i => i.id === p.productId)
                    return {...p, ...pInfo}
                })
                return {...c, user: user.user}
            })

            let ordersHistory = localStorage.getItem("orderHistory")
            ordersHistory = ordersHistory ? JSON.parse(ordersHistory) : []

            setOrders([...cartsAPI, ...ordersHistory])
            setIsCharging(false)
        }
        fetchCarts()
    }, [])

    return (
        <>
            {isCharging?
                <p>Cargando...</p>:
                <div className="relative pt-10 flex justify-center">
                    <NavProfile />
                    <OrderHistory orders={orders} />
                </div>
            }
        </>
    )
}