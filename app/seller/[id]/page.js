import jwt from "jsonwebtoken";
import Seller from "@/models/Seller";
import { cookies } from "next/headers";
import dbConnect from "@/utils/dbConnect";
import { ToastContainer } from "react-toastify";
import Header from "@/components/others/Header";
import Orders from "@/components/seller/Orders";
import Sidebar from "@/components/others/Sidebar";
import Profile from "@/components/seller/Profile";
import Payments from "@/components/seller/Payments";
import Products from "@/components/seller/Products";
import Dashboard from "@/components/seller/Dashboard";
import AddBanner from "@/components/seller/AddBanner";
import AddProduct from "@/components/seller/AddProduct";
import ChatSupport from "@/components/seller/ChatSupport";
import EditProduct from "@/components/seller/EditProduct";
import OrderDetails from "@/components/seller/OrderDetails";
import ChatCustomer from "@/components/seller/ChatCustomer";

const getUserInfo = async() => {
    const cookie = await cookies();
    const info = cookie.get("userInfo");
    if(info?.value) {
        const userInfo = jwt.verify(info.value, process.env.TOKEN_SECRET_KEY);
        // Get Update UserInfo From Database
        dbConnect();
        const { _id, name, email, role, status, payment, image, shopInfo} = await Seller.findOne({_id: userInfo.id}).select('-password');
        
        return { userInfo : JSON.stringify({ id: _id, name, email, role, status, payment, image, shopInfo })}
    } else {
        return {error: "You are not access This page !"}
    }
}

export default async function Sellers({ params, searchParams }) {
    const { id } = await params;
    const searchParam = await searchParams;
    const info = await getUserInfo();
    const user = info?.userInfo && JSON.parse(info.userInfo);

    return (
        user?.role === "seller" ? (
            <div className='md:grid md:grid-cols-5 h-[100vh]'>
                <div className='max-md:hidden h-[100vh]'>
                    <Sidebar 
                        id={id} 
                        role={user?.role} 
                        status={user?.status} 
                    />
                </div>
                
                <div className="col-span-4 md:pt-2 h-[100vh] overflow-y-scroll">
                    <ToastContainer position="top-right" limit={1} />
                    {user?.status === 'active' && <Header id={id} info={user} />}

                    { user?.status === 'active' && 
                        <div className="max-md:mt-[75px]">
                            {id === "dashboard" && <Dashboard user={user} />}
                            {id === "all-product" && <Products userId={user?.id} searchParams={searchParam} />}
                            {id === "add-product" && <AddProduct userInfo={user} />}
                            {id === "add-banner" && <AddBanner id={searchParam?.id} />}
                            {id === "edit-product" && <EditProduct id={searchParam?.id} />}
                            {id === "orders" && <Orders userId={user?.id} searchParams={searchParam} />}
                            {id === "order-details" && <OrderDetails id={searchParam?.id} />}
                            {id === "payments" && <Payments user={user} />}
                            {id === "chat-customer" && <ChatCustomer user={user} currId={searchParam?.id} />}
                            {id === "chat-support" && <ChatSupport user={user} />}
                            {id === "profile" && <Profile user={user} />}
                        </div>
                    }

                    { user?.status === 'deactive' && 
                        <div>
                            {id === "payments" && <Payments />}
                            {id === "chat-support" && <ChatSupport user={user} />}
                            {id === "profile" && <Profile user={user} />}
                        </div> 
                    } 
                    { user?.status === 'pending' &&
                        <div>
                            {id === "profile" && <Profile user={user} />}
                            {id === "chat-support" && <ChatSupport user={user} />}
                        </div>
                    }
                </div>
            </div>
        ) : (
            <div className='text-center text-4xl'>{user?.error}</div>
        )
    )
}