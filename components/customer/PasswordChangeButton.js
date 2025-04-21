"use client";

import { toast } from "react-toastify";
import { passwordChange } from "@/actions/profileActions";

export default function PasswordChangeButton({ role }) {
    const passwordChangeAction = async(formData) => {
        try {
            const { email, oldPassword, newPassword } = Object.fromEntries(formData);
            
            if(email && oldPassword && newPassword) {
                const response = await passwordChange({
                    email,
                    oldPassword,
                    newPassword,
                    role
                });
                
                if(response?.success) {
                    toast.success(response.success);
                } else {
                    toast.error(response.error);
                }
            } else {
                toast.error("UnAuthorized!")
            }
        } catch(err) {
            toast.error(err?.message);
        }
    }
    return (
        <button formAction={passwordChangeAction} className='py-2 px-5 bg-green-600 rounded-lg  w-full text-xl hover:bg-green-900 duration-500 mt-5 cursor-pointer'>Change Password</button>
    )
}