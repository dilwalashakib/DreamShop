"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function OrderStatusSelect() {
    const router = useRouter();
    const [status, setStatus] = useState("");

    const statusChange = async(e) => {
        if(e.target.value) {
            setStatus(e.target.value);
            router.push(`http://localhost:3000/customer/orders?status=${e.target.value}`);
        } else{
            router.push(`http://localhost:3000/customer/orders`);
        }
    }

    return (
        <select
            className="py-3 px-4 rounded-lg outline-hidden text-lg bg-gray-100"
            value={status} 
            onChange={statusChange}>
            <option value="">-- order status --</option>
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
        </select>
    )
}