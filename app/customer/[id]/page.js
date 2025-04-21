import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/visitor/Header';
import Orders from '@/components/customer/Orders';
import Sidebar from '@/components/customer/Sidebar';
import WishList from '@/components/customer/WishList';
import Dashboard from '@/components/customer/Dashboard';
import ChatSeller from '@/components/customer/ChatSeller';
import OrderDetails from '@/components/customer/OrderDetails';
import ChangePassword from '@/components/customer/ChangePassword';
import ResponsiveSidebar from "@/components/customer/ResponsiveSidebar";

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

export default async function Customer({ params, searchParams }) {
    const user = await getUserInfo();
    const { id } = await params;
    const searchParam = await searchParams;
    
    return (
        <main className="w-full">
            <Header />
            <ToastContainer position='top-right' limit={1} />
            <div>
                {user?.role === "customer" ? (
                    <div className='md:grid gap-1 md:grid-cols-5 bg-slate-300 pr-2 min-h-[74vh]'>
                        <div className="col-span-1">
                            {/* Responsive */}
                            <ResponsiveSidebar id={id} role={user?.role} />
                            
                            <div className='max-md:hidden bg-white mt-2 mb-3 rounded-lg ml-2'>
                                <Sidebar id={id} role={user?.role} />
                            </div>
                        </div>
                        <div className='col-span-4 md:pt-2'>
                            <div>
                                {id === "dashboard" && <Dashboard userInfo={user} />}
                                {id === "orders" && <Orders user={user} status={searchParam?.status} />}
                                {id === "wishlist" && <WishList user={user} />}
                                {id === "chat-seller" && <ChatSeller user={user} currId={searchParam?.id} />}
                                {id === "change-password" && <ChangePassword user={user} />}
                                {id === "order-details" && <OrderDetails id={searchParam?.id} />}
                                {id === "logout" && <div>Logout</div>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='text-center text-4xl'>{user?.error}</div>
                )}
            </div>
        </main>
    )
}