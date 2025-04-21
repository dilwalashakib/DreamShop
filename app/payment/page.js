import { ToastContainer } from "react-toastify";
import Footer from "@/components/visitor/Footer";
import Header from "@/components/visitor/Header";
import PaymentMethod from "@/components/visitor/PaymentMethod";

export default async function Payment({ searchParams }) {
    const searchParam = await searchParams;
    return (
        <main className="w-full">
            <Header />
            <ToastContainer position="top-right" limit={1} />
            <section className="lg:grid grid-cols-6 gap-6 px-4 bg-slate-300">
                <PaymentMethod orderId={searchParam?.orderId} />
                <div className="col-span-2 mt-3 mb-3 text-black">
                    <div className="bg-white rounded-lg px-5 py-3">
                        <h3 className="text-3xl mb-2">Order Summary</h3>
                        
                        <div className="flex justify-between items-center py-2 text-2xl">
                            <span>Total : </span>
                            <span>${searchParam?.price}</span>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
