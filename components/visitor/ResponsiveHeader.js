"use client"

import Link from "next/link";
import { useState } from "react";
import { AiFillHeart, AiOutlineShopping } from "react-icons/ai";
import { FaBars, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaLock, FaTwitter, FaUser } from "react-icons/fa";

export default function ResponsiveHeader({ user, id }) {
    const [isOpen, setIsOpen] = useState(false);

    const menu = [
        {
            id: '1',
            name: "Home",
            path: '/'
        },
        {
            id: '2',
            name: "Shop",
            path: '/shop'
        },
        {
            id: '3',
            name: "Blog",
            path: '/blog'
        },
        {
            id: '4',
            name: "About",
            path: '/about'
        },
        {
            id: '5',
            name: "Contact",
            path: '/contact'
        },
    ];

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <FaBars className="text-2xl" />
            </button>
                    
            {isOpen && (
                <div className="absolute top-10 right-[-6] z-50 bg-white md:w-sm max-md:w-xs px-10 p-3 rounded-md text-black border-2 border-gray-300">
                    <div>
                        { user?.name ? (
                            <div className="flex gap-2 items-center justify-center text-2xl font-semibold cursor-pointer">
                                <FaUser className="text-xl font-bold" />
                                <span>{user?.name?.slice(0, 10)}</span>
                            </div>
                        ) : (
                            <Link href="/login" className="flex gap-2 items-center justify-center font-bold text-xl">
                                <FaLock className="text-1xl font-bold" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <ul className="p-4 cursor-pointer text-xl text-gray-600 font-semibold">
                            {menu?.map((item) => (
                                <li
                                    key={item.id} 
                                    className={`hover:text-yellow-600 ease-in-out p-3 duration-500 ${item.path === id && "text-yellow-400"}`}>
                                    <Link href={`/${item.path}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-2 justify-center text-2xl cursor-pointer py-3">
                        <button className="p-2 bg-gray-300 rounded-full hover:bg-red-200 duration-400 cursor-pointer">
                            <AiFillHeart className="text-red-700" />
                        </button>
                        <button className="p-2 bg-gray-300 rounded-full hover:bg-green-300 duration-400 cursor-pointer">
                            <AiOutlineShopping className="text-red-700" />
                        </button>
                    </div>
                    <div className="flex gap-2 py-4 justify-center cursor-pointer text-lg">
                        <FaFacebook />
                        <FaTwitter />
                        <FaLinkedin />
                        <FaInstagram />
                        <FaGithub />
                    </div>
                    <div className="flex justify-center w-full">
                        <select className="px-3 py-1 rounded-lg outline-hidden text-lg bg-gray-100">
                            <option value="english">English</option>
                            <option value="bangla">Bangla</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
}