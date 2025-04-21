"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ perPage, total, path }) {
    const arr = [];
    const getPage = useSearchParams().get('page');
    const currentPage = getPage ? parseInt(getPage): 1;
    const totalPage = Math.ceil(total / perPage);

    if(totalPage < currentPage) return;

    for(let i = currentPage - 3; i <= currentPage + 3; i++) {
        if(i < 1) continue;
        if(i > totalPage) break;
        arr.push(i);
    }
    
    return (
        <div className="flex gap-5 justify-center items-center py-4 text-2xl">
            {currentPage - 1 >= 1 && (
                <Link href={`${path}?page=${currentPage - 1}&perPage=${perPage}`}>
                    <FaChevronLeft />
                </Link>
            )}

            {arr.map((item) => (
                <Link
                    key={item}
                    href={`${path}?page=${item}&perPage=${perPage}`}
                    className={`${currentPage === item && "bg-green-600 text-white py-1 px-3 rounded-md"}`}>
                    {item}
                </Link>
            ))}

            {currentPage + 1 <= totalPage && 
                <Link href={`${path}?page=${currentPage + 1}&perPage=${perPage}`}>
                    <FaChevronRight />
                </Link>
            }
        </div>
    )
}
