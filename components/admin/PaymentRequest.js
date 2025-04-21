import moment from "moment";
import dbConnect from "@/utils/dbConnect";
import WithdrawRequest from "@/models/WithdrawRequest";
import PaymentConfirmButton from "./PaymentConfirmButton";
import { ToastContainer } from "react-toastify";

const getPaymentRequest = async() => {
    try {
        dbConnect();
        const request = await WithdrawRequest.find({status: "pending"});
        return request;
    } catch(err) {
        return { error: "Server Side Error!"}
    }
}
export default async function PaymentRequest() {
    const request = await getPaymentRequest();

    return (
        <div className='overflow-x-auto'>
            <ToastContainer position="top-right" limit={1} />
            <table className='w-full text-md text-left'>
                <thead className='text-gray-200 uppercase'>
                    <tr className="bg-slate-800">
                        <th scope='col' className='px-6 py-3'>No</th>
                        <th scope='col' className='px-6 py-3'>Amount</th>
                        <th scope='col' className='px-6 py-3'>Status</th>
                        <th scope='col' className='px-6 py-3'>Date</th>
                        <th scope='col' className='px-6 py-3'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {request?.map((item, i) => (
                        <tr key={i} className='bg-gray-950 border-b border-gray-700'>
                            <td scope='row' className='px-6 py-2 font-medium whitespace-nowrap'>{i + 1}</td>
                            <td scope='row' className='px-6 py-2 font-medium whitespace-nowrap'>${item.amount}</td>
                            <td scope='row' className='px-6 py-2 font-medium whitespace-nowrap'>{item.status}</td>
                            <td scope='row' className='px-6 py-2 font-medium whitespace-nowrap'>{moment(item.createdAt).format("LL")}</td>
                            <td scope='row' className='whitespace-nowrap px-6 py-2'><PaymentConfirmButton id={item?._id?.toString()} /></td>
                        </tr>
                    ))}
                </tbody>                    
            </table>
        </div>
    )
}