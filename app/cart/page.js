import Link from "next/link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { BiChevronRight } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/visitor/Footer";
import Header from "@/components/visitor/Header";
import { getCarts } from "@/actions/cartActions";
import CartItem from "@/components/visitor/CartItem";

const getData = async() => {
  const cookie = await cookies();
  const info = cookie.get("userInfo");
  if(info?.value) {
      const user = jwt.verify(info.value, process.env.TOKEN_SECRET_KEY);
      const { product, outOfStock } = await getCarts({ userId: user?.id});
      return { user, cart: product, outOfStock}
  } else {
      return {error: "You are not access This page !"}
  }
}

export default async function Cart() {
  const { cart, outOfStock } = await getData();
  
  return (
    <main className="w-full">
      <Header />
      <ToastContainer position="top-right" limit={1} />
      
      <section className="w-full flex justify-center items-center relative">
        <img
            className="w-full h-[45vh] object-cover"
            src={`/images/shop-details.jpg`} 
            alt="banner" 
        />
        <div className="absolute">
          <h2 className="text-6xl font-semibold">Dream Shop</h2>
          <div className="flex items-center justify-center text-2xl mt-4 font-semibold">
            <Link href="/">Home</Link>
            <span className="mt-1 text-3xl"><BiChevronRight /></span>
            <Link href="/cart">Cart</Link>
          </div>
        </div>
      </section>

      <section className="lg:grid grid-cols-6 gap-4 px-4 bg-slate-300">
        <div className="w-full col-span-4">
          <div>
            <h2 className="p-4 text-black my-2 rounded-xl bg-white text-3xl">Stock Product: {cart?.length}</h2>
            
            {cart?.map((item, i) => (
              <div key={i} className="bg-white rounded-xl mt-2 mb-2">
                <h3 className="p-3 text-green-900 text-xl border-b-4 border-gray-200 font-semibold">{item?.shopName}</h3>
                <CartItem
                  btn={true}
                  stockProduct={true}
                  items={JSON.stringify(item)}
                />
              </div>
            ))}
          </div>
          
          {outOfStock?.length > 0 && <div className="mb-3">
            <h2 className="py-3 px-4 text-white my-2 rounded-xl bg-red-600 text-3xl">Out Of Stock: {outOfStock.length}</h2>
            {outOfStock?.map((item, i) => (
              <CartItem
                key={i}
                btn={true}
                item={JSON.stringify(item)}
              />
            ))}
          </div>}
        </div>

        {cart?.length > 0 && <div className="col-span-2 mt-3 text-black">
          <div className="bg-white rounded-lg px-5 py-3">
            <h3 className="text-3xl mb-2">Order Summary</h3>
            <div className="flex justify-between items-center py-2 text-2xl">
              <span>Items({cart?.length}) : </span>
              <span>${cart?.reduce((acc, curr) => acc + curr.totalPrice, 0)}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-2xl">
              <span>Shipping Fee : </span>
              <span>${cart?.reduce((acc, curr) => acc + curr.shippingFee, 0)}</span>
            </div>
            <div className="flex gap-3 justify-between items-center py-2 text-2xl">
              <input 
                className="outline-hidden bg-gray-300 text-xl px-3 py-2 rounded-lg w-full"
                type="text" 
                placeholder="Type your cupon code.." 
              />
              <button className="bg-green-500 px-3 py-2 rounded-lg text-xl">apply</button>
            </div>
            <div className="flex justify-between items-center py-2 text-2xl">
              <span>Total : </span>
              <span>${cart?.reduce((acc, curr) => acc + curr.totalPrice + curr.shippingFee, 0)}</span>
            </div>

            <Link href="/shipping" className="bg-yellow-700 p-2 block text-center rounded-lg text-white hover:bg-green-900 duration-500 w-full mt-2 text-xl">Proceed To Checkout</Link>
          </div>
        </div>}
      </section>
      <Footer />
    </main>
  )
}
