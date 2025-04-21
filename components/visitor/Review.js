"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import RatingCreate from "./RatingCreate";
import { useRouter } from "next/navigation";
import { reviewCreate } from "@/actions/reviewActions";

export default function Review({ productId, user }) {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    
    const reviewAction = async(formData) => {
        const reviewMsg = formData.get("review");
        
        if(user?.role === 'customer' && reviewMsg && rating) {   
            const response = await reviewCreate({
                name: user?.name,
                userId: user?.id,
                productId,
                message: reviewMsg,
                rating
            });

            if(response?.success) {
                toast.success(response.success);
                setRating(0);
                router.refresh();
            }
            toast.error(response?.error);
        } else {
            setRating(0);
            toast.error("You Are Not A Customer!")
        } 
    }

    return (
        <form action={reviewAction} className="text-black mt-5 text-3xl px-1">
            <textarea
                name="review"
                className="w-full text-xl p-2 h-[30vh] rounded-lg border-2 border-gray-300 outline-hidden" 
                placeholder="type something..." 
            />
            <div className="py-2">
                <RatingCreate 
                    count={5} 
                    rating={rating} 
                    setRating={setRating} 
                />
            </div>
            <button
                className={`text-2xl py-2 px-8 bg-indigo-900 text-white hover:bg-green-900 duration-500 mt-4 rounded-lg mb-3 cursor-pointer`}>
                Submit
            </button>
        </form>
    )
}