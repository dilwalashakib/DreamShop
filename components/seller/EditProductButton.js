'use client';

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { productUpdate } from "@/actions/productActions";

export default function EditProductButton({ images, productId }) {
    const router = useRouter();
    const [files, setFiles] = useState({});
    const [imageUrls, setImageUrls] = useState(images);
    const [state, formAction, isPending] = useActionState(updateAction, null);

    async function updateAction(prevState, formData) {
        const data = Object.fromEntries(formData);     
        const response = await productUpdate({
            productId,
            data,
            files,
            imageUrls
        });
        if(response?.success) {
            toast.success(response?.success);
            router.push("/seller/all-product");
        }
        toast.error(response?.error);
    }

    const changeImage = async(file, index) => {
        files[index] = file;
        setFiles({ ...files });

        imageUrls[index].url = URL.createObjectURL(file);
        setImageUrls([...imageUrls]);
    }
    
    return (
        <div>
            <div className="sm:flex gap-1.5 w-full gap-1 mt-2">
                { images?.map((item, i) => (
                    <div key={i} className="sm:h-40 sm:w-40 relative mb-2">
                        <label htmlFor={i}>
                            <img src={item.url} className="h-full w-full object-cover cursor-pointer rounded-lg" />
                        </label>
                        <input
                            onChange={(e) => changeImage(e.target.files[0], i)}
                            type="file"
                            hidden 
                            id={i} 
                        />
                    </div>
                ))}
            </div>
            <button disabled={isPending} formAction={formAction} className={`${isPending ? "bg-amber-900 cursor-progress" : "bg-amber-600 cursor-pointer hover:bg-amber-700 duration-500"} mt-2 text-white w-full py-2 px-4 rounded-lg text-2xl outline-hidden`}>
                { isPending ? "Loading..." : "Update Product" }
            </button>
        </div>
    )
}