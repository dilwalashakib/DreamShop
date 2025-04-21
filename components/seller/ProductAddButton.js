'use client';

import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { BsImages } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useState, useActionState } from "react";
import { addProductValidator } from "@/utils/validator";
import { addNewProduct } from "@/actions/productActions";

export default function ProductAddButton({sellerId, shopName}) {
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [state, formAction, isPending] = useActionState(myAction, null);

    async function myAction(prevState, formData) {
        const { isValid, value, error } = addProductValidator(formData);

        if(isValid) {
            const response = await addNewProduct({
                sellerId,
                ...value,
                shopName: shopName || 'Dilwala Shop',
                files
            });

            if(response?.success) {
                toast.success(response.success);
                router.push('/seller/all-product');
            }
            toast.error(response?.error);
        } else {
            toast.error(error?.name || error?.category || error?.price || error?.stock || error?.brand || error?.discount || error?.description);
        }
    }

    const imageHandler = (e) => {
        const urls = [];
        const allFiles = e.target.files;
        const countFile = files?.length + allFiles?.length;
        if(countFile <= 4) {
            setFiles([...files, ...allFiles]);

            for(let i = 0; i < allFiles.length; i++) {
                urls.push(URL.createObjectURL(allFiles[i]));
            }
            setImages([...images, ...urls]);
        } else {
            toast.error(`You can add only ${4 - files.length} image !`);
        }
    }

    const changeImage = (file, index) => {
        files[index] = file;
        images[index] = URL.createObjectURL(file);
        setFiles([...files]);
        setImages([...images])
    }

    const removeImg = (index) => {
        const file = files.filter((f, i) => i !== index);
        const img = images.filter((f, i) => i !== index);
        setFiles([...file]);
        setImages([...img]);
    }

    return (
        <div>
            <div className="sm:flex gap-1.5 w-full gap-1 mt-2">
                {images?.map((item, i) => (
                    <div key={i} className="sm:h-40 sm:w-40 relative mb-2 border-2 border-gray-500 rounded-xl">
                        <label htmlFor={i}>
                            <img src={item} className="h-full w-full object-cover cursor-pointer rounded-lg" />
                        </label>
                        <input 
                            onChange={(e) => changeImage(e.target.files[0], i)}
                            type="file" 
                            hidden 
                            id={i} 
                        />
                        <span onClick={(e) => removeImg(i)} className="absolute top-1 right-1 cursor-pointer bg-slate-950 p-2 rounded-md text-xl hover:text-red-700">
                            <ImCross />
                        </span>
                    </div>
                ))}

                {files?.length < 4 && <><label htmlFor="file" className="flex justify-center items-center gap-2 rounded-lg h-40 w-40 bg-gray-950 text-white cursor-pointer">
                    <BsImages />
                    <p>select images</p>
                </label>
                <input
                    onChange={imageHandler} 
                    multiple 
                    type='file' 
                    hidden 
                    id='file'
                    name="files"
                /></>}
            </div>
            
            <button disabled={isPending} formAction={formAction} className={`${isPending ? "bg-amber-900 cursor-progress" : "bg-amber-700 hover:bg-amber-900 duration-500 cursor-pointer"} text-white w-full py-2 px-4 rounded-sm text-2xl outline-hidden mt-4`}>
                {isPending ? "Loading..." : "Add Product"}</button>
        </div>
    )
}