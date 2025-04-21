"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function ResponsiveSidebar({ id, role }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='relative'>
            <button onClick={(e) => setIsOpen(!isOpen)} className="md:hidden cursor-pointer text-black mt-2 p-2 bg-white rounded-t-lg ml-1">
                <FaBars className="text-2xl" />
            </button>

            {isOpen && <div className="md:hidden w-3xs absolute top-13 left-0 z-50 bg-white border-2 border-gray-300 rounded-xl ">
                <Sidebar id={id} role={role} />
            </div>}
        </div>
    )
}