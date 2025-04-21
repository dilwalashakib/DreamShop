"use client"

import { customerRegister } from "@/actions/customerActions";
import { registerValidator } from "@/utils/validator";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterButton() {
    const router = useRouter();

    const registerAction = async(formData) => {
        const value = Object.fromEntries(formData);
        let { isValid, error } = registerValidator(value);     
        if(isValid) {            
            const response = await customerRegister(value);
            if(response?.success) {
                toast.success(response.success);
                localStorage.setItem("userInfo", response?.token);
                router.push('/customer/dashboard');
            }
            toast.error(response?.error);
        } else {
            toast.error(error?.name || error?.email || error?.password);
        }
    }
    return (
        <button
            formAction={registerAction}
            className='py-2 px-5 bg-green-600 rounded-lg  w-full text-xl hover:bg-green-900 duration-500 mt-5 cursor-pointer'>
            Register
        </button>
    )
}