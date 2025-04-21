'use client'

import Link from "next/link";
import Search from "../others/Search";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import Pagination from "../others/Pagination";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { getDeactiveSellers } from "@/actions/adminActions";

export default function Sellers() {
    const pageNum = useSearchParams().get("page");
    const page = pageNum ? parseInt(pageNum) : 1;
    const [countSeller, setCountSeller] = useState(0);
    const [ perPage, setPerPage ] = useState(5);
    const [ search, setSearch ] = useState("");
    const [ loading, setLoading] = useState(false);
    const [ sellers, setSellers] = useState(null);

    useEffect(() => {
        const activeSellers = async() => {
            const response = await getDeactiveSellers({
                perPage,
                search,
                page
            })
            if(response?.success) {
                const parseSellers = JSON.parse(response.sellers);
                setSellers(parseSellers);
                setCountSeller(response.countSeller);
            }
            toast.error(response?.error);
        }
        activeSellers();
    }, [perPage, search, page]);
    
    return (
        <div className="w-full bg-slate-900 p-2 rounded-lg">
            <Search
                perPage={perPage}
                search={search}
                fnPage={(e) => setPerPage(e.target.value)}
                fnSearch={(e) => setSearch(e.target.value)}
            />

            <div className='relative overflow-x-auto mb-1'>
                <table className='w-full text-md text-left'>
                    <thead className='text-gray-200 uppercase'>
                        <tr className="bg-slate-700">
                            <th scope='col' className='px-4 py-3'>No</th>
                            <th scope='col' className='px-3 py-3'>Name</th>
                            <th scope='col' className='px-3 py-3'>Email</th>
                            <th scope='col' className='px-4 py-3'>status</th>
                            <th scope='col' className='px-4 py-3'>Payment status</th>
                            <th scope='col' className='px-4 py-3'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sellers?.map((item, i) => (
                            <tr key={i} className='bg-slate-950 border-b border-gray-700'>
                                <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{i + 1}</td>

                                <td scope='row' className='px-3 py-3 font-medium whitespace-nowrap'>{item.name}</td>

                                <td scope='row' className='px-3 py-3 font-medium whitespace-nowrap'>{item.email}</td>

                                <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{item.status}</td>

                                <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{item.payment}</td>

                                <td scope='row' className='whitespace-nowrap px-4 py-3'>
                                    <Link href={`/admin/seller-details/?id=${item?._id}`} className="text-xl text-green-500 hover:text-green-800">
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <ToastContainer position='top-right' limit={1} />
            
            {countSeller > perPage && 
                <Pagination 
                    total={countSeller}
                    perPage={perPage}
                    path="/seller"
                />
            }
        </div>
    )
}
