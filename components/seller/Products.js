import Link from "next/link";
import Search from "../others/Search";
import Product from "@/models/Product";
import { TbEdit } from "react-icons/tb";
import dbConnect from "@/utils/dbConnect";
import { ToastContainer } from "react-toastify";
import { BsPatchPlusFill } from "react-icons/bs";
import RemoveProductButton from "./RemoveProductButton";

const getProducts = async({userId, searchParams }) => {
    try {
        dbConnect();
        const search = searchParams?.search;
        const page = searchParams?.page;
        const perPage = searchParams?.perPage || 5;
        const skipPage = (page - 1) * perPage;
        const countProduct = await Product.countDocuments({sellerId: userId});
      
        if(search) {
            const products = await Product.find({name: {$regex: search, $options: "i"}, sellerId: userId}).skip(skipPage).limit(perPage);
    
            return { products, countProduct }
        } else {
            const products = await Product.find({ sellerId: userId }).skip(skipPage).limit(perPage);
            return { products, countProduct }
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

export default async function Products({ userId, searchParams}) {
    const { products, countProduct } = await getProducts({ userId, searchParams});

    return (
        <div className="w-full bg-black p-2 rounded-lg">
            <Search path="/seller/all-product" placeholder="Search Product name..." />

            <div className='overflow-x-auto w-full'>
                <table className='w-full text-sm text-left text-gray-200'>
                    <thead className='text-white uppercase'>
                        <tr className="bg-gray-800">
                            <th scope='col' className='px-3 py-3'>No</th>
                            <th scope='col' className='px-2 py-3'>Order Id</th>
                            <th scope='col' className='px-3 py-3'>Image</th>
                            <th scope='col' className='px-3 py-3'>Name</th>
                            <th scope='col' className='px-3 py-3'>Category</th>
                            <th scope='col' className='px-3 py-3'>Brand</th>
                            <th scope='col' className='px-2 py-3'>Discount</th>
                            <th scope='col' className='px-3 py-3'>Price</th>
                            <th scope='col' className='px-3 py-3'>Stock</th>
                            <th scope='col' className='px-3 py-3'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.map((item, i) => (
                            <tr key={i} className='border-b border-slate-700 bg-slate-950'>
                                <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>{i + 1}</td>

                                <td scope='row' className='px-2 py-2 font-medium whitespace-nowrap'>{item._id?.toString()}</td>

                                <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>
                                    <img className="h-8 w-8 rounded-sm" src={item.images[0]?.url} alt="image" />
                                </td>

                                <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>{item.name.slice(0, 22)}</td>

                                <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>{item.category.split("-")[0]}</td>

                                <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>{item.brand.split(" ")[0]}</td>

                                <td scope='row' className='px-2 py-2 font-medium whitespace-nowrap'>{item.discount}</td>

                                <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>${item.price}</td>

                                <td scope='row' className='px-3 py-2 font-medium whitespace-nowrap'>{item.stock}</td>

                                <td scope='row' className='whitespace-nowrap px-3 py-2'>
                                    <div className="flex gap-1 text-2xl">
                                        <Link 
                                            href={`/seller/edit-product?id=${item._id}`}
                                            className="text-green-500 hover:text-green-900">
                                            <TbEdit />
                                        </Link>
                                        <Link 
                                            href={`/seller/add-banner?id=${item._id}`}
                                            title="Add Banner"
                                            className="text-yellow-500 hover:text-yellow-700">
                                            <BsPatchPlusFill />
                                        </Link>

                                        <RemoveProductButton 
                                            id={item?._id?.toString()}
                                            images={item.images}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <ToastContainer position='top-right' limit={1} />
            
            {/* {countProduct > perPage && 
                <Pagination 
                    total={countProduct}
                    perPage={perPage}
                    path="/seller/all-product"
                />
            } */}
        </div>
    )
}