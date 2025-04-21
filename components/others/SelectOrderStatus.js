"use client"

import { useState } from "react"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { changeDeliveryStatus } from "@/actions/orderActions";

export default function SelectOrderStatus({ id, deliveryStatus, role }) {
    const router = useRouter();
    const [status, setStatus] = useState(deliveryStatus);

    const statusChange = async(e) => {
        setStatus(e.target.value);
        const response = await changeDeliveryStatus({
            id,
            status: e.target.value,
            role
        });
        
        if(response?.success) {
            toast.success(response.success);
            router.refresh();
        }
        toast.error(response?.error);
    }

    return (
        <select value={status} onChange={statusChange} className='bg-slate-900 py-1 px-5 rounded-md'>
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            {role === "admin" && <option value="placed">placed</option>}
            <option value="cancelled">cancelled</option>
        </select>
    )
}