"use client"

import { adminLogin } from "@/actions/adminActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginButton() {
    const router = useRouter();

    const loginAction = async(formData) => {
        const email = formData.get('email');
        const password = formData.get('password');
        if(email && password) {
            const response = await adminLogin({email, password});

            if(response?.success) {
                toast.success(response.success);
                localStorage.setItem("userInfo", response?.token);
                router.push('/admin/dashboard');
            }
            toast.error(response?.error)
        } else {
            toast.error("UnAuthorized !");
        }
    }

    return (
        <button formAction={loginAction} className='py-2 px-5 bg-green-600 rounded-lg outline-hidden w-full text-xl hover:bg-green-900 duration-400'>
            Login
        </button>    
    )
}