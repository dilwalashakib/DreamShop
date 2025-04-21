"use client"

import { useRouter } from "next/navigation";
import { sellerInfoChange } from "@/actions/sellerActions";

export default function SuccessButton({ id }) {
    const router = useRouter();

    const clickHandler = async(e) => {
        const response = await sellerInfoChange({ id });

        if(response?.success) {
            router.push("/seller/dashboard");
            router.refresh();
        }
        
    }
    return (
        <button
            className="py-2 px-5 bg-green-700 hover:bg-green-500 text-xl"
            onClick={clickHandler}
            href="/seller/profile">
                Back To Dashboard
        </button>
    )
}