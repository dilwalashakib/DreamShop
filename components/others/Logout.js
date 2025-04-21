"use client"

import { logout } from "@/actions/profileActions"
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi"
import { toast } from "react-toastify";

export default function Logout({ role }) {
    const router = useRouter();

    const logoutHandler = async() => {
        const response = await logout();
        if(response?.success) {
            localStorage.removeItem("userInfo");
            toast.success(response?.success);
            router.push(`/${role}/login`);
        }
    }

    return (
        <button onClick={logoutHandler} className={`${role === "customer" ? "text-black px-2 mt-2 hover:text-white" : "rounded-l-xl px-1 mt-2"} flex gap-3 items-center py-2 hover:bg-sky-600 w-full text-xl `}>
            <span><BiLogOut /></span>
            <span>Logout</span>
        </button>
    )
}