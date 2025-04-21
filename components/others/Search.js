'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search({ path, placeholder }) {
    const router = useRouter();
    const [perPage, setPerPage] = useState("");
    const [search, setSearch] = useState("");

    const selectHandler = (e) => {
        if(e.target.value) {
            router.push(`${path}?perPage=${e.target.value}`)
            setPerPage(e.target.value);
            setSearch("");
        } else{
            router.push(`${path}`)
            setPerPage("")
        }
    }

    const searchHandler = (e) => {
        if(e.target.value) {
            router.push(`${path}?search=${e.target.value}`);
            setPerPage("");
            setSearch(e.target.value);
        } else {
            router.push(`${path}`);
            setSearch("");
        }
    }

    return (
        <div className="flex gap-4 justify-between mb-3">
            <select value={perPage} onChange={selectHandler} className="py-2 px-5 rounded-lg outline-hidden text-lg bg-gray-800 w-2/5 cursor-pointer">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            
            <input
                value={search}
                onChange={searchHandler}
                className="w-full outline-hidden bg-gray-800 px-4 py-2 rounded-md"
                placeholder={placeholder}
                type='text' 
            />
        </div>
    )
}