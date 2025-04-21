"use client"

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { sellerLogin } from "@/actions/sellerActions";

export default function LoginButton() {
    const router = useRouter();

    const loginAction = async(formData) => {
        const email = formData.get('email');
        const password = formData.get('password');
        if(email && password) {
            const response = await sellerLogin({email, password});

            if(response?.success) {
                toast.success(response.success);
                localStorage.setItem("userInfo", response?.token);
                router.push('/seller/dashboard');
            }
            toast.error(response?.error)
        } else {
            toast.error("UnAuthorized !");
        }
    }

    return (
        <button formAction={loginAction} className='py-2 px-5 bg-green-600 rounded-lg outline-hidden w-full text-xl hover:bg-green-900 duration-400 cursor-pointer'>
            Login
        </button>
    )
}