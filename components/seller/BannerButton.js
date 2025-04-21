"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { addProductBanner, deleteBanner } from "@/actions/sellerActions";

export default function BannerButton({ url, id }) {
    const router = useRouter();
    const [bannerUrl, setBannerUrl] = useState(url);
    const [loading, setLoading] = useState(false);

    const bannerChange = async(e) => {
        setLoading(true)
        const file = e.target.files[0];
        const response = await addProductBanner({
            id,
            file
        });

        if(response?.success) {
            toast.success(response.success);
            setBannerUrl(response.url);
            setLoading(false)
            router.refresh();
        }
        toast.error(response?.error);
    }

    const removeBanner = async(e) => {
        e.preventDefault();
        setLoading(true)
        const response = await deleteBanner({ productId: id });
        if(response?.success) {
            toast.success(response.success);
            router.refresh();
            setBannerUrl(null);
            setLoading(false)
        }
        toast.error(response?.error);
    }

    return (
        <div className="mt-3 relative">
            { loading && <div className="flex justify-center items-center w-full h-96 absolute bg-gray-800"><FadeLoader color="#36d7b7" /></div> }
            <label htmlFor="file" className="flex justify-center items-center gap-2 rounded-lg h-96 w-full bg-black cursor-pointer" title="Click this and Add Banner">
                {bannerUrl ? (
                    <>
                        <img 
                            className="w-full h-full object-cover rounded-md" 
                            src={bannerUrl} 
                            alt="Banner" 
                        />
                        <button onClick={removeBanner} className="text-3xl absolute top-0 right-0 bg-red-600 hover:bg-red-700 p-3 cursor-pointer" title="Remove Banner"><MdDeleteForever /></button>
                    </>
                ) : (
                    <>
                        <FaCloudUploadAlt className="text-2xl" />
                        <p>select images</p>
                    </>
                )}
            </label>
            <input
                onChange={bannerChange}
                disabled={bannerUrl} 
                type='file' 
                hidden 
                id='file' 
            />
        </div>
    )
}