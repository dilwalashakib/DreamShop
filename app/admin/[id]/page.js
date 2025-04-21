import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import Orders from '@/components/admin/Orders';
import Header from '@/components/others/Header';
import { ToastContainer } from "react-toastify";
import Sellers from '@/components/admin/Sellers';
import Sidebar from '@/components/others/Sidebar';
import Dashboard from '@/components/admin/Dashboard';
import ChatSellers from '@/components/admin/ChatSellers';
import AllCategory from "@/components/admin/AllCategory";
import OrderDetails from '@/components/admin/OrderDetails';
import SellerDetails from '@/components/admin/SellerDetails';
import PaymentRequest from '@/components/admin/PaymentRequest';
import SellersRequest from "@/components/admin/SellersRequest";
import DeactiveSellers from '@/components/admin/DeactiveSellers';

const getUserInfo = async() => {
    const cookie = await cookies();
    const info = cookie.get("userInfo");
    if(info?.value) {
        const userInfo = jwt.verify(info.value, process.env.TOKEN_SECRET_KEY);
        return userInfo
    } else {
        return {error: "You are not access This page !"}
    }
}

export default async function Admin({ params, searchParams }) {  
    const user = await getUserInfo();
    const { id } = await params;
    const searchParam = await searchParams;
    
    return (
        user?.role === "admin" ? (
            <div className='md:grid md:grid-cols-5 h-[100vh]'>
                <div className='max-md:hidden h-[100vh]'>
                    <Sidebar id={id} role={user?.role} />
                </div>

                <div className='col-span-4 md:pt-2 h-[100vh] overflow-y-scroll'>
                    <ToastContainer position="top-right" limit={1} />
                    <Header id={id} info={user} />
                    
                    <div>
                        {id === "dashboard" && <Dashboard user={user} />}
                        {id === "payment-request" && <PaymentRequest />}
                        {id === "deactive-sellers" && <DeactiveSellers />}
                        {id === "sellers-request" && <SellersRequest />}
                        {id === "orders" && <Orders searchParams={searchParam} />}
                        {id === "sellers" && <Sellers searchParams={searchParam} />}
                        {id === "order-details" && <OrderDetails id={searchParam?.id} />}
                        {id === "category" && <AllCategory searchParams={searchParam} />}
                        {id === "seller-details" && <SellerDetails id={searchParam?.id} />}
                        {id === "chat-seller" && <ChatSellers user={user} currId={searchParam?.id} />}
                    </div>
                </div>
            </div>
        ) : (
            <div className='text-center text-4xl'>{user?.error}</div>
        )
    )
}