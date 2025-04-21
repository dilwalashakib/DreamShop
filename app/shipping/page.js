import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/visitor/Footer";
import Header from "@/components/visitor/Header";
import { getCarts } from "@/actions/cartActions";
import CartItem from "@/components/visitor/CartItem";
import ShippingInfo from "@/components/customer/ShippingInfo";

const getData = async() => {
    const cookie = await cookies();
    const info = cookie.get("userInfo");
    if(info?.value) {
        const user = jwt.verify(info.value, process.env.TOKEN_SECRET_KEY);
        const { product } = await getCarts({ userId: user?.id});
        return { user, cart: product}
    } else {
        return {error: "You are not access This page !"}
    }
}

export default async function Shipping() {
    const {user, cart} = await getData();
    
    return (
        <main className="w-full bg-gray-200">
            <ToastContainer position="top-right" limit={1} />
            <Header />
            <section className="w-full flex justify-center items-center relative">
                <img
                    className="w-full h-[45vh] object-cover"
                    src="/images/shop-details.jpg" 
                    alt="banner" 
                />
                <div className="absolute">
                    <h2 className="text-6xl font-semibold">Dream Shop</h2>
                </div>
            </section>

            {user?.role === "customer" && (
                <section>
                    <ShippingInfo
                        userId={user?.id}
                        cart={JSON.stringify(cart)}
                        price={cart?.reduce((acc, curr) => acc + curr.totalPrice, 0)}
                        shippingFee={cart?.reduce((acc, curr) => acc + curr.shippingFee, 0)}
                        items={cart?.length}
                    />

                    <div className="px-8 mt-2 mb-3">
                        {cart?.map((item, i) => (
                            <div key={i} className="bg-white rounded-xl mt-2">
                                <h3 className="p-3 text-green-900 text-xl border-b-4 border-gray-200 font-semibold">{item?.shopName}</h3>
                                <CartItem
                                    stockProduct={true}
                                    items={JSON.stringify(item)}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
            <Footer />
        </main>
    )
}
