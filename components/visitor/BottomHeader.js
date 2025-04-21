"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { AiFillPhone, AiOutlineBars } from "react-icons/ai";

export default function BottomHeader({ category }) {
    const router = useRouter();
    const [dropDownCategory, setDropDownCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState("");
    const [search, setSearch] = useState("");

    const searchHandler = (e) => {
        if(search || categoryValue) {
            router.push(`/shop/search?category=${categoryValue}&search=${search}`);
        } else {
            alert("select category or Search any Item");
        }
    }

    return (
        <div className="lg:flex gap-3 justify-between items-center bg-white sm:px-8 pb-3 max-lg:w-full">
                
            <button className="lg:w-3/12 flex gap-5 items-center justify-between py-2 px-5 text-xl max-lg:w-full relative border-2 border-gray-400 text-black max-lg:mb-3 z-10 cursor-pointer rounded-md" onClick={(e) => setDropDownCategory(!dropDownCategory)}>
                <div className="flex gap-2 items-center">
                    <AiOutlineBars />
                    <span>All Category</span>
                </div>
                <div> <FaChevronDown /></div>

                {dropDownCategory && 
                    <ul className="bg-white absolute top-14 left-[-2px] w-full cursor-pointer max-h-[72vh] overflow-y-auto border-2 border-gray-300 rounded-xl">
                        {category && JSON.parse(category)?.map((item) => (
                            <Link href={`/shop/search/category?name=${item?.slug}`} key={item?._id}>
                                <li key={item?._id} className="hover:bg-gray-300 p-2 text-xl flex gap-2 items-center">
                                    <img
                                        className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                                        src={item?.image} 
                                        alt="image" 
                                    />
                                    {item?.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                }
            </button>
                
            <div className="lg:w-6/12 sm:flex justify-end max-lg:w-full text-black">
                <select 
                    onChange={(e) => setCategoryValue(e.target.value)}
                    className="p-2 outline-hidden text-xl max-sm:w-full max-sm:mb-1 border-2 border-gray-300 lg:rounded-l-md">
                    <option value="">--Select Category--</option>
                    {category && JSON.parse(category)?.map((item) => (
                        <option key={item._id} value={item?.slug}>
                            {item?.name}
                        </option>
                    ))}
                </select>
                <div className="flex max-lg:w-full">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="What do you need?"
                        className="p-2 w-full outline-hidden text-xl border-y-2 border-gray-300"
                    />
                    <button 
                        onClick={searchHandler} 
                        className="py-2 px-5 bg-green-600 hover:bg-green-900 text-xl text-white duration-500 border-y-2 border-green-600">
                        Search
                    </button>
                </div>
            </div>

            <div className="lg:w-3/12 lg:col-span-2 max-lg:hidden flex justify-end items-center gap-3">
                <AiFillPhone className="bg-gray-900 text-xl p-2 h-10 w-10 rounded-full" />
                <div className="text-gray-800">
                    <p>+0880173466278</p>
                    <p>support 24/7 time</p>
                </div>
            </div>
        </div>
    )
}