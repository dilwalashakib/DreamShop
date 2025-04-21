'use client'

import { useState } from "react";
import { toast } from "react-toastify";
import { sellerStatusUpdate } from "@/actions/adminActions";
import { useRouter } from "next/navigation";

export default function StatusButton({ id, sellerStatus }) {
    const router = useRouter();
    const [status, setStatus] = useState(sellerStatus);

    const statusAction = async() => {
        if(status) {
            const response = await sellerStatusUpdate({ id, status });
            toast.success(response?.success);
            router.refresh();
            toast.error(response?.error);
        } else {
            toast.error("Please Select One Status")
        }
    }

    return (
        <div>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-3 rounded-lg text-lg bg-gray-700 w-full mt-5">
                <option value="active">active</option>
                <option value="pending">pending</option>
                <option value="deactive">deactive</option>
            </select>
            <button onClick={statusAction} className="py-2 px-6 bg-green-600 hover:bg-green-800 text-xl mt-3 rounded-xl w-full">Submit</button>
        </div>
    )
}