"use client"

import Link from "next/link";
import { useContext } from "react";
import { ActiveUserContext } from "@/context/ActiveUserContext";

export default function ChatUserList({ id, currId, name, image, role }) {
    const { activeUser } = useContext(ActiveUserContext);
  
    const links = role === "seller" ? `/seller/chat-customer` : `/${role}/chat-seller`;

    return (
        <Link href={`${links}?id=${id}`} className={`${currId === id && "bg-sky-600 text-white"} flex gap-1 items-center text-lg cursor-pointer hover:bg-sky-700 px-3 py-2 mt-1`}>
            <img className="h-10 w-10 rounded-full object-cover" src={image ? image : "/images/default.png"} />
            {activeUser[id] && <div className="w-[12px] h-[12px] ml-[-12px] mt-[23px] rounded-full bg-green-400"></div>}
            <h3 className="ml-1 max-xs:hidden">{name}</h3>
        </Link>
    )
}