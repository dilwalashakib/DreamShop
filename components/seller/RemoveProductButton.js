"use client"

import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { productDelete } from "@/actions/productActions";
import { toast } from "react-toastify";

export default function RemoveProductButton({ id, images }) {
    const router = useRouter();

    const productRemove = async() => {
        const response = await productDelete(id, images);
        if(response?.success) {
            toast.success(response.success);
            router.refresh();
        }
        toast.success(response?.error);
    }

    return (
        <button
            onClick={productRemove}
            title="Delete"
            className="text-red-500 hover:text-red-900 cursor-pointer">
            <MdDeleteForever />
        </button>
    )
}