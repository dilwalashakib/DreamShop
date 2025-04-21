import Table from "./Table";
import moment from "moment";
import Link from "next/link";
import Order from "@/models/Order";
import Seller from "@/models/Seller";
import Charts from "../others/Charts";
import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";
import Card from "@/components/others/Card";
import AdminWallet from "@/models/AdminWallet";
import { AiOutlineShoppingCart } from "react-icons/ai";
import AdminSellerMessage from "@/models/AdminSellerMessage";
import { BiCategory, BiGroup, BiDollar } from "react-icons/bi";

const getData = async({ id }) => {
    try {
        dbConnect();
        const adminWallet = await AdminWallet.find();
        const totalSells = adminWallet.reduce((acc, curr) => acc + curr.amount, 0);

        const totalProducts = await Product.find().countDocuments();
        const totalSellers = await Seller.find().countDocuments();
        const totalOrders = await Order.find().countDocuments();
        const recentOrders = await Order.find().sort({createdAt: -1}).limit(5);

        const msg = await AdminSellerMessage.find({receiverId: id}).sort({createdAt: -1}).limit(5);

        return { totalSells, totalProducts, totalSellers, totalOrders, recentOrders, msg }
    } catch(err) {
        return {error: "Server Side Error !"}
    }
}

export default async function Dashboard({ user }) {
    const { totalSells, totalProducts, totalSellers, totalOrders, recentOrders, msg } = await getData({ id: user?.id });
    return (
        <div className="w-full">
            <div className="sm:grid gap-3 lg:grid-cols-4 sm:grid-cols-2">
                <Card
                    textColor="white"
                    textSize="2xl"
                    bgColor="black"
                    count={`$${totalSells}`} 
                    text="Total Sells" 
                    icon={<BiDollar />}
                />
                <Card 
                    textColor="white"
                    textSize="2xl"
                    bgColor="black"
                    count={totalProducts} 
                    text="products" 
                    icon={<BiCategory />}
                />
                <Card 
                    textColor="white"
                    textSize="2xl"
                    bgColor="black"
                    count={totalSellers}  
                    text="sellers" 
                    icon={<BiGroup />}
                />
                <Card 
                    textColor="white"
                    textSize="2xl"
                    bgColor="black"
                    count={totalOrders}  
                    text="orders" 
                    icon={<AiOutlineShoppingCart />}
                />
            </div>

            <div className="md:grid grid-cols-5 md:gap-2 md:h-96 mt-2">
                <div className="md:col-span-3 bg-black text-black p-2 rounded-lg max-md:z-10">
                    <Charts />
                    {/* <ApexChart /> */}
                </div>

                <div className="md:col-span-2 p-3 overflow-y-auto bg-black rounded-lg no-scrollbar">
                    <div className="flex justify-between">
                        <h3>Recent Seller Messege</h3>
                        <Link href='/admin/chat-seller' className="text-green-500 hover:text-green-700"> View all</Link>
                    </div>
                    <div className="mt-3">
                        {msg?.map((item, i) => (
                            <div key={i} className="bg-slate-800 py-2 px-3 mt-2 rounded-md">
                                <div className="flex gap-2 items-center">
                                    <img src="/images/admin.png" className="w-10 h-10 rounded-full object-cover" alt="pic" />

                                    <div className="w-full">
                                        <div className="flex gap-2 justify-between mb-1">
                                            <span>{item?.senderName?.slice(0, 14)}</span>
                                            <span> {moment(item.createdAt).startOf('min').fromNow()}</span>
                                        </div>

                                        <p className="bg-black py-1.5 px-3 rounded-sm"> {item?.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-3 rounded-lg bg-black">
                <Table data={recentOrders} />
            </div>
        </div>
    )
}