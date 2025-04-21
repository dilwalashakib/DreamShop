'use client'

import Link from "next/link";
import { customerSidebar } from "@/utils/sidebar";
import Logout from "../others/Logout";

export default function Sidebar({ id, role }) {
    return (
        <div className="py-2">
            {
                customerSidebar.map((item) => (
                    <Link 
                        className={`flex items-center gap-2 hover:bg-sky-500 mt-2 px-4 py-2 text-black text-lg ${item.path === id && "bg-sky-600 text-white"}`}
                        key={item.id} 
                        href={`/${role}/${item.path}`} >
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                    </Link>
                ))
            }
            <Logout role={role} />
        </div>
    )
}