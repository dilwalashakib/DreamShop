"use client"

import { useRouter } from "next/navigation";
import { orderIdCookiesRemove } from "@/actions/customerActions";

export default function ThankYouButton() {
    const router = useRouter();

    const handler = async(e) => {
        const response = await orderIdCookiesRemove();
        if(response?.success) {
            router.push("/customer/dashboard");
        }
    }

    return (
        <button onClick={handler} className="py-2 px-4 bg-green-600 hover:bg-green-500 rounded-md text-xl">
            Back To Dashboard
        </button>
    )
}