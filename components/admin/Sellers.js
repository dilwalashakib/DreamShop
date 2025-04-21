import Link from "next/link";
import Search from "../others/Search";
import { FaEdit } from "react-icons/fa";
import Pagination from "../others/Pagination";
import { ToastContainer } from "react-toastify";
import { getActiveSellers } from "@/actions/adminActions";

export default async function Sellers({ searchParams }) {
    const { sellers, countSeller } = await getActiveSellers(searchParams);
    return (
        <div className="w-full bg-slate-900 p-2 rounded-lg">
            <Search path="/admin/sellers" />

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
                {countSeller > searchParams?.perPage && (
                    <Pagination 
                        path="/admin/sellers"
                        total={countSeller}
                        perPage={searchParams?.perPage}
                    />
                )}
            </div>

            <ToastContainer position='top-right' limit={1} />
        </div>
    )
}
