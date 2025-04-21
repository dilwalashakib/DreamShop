import moment from "moment";
import Card from "../others/Card";
import { BiDollar } from "react-icons/bi";
import dbConnect from "@/utils/dbConnect";
import { ToastContainer } from "react-toastify";
import SellerWallet from "@/models/SellerWallet";
import WithdrawRequest from "@/models/WithdrawRequest";
import PaymentRequestButton from "./PaymentRequestButton";

const getData = async({ id }) => {
    try {
        dbConnect();
        const sellerWalet = await SellerWallet.find({sellerId: id});
        const totalAmount = sellerWalet.reduce((acc, curr) => acc + curr.amount, 0);

        const withdrawReq = await WithdrawRequest.find({sellerId: id});
        const totalWithdrawAmount = withdrawReq.reduce((acc, curr) => acc + curr.amount, 0);
        const balance = totalAmount - totalWithdrawAmount;

        const pending = await WithdrawRequest.find({sellerId: id, status: "pending"}).sort({createdAt: -1});
        const pendingAmount = pending.reduce((acc, curr) => acc + curr.amount, 0);

        const withdraw = await WithdrawRequest.find({sellerId: id, status: "withdraw"}).sort({createdAt: -1});
        const withdrawAmount = withdraw.reduce((acc, curr) => acc + curr.amount, 0);
        
        return { totalAmount, balance, pending, pendingAmount, withdraw, withdrawAmount }
    } catch(err) {
        return {error: "Server Side Error !"}
    }
}

export default async function Payments({ user }) {
    const { totalAmount, balance, pending, pendingAmount, withdraw, withdrawAmount } = await getData({id: user?.id});
    return (
        <div className="pr-3">
            <ToastContainer position="top-right" limit={1} />
            <div className="sm:grid gap-3 lg:grid-cols-4 sm:grid-cols-2">
                <Card
                    textColor="white"
                    textSize="xl"
                    bgColor="black"
                    count={`$${totalAmount}`}
                    text="total sells" 
                    icon={<BiDollar />}
                />
                <Card 
                    textColor="white"
                    textSize="xl"
                    bgColor="black"
                    count={`$${balance}`} 
                    text="Available Amount" 
                    icon={<BiDollar />}
                />
                <Card 
                    textColor="white"
                    textSize="xl"
                    bgColor="black"
                    count={`$${pendingAmount}`} 
                    text="Pending Amount" 
                    icon={<BiDollar />}
                />
                <Card 
                    textColor="white"
                    textSize="xl"
                    bgColor="black"
                    count={`$${withdrawAmount}`} 
                    text="Withdrawal Amount" 
                    icon={<BiDollar />}
                />
            </div>

            <div className="md:flex gap-2 max-md:w-full">
                <div className="md:w-6/12">
                    <div className="bg-gray-800 p-2 rounded-md">
                        <h2 className="text-2xl mb-3">Send Request</h2>
                        <PaymentRequestButton
                            sellerId={user?.id} 
                            balance={balance} 
                        />
                        <div className="mt-3">
                            <h2 className="text-2xl">Pending Request</h2>
                            <div className='overflow-x-auto mt-2'>
                                <table className='w-full text-sm text-left'>
                                    <thead className='text-xs text-white uppercase'>
                                        <tr className="bg-slate-950">
                                            <th scope='col' className='px-4 py-3'>No</th>
                                            <th scope='col' className='px-4 py-3'>Amount</th>
                                            <th scope='col' className='px-4 py-3'>Status</th>
                                            <th scope='col' className='px-4 py-3'>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {pending?.map((item, i) => (
                                            <tr key={i} className='bg-gray-900 border-b border-gray-600'>
                                                <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{i + 1}</td>
                                                <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>${item.amount}</td>
                                                <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{item.status}</td>
                                                <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{moment(item.createdAt).format("LL")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-6/12">
                    <div className="p-2 bg-slate-800 rounded-md">
                        <h2 className="text-2xl">Success Withdraw</h2>
                        <div className='overflow-x-auto mt-3 max-h-[54vh]'>
                            <table className='w-full text-sm text-left'>
                                <thead className='text-xs text-white uppercase'>
                                    <tr className="bg-slate-950">
                                        <th scope='col' className='px-4 py-3'>No</th>
                                        <th scope='col' className='px-4 py-3'>Amount</th>
                                        <th scope='col' className='px-4 py-3'>Status</th>
                                        <th scope='col' className='px-4 py-3'>Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {withdraw?.map((item, i) => (
                                        <tr key={i} className='bg-gray-900 border-b border-gray-600'>
                                            <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{i + 1}</td>
                                            <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>${item.amount}</td>
                                            <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{item.status}</td>
                                            <td scope='row' className='px-4 py-3 font-medium whitespace-nowrap'>{moment(item.createdAt).format("LL")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}