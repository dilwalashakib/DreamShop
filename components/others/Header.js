'use client'
 
import Sidebar from "./Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsFillChatLeftDotsFill } from "react-icons/bs";

export default function Header({ id, info }) {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sm:grid sm:grid-cols-2 items-center max-sm:flex justify-between rounded-lg bg-blue-950 px-4 py-2 mb-2 max-md:fixed max-md:w-full">
            <div className="md:hidden relative">
                <button onClick={(e) => setOpen(!open)}>
                    {open ? (<ImCross className="text-2xl cursor-pointer" />) : (<FaBars className="text-2xl cursor-pointer" />)}
                </button>

                {open && <div className="max-sm:flex justify-center pt-4 fixed top-[70px] left-0 bg-gray-950 rounded-md max-md:z-50 opacity-100">
                    <Sidebar 
                        id={id} 
                        role={info?.role} 
                        status={info?.status} 
                    />
                </div>}
            </div>

            <div className="flex gap-2">
                <img
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                    src={info?.image?.url ? info.image.url : "/images/default.png"}
                    alt="photo"
                />
                
                <div className="max-sm:hidden">
                    <p className="text-lg sm:font-semibold">{info?.name}</p>
                    <p>{info.role}</p>
                </div>
            </div>
            
            <div className="flex gap-2 items-center max-md:hidden">
                <input className="w-full p-1.5 px-3 text-xl outline-hidden rounded-lg bg-blue-900" type="text" placeholder="Search..." />

                <div className="text-3xl">
                    <BsFillChatLeftDotsFill />
                </div>
            </div>
        </nav>
    )
}