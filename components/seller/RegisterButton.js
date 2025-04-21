"use client"

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { sellerRegister } from "@/actions/sellerActions";
import { registerValidator } from "@/utils/validator";

export default function RegisterButton() {
    const router = useRouter();
    const registerAction = async(formData) => {
        const data = Object.fromEntries(formData);
        const { isValid, error } = registerValidator(data);
        if(isValid) {
            const response = await sellerRegister(data);

            if(response?.success) {
                toast.success(response.success);
                localStorage.setItem("userInfo", response?.token);
                router.push('/seller/profile');
            }
            toast.error(response?.error)
        } else {
            toast.error(error?.name || error?.email || error?.password);
        }
    }

    return (
        <button formAction={registerAction} className='py-2 px-5 bg-green-600 rounded-lg outline-hidden w-full text-xl hover:bg-green-900 duration-400 cursor-pointer'>
            Register
        </button>
    )
}