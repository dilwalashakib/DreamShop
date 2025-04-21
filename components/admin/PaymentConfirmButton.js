"use client"

import { useRouter } from "next/navigation";
import { paymentTransfer } from "@/actions/adminActions";
import { toast } from "react-toastify";

export default function PaymentConfirmButton({ id }) {
    const router = useRouter();

    const submitPayment = async() => {
        const response = await paymentTransfer(id);
        if(response?.success) {
            toast.success(response.success);
            router.refresh();
        }
        toast.error(response?.error);
    }

    return (
        <button onClick={submitPayment} className="p-1 px-2 hover:bg-green-700 bg-green-600 rounded-sm">confirm</button>
    )
}