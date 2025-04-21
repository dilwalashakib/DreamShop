"use client"

import { customerLogin } from "@/actions/customerActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginButton() {
    const router = useRouter();

    const loginAction = async(formData) => {
        const { email, password } = Object.fromEntries(formData);

        if(email && password) {
            const response = await customerLogin({email, password});
            if(response?.success) {
                toast.success(response.success);
                localStorage.setItem("userInfo", response?.token);
                router.push('/customer/dashboard');
            }
            toast.error(response?.error)
        } else {
            toast.error("UnAuthorized !");
        }
    }

    return (
        <button 
            formAction={loginAction} 
            className='py-2 px-5 bg-green-600 rounded-lg  w-full text-xl hover:bg-green-900 duration-500 mt-5 cursor-pointer'>
            Login
        </button>   
    )
}