import Link from "next/link";
import Stripe from "@/models/Stripe";
import dbConnect from "@/utils/dbConnect";
import SuccessButton from "@/components/seller/SuccessButton";

const getPaymentInfo = async({ id }) => {
    try {
        dbConnect();
        const stripeInfo = await Stripe.findOne({_id: id});
        if(stripeInfo) {
            return { success: "success", sellerId: stripeInfo?.sellerId }
        } else {
            return { error: "Error Found !"}
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

export default async function Success({ activeId }) {
    const info = await getPaymentInfo({ id: activeId});
    return (
        <div className="flex justify-center items-center h-[100vh]">
            {info?.success ? (
                <div className="flex flex-col items-center">
                    <img className="w-60 h-60 rounded-full" src="/images/success.jpg" alt="" />
                    <p className="text-2xl mb-4 text-green-400">{info?.success}</p>
                    <SuccessButton id={info?.sellerId?.toString()} />
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <img className="w-40 h-40" src="/images/error.png" alt="" />
                    <p className="text-2xl mb-4 text-red-400">{info?.error}</p>
                    <Link className="py-2 px-5 bg-red-700 hover:bg-red-500 text-xl" href="/seller/profile">Back To Dashboard</Link>
                </div>
            )}
        </div>
    )
}