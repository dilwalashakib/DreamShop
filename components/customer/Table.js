import Link from "next/link";

export default function Table({ data }) {
    return (
        <div className='relative overflow-x-auto mb-3'>
            <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase'>
                    <tr className="bg-white border-b">
                        <th scope='col' className='px-6 py-3'>Order Id</th>
                        <th scope='col' className='px-6 py-3'>Price</th>
                        <th scope='col' className='px-6 py-3'>Payment status</th>
                        <th scope='col' className='px-6 py-3'>Order status</th>
                        <th scope='col' className='px-6 py-3'>Action</th>
                    </tr>
                </thead>

                <tbody className="bg-gray-900">
                    {data?.map((item, i) => (
                        <tr key={i} className='bg-white border-b'>
                            <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{item?._id.toString()}</td>

                            <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>${item.price}</td>

                            <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{item.paymentStatus}</td>

                            <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{item.deliveryStatus}</td>

                            <td scope='row' className='whitespace-nowrap px-6 py-4'>
                                <Link href={`/customer/order-details?id=${item._id}`}>
                                    <span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded-sm'>view</span>
                                </Link>
                                {item.paymentStatus !== 'paid' && (
                                    <Link 
                                        href={`/payment?orderId=${item?._id}&price=${item.price}`} 
                                        className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded-sm cursor-pointer'>
                                            Pay Now
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}