import Search from "../others/Search";
import AddCategory from "./AddCategory";
import Pagination from "../others/Pagination";
import { getCategorys } from "@/actions/adminActions";
import CategoryRemoveButton from "./CategoryRemoveButton";

export default async function AllCategory({ searchParams }) {
    const { categorys, count } = await getCategorys(searchParams);

    return (
        <div className="md:flex justify-between gap-2">
            <div className="bg-slate-900 rounded-xl p-2 md:w-10/12">
                <Search path="/admin/category" />

                <div className='overflow-x-auto'>
                    <table className='w-full text-md text-left'>
                        <thead className='text-gray-200 uppercase'>
                            <tr className="bg-slate-700">
                                <th scope='col' className='px-6 py-3'>No</th>
                                <th scope='col' className='px-6 py-3'>Image</th>
                                <th scope='col' className='px-6 py-3'>Name</th>
                                <th scope='col' className='px-6 py-3'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categorys?.map((item, i) => (
                                <tr key={i} className='bg-slate-950 text-gray-200 border-b border-gray-700'>
                                    <td scope='row' className='px-6 py-2 font-medium whitespace-nowrap'>{i + 1}</td>
                                    <td scope='row' className='px-6 py-2 font-medium whitespace-nowrap'>
                                        <img className="h-10 w-10 rounded-xl" src={item.image} alt="image" />
                                    </td>
                                    <td scope='row' className='px-6 py-2 font-medium whitespace-nowrap'>{item.name}</td>

                                    <td scope='row' className='whitespace-nowrap px-6 py-2 flex items-center'>
                                        <CategoryRemoveButton 
                                            id={item?._id?.toString()}
                                            publicId={item?.publicId}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {count > searchParams?.perPage && (
                        <Pagination
                            path="/admin/category"
                            total={count}
                            perPage={searchParams?.perPage}
                        />
                    )}
                </div>      
            </div>

            <AddCategory />
        </div>
    )
}