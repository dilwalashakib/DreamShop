"use client"

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/actions/adminActions";

export default function CategoryRemoveButton({ id, publicId }) {
    const router = useRouter();

    const deleteHandler = async(id, publicId) => {
        const response = await deleteCategory({ id, publicId })
        if(response?.success) {
            toast.success(response?.success);
            router.refresh();  
        }     
        toast.error(response?.error);
    }

    return (
        <button 
            onClick={(e) => deleteHandler(id, publicId)} 
            className="bg-red-600 text-white rounded-lg hover:bg-red-800 text-lg px-1.5 py-1 cursor-pointer">
                remove
        </button>
    )
}
