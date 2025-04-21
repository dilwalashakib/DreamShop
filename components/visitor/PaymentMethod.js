"use client"

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { stripePaymentCheckout } from "@/actions/customerActions";
import { toast } from "react-toastify";

const paymentArr = [
    {
        id: 1,
        name: "stripe",
        image: "/images/stripe.png"
    },
    {
        id: 2,
        name: "bkash",
        image: "/images/bkash.png"
    },
    {
        id: 3,
        name: "nogod",
        image: "/images/nagad.png"
    },
    {
        id: 4,
        name: "rocket",
        image: "/images/rocket.jpeg"
    }
]

export default function PaymentMethod({ orderId }) {
    const [payment, setPayment] = useState("stripe");

    let stripePromise = null;

    const getStripe = async() => {
        if (!stripePromise) {
            stripePromise = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
        }
        return stripePromise;
    };

    const stripePaymentHandler = async(e) => {
        try {
            const stripe = await getStripe();
            const response = await stripePaymentCheckout(orderId);
            
            const stripeError = await stripe?.redirectToCheckout({sessionId: response?.sessionId});
            
            if (stripeError) {
                toast.error("Stripe Error Found !");
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    return (
        <div className="w-full col-span-4 p-4 mb-3 rounded-lg">
            <div className="flex gap-3">
                {paymentArr?.map((item, i) => (
                    <div 
                        key={i}
                        onClick={(e) => setPayment(item.name)}
                        className={`${payment === item.name ? "bg-white mb-[-5px]" : "bg-slate-100"} p-1 cursor-pointer mb-2`}>
                        <img className="h-[20vh] p-2" src={item.image} />
                    </div>
                ))}
            </div>
                        
            <div className="bg-white p-4 text-black">
                {payment === "stripe" && (
                    <button onClick={stripePaymentHandler} className="p-4 bg-yellow-500 w-[50%] text-xl rounded-lg hover:bg-yellow-400 font-semibold duration-500 cursor-pointer">Pay Now</button>
                )}
                {payment === "bkash" && (
                    <h2>Bkash</h2>
                )}
                {payment === "nogod" && (
                    <h1>Nogod</h1>
                )}
                {payment === "rocket" && (
                    <h1>Rocket</h1>
                )}
            </div>
        </div>
    )
}