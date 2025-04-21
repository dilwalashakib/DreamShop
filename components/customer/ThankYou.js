import ThankYouButton from "./ThankYouButton";
import { orderInfoChange } from "@/actions/customerActions";

export default async function ThankYou() {
    const info = await orderInfoChange();
    return (
        info?.success ? (
            <div className="flex justify-center items-center h-[100vh]">
                <div className="flex flex-col items-center">
                    <img className="w-60 h-60 rounded-full" src="/images/success.jpg" alt="" />
                    <p className="text-2xl mb-4 text-green-400">Thank You. Payment Success !</p>
                    <ThankYouButton />
                </div>
            </div>
        ) : (
            <div className='text-center text-4xl'>{info?.error}</div>
        )
    )
}