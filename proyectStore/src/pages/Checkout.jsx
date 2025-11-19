import { BillingAndShipping } from "../components/checkout/BillingAndShipping.jsx";
import { OrderSummary } from "../components/checkout/OrderSummary.jsx";

export const Checkout = () => {
    return (
        <div className="flex gap-10 m-8 justify-center">
            <BillingAndShipping />
            <OrderSummary />
        </div>
    )
}