import Link from "next/link";

export default function Table({ data }) {
    return (
        <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left'>
                <thead className='text-gray-200 uppercase'>
                    <tr className="bg-slate-700">
                        <th scope='col' className='px-4 py-3'>No</th>
                        <th scope='col' className='px-3 py-3'>Order Id</th>
                        <th scope='col' className='px-3 py-3'>Price</th>
                        <th scope='col' className='px-3 py-3'>Payment Status</th>
                        <th scope='col' className='px-4 py-3'>Delivery Status</th>
                        <th scope='col' className='px-4 py-3'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data?.map((item, i) => (
                        <tr key={i} className='bg-slate-950 border-b border-gray-700'>
                            <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{i + 1}</td>

                            <td scope='row' className='px-3 py-3 font-medium whitespace-nowrap'>{item?._id.toString()}</td>

                            <td scope='row' className='px-3 py-3 font-medium whitespace-nowrap'>{item.price}</td>

                            <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{item.paymentStatus}</td>

                            <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{item.deliveryStatus}</td>

                            <td scope='row' className='whitespace-nowrap px-4 py-3'>
                                <Link href={`/admin/order-details?id=${item?._id}`} className="bg-green-600 hover:bg-green-700 py-1 px-2 rounded-md text-white uppercase">
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>                    
            </table>
        </div>
    )
}