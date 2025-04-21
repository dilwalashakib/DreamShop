"use client"

import { createPaymentRequest } from "@/actions/sellerActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PaymentRequestButton({ sellerId, balance }) {
    const router = useRouter();

    const paymentRequest = async(formData) => {
        const amount = formData.get("amount");
        if(amount && sellerId && (balance >= 50)) {
            const response = await createPaymentRequest({ sellerId, amount });
            if(response?.success) {
                toast.success(response.success);
                router.refresh();
            }
            toast.error(response?.error);
        } else {
            toast.error("You have no balance for Withdraw! Minimum $50 need !");
        }
    }

    return (
        <form action={paymentRequest} className="flex gap-2 items-center text-xl">
            <input className="py-2 px-3 rounded-md outline-hidden border-none text-black w-full" type='number' name="amount" placeholder="your amount..." />

            <button className="py-2 px-3 rounded-md bg-green-600 hover:bg-green-700">Submit</button>
        </form>
    )
}