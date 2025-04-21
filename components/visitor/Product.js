"use client"

import Link from "next/link";
import Rating from "./Rating";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { cartAdd } from "@/actions/cartActions";
import { addWishlist, removeWishlist } from "@/actions/wishlistActions";
import { AiFillHeart, AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";

export default function Product({ userId, productId, wishlistId, imgUrl, discount, title, price, rating }) {
    const router = useRouter();

    const addToCart = async(e) => {
        if(userId) {
            const response = await cartAdd({
                userId,
                productId,
                quantity: 1
            });

            if(response?.success) {
                toast.success(response?.success);
                router.refresh();
            }
            toast.error(response?.error);            
        } else {
            router.push("/login");
        }
    }

    const addToWishlist = async(e) => {
        if(userId) {
            const response = await addWishlist({
                userId,
                productId
            });
            toast.success(response?.success);
            router.refresh();
            toast.error(response?.error);
        } else {
            router.push("/login");
        }
    }

    const deleteWishlist = async(e) => {
        if(userId) {
            const response = await removeWishlist({
                wishlistId
            });
            if(response?.success) {
                toast.success(response?.success);
                router.refresh();
            }
            toast.error(response?.error);
        } else {
            router.push("/login");
        }
    }

    return (
        <div className="p-1 border-2 border-gray-200 shadow-xl shadow-gray-200 rounded-lg cursor-pointer hover:mt-[-3px] duration-500 group mt-4">
            <div className="relative ">
                {discount && <div className="absolute top-0 left-0 px-4 py-2 bg-green-600 rounded-lg text-xl text-center font-semibold text-white">-{discount}%</div>}
                
                <img className="w-full h-[40vh] object-cover rounded-lg object-cover" src={imgUrl} alt="Product" />

                <div className="opacity-0 group-hover:opacity-100 duration-500 flex justify-center py-3 text-2xl gap-3 absolute inset-x-0 bottom-0">
                    <Link 
                        href={`/shop/product-details?id=${productId}`}
                        className="text-green-600 bg-gray-100 p-2 rounded-full hover:bg-gray-950 duration-500">
                        <FaEye />
                    </Link>

                    {wishlistId ? (
                        <button 
                            onClick={deleteWishlist}
                            className="text-red-600 bg-gray-100 p-2 rounded-full hover:bg-gray-900 duration-500 cursor-pointer">
                                <AiFillHeart />
                        </button>
                    ) : (
                        <button 
                            onClick={addToWishlist}
                            className="text-red-600 bg-gray-100 p-2 rounded-full hover:bg-gray-900 duration-500 cursor-pointer">
                                <AiOutlineHeart />
                        </button>
                    )}
                    
                    <button
                        onClick={addToCart}
                        className="text-green-600 bg-green-100 p-2 rounded-full hover:bg-gray-950 duration-500 cursor-pointer">
                            <AiOutlineShopping />
                    </button>
                </div>
            </div>
        
            <div className="pt-2 px-2">
                <h3 className="mb-2 text-xl text-blue-900 hover:text-green-700 duration-500">{title?.slice(0, 60)}</h3>
                <div className="flex gap-3 items-center text-xl">
                    <p className="font-semibold text-gray-800">${price}</p>
                    <Rating ratingNum={rating} showNum={rating ? true : false} />
                </div>
            </div>
        </div>
    )
}