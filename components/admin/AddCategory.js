"use client"

import { useState, useActionState } from "react";
import Input from "../others/Input";
import { toast } from "react-toastify";
import { BsImages } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/adminActions";

export default function AddCategory() {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [image, setImage] = useState('');
    const [state, formAction, isPending] = useActionState(createAction, null);

    async function createAction(prevState, formData) {
        const name = formData?.get("name");
        if(name && image) {
            const response = await createCategory({
                name,
                file
            });
            if(response?.success) {
                toast.success(response.success);
                setImage("");
                router.refresh();
            } 
            toast.error(response?.error);
        } else {
            toast.error("Missing your category name & image !")
        }
    }

    const imageHandler = (e) => {
        const f = e.target.files[0]
        setFile(f);
        const imgLink = URL.createObjectURL(f);
        setImage(imgLink);
    }

    return (
        <form action={formAction} className="md:w-5/12">
            <div className="bg-slate-900 p-3 rounded-xl">
                <h2 className="text-3xl text-center mb-4">Add Category</h2>
                <div className="w-full">
                    {image ? (
                        <label htmlFor="file" className="block h-44 w-full mb-5 cursor-pointer">
                            <img 
                                className="rounded-lg h-full w-full object-cover" 
                                src={image} alt="image" 
                            />
                        </label>
                    ) : (
                        <label htmlFor="file" className="flex justify-center items-center gap-2 rounded-lg h-44 w-full bg-slate-950 cursor-pointer mb-5">
                            <BsImages />
                            <p>select images</p>
                        </label>
                    )}
                    <input
                        onChange={imageHandler}  
                        type='file' 
                        hidden 
                        id='file' 
                    />
                </div>

                <Input
                    labelColor="white"
                    inputColor="white"
                    label="Category Name"
                    name="name"
                    type='text'
                    placeholder="add category" 
                />
                <button
                    disabled={isPending} 
                    className={`${isPending ? "bg-green-900 cursor-progress" : "bg-green-700 hover:bg-green-500 duration-500 cursor-pointer"} py-2 px-5 w-full rounded-lg text-xl`}>
                        { isPending ? "Loading..." : "Add Category" }
                </button>
            </div>
        </form>
    )
}