'use client'

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { addWishlist } from "@/actions/wishlistActions";
import { ActiveUserContext } from "@/context/ActiveUserContext";
import { createCustomerSellerChatList } from "@/actions/chatActions";
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { buyNowProductAddCart, cartAdd, decrementCartItem, incrementCartItem } from "@/actions/cartActions";

export default function ProductDetails({userId, userRole, cartQty, cartId, stock, productId, sellerId}) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(cartQty || 0);
    
    const {socket} = useContext(ActiveUserContext);
 
    const addToCart = async(e) => {
        if(userId) {
            const response = await cartAdd({
                userId,
                productId,
                quantity: quantity || 1
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

            if(response?.success) {
                toast.success(response?.success);
                router.refresh();
            }
            toast.error(response?.error);
        } else {
            router.push("/login");
        }
    }

    const increment = async() => {
        if(quantity <= stock) {
            setQuantity((prev) => prev + 1);

            if(cartId) {
                const response = await incrementCartItem({
                    id: cartId,
                    qty: quantity + 1
                });                
                toast.success(response?.success);
            }
        } else {
            toast.error("Quantity Not Available !");
        }
    }
      
    const decrement = async() => {
        if(quantity > 1) {
            setQuantity((prev) => prev - 1);
            if(cartId) {
                const response = await decrementCartItem({
                    id: cartId,
                    qty: quantity - 1
                });
                toast.success(response?.success);
            }
        } else {
            toast.error("At least 1 item select")
        }
    }

    const buyNow = async() => {
        const response = await buyNowProductAddCart({
            userId,
            productId,
            quantity
        });

        if(response?.success) {
            router.push(`/shipping`);
            router.refresh()
        }
    }

    const chatSellerHandler = async(e) => {
        if(userRole === 'customer') {
            const response = await createCustomerSellerChatList({
                customerId: userId,
                sellerId
            });
            if(response?.success) {
                const parseCustomer = JSON.parse(response?.customer);
                socket.emit("addCustomer", parseCustomer);
            }
            router.push(`/customer/chat-seller?id=${sellerId}`);
        } else if(userRole === 'seller') {
            router.push(`/seller/chat-customer`);
        } else {
            router.push('/login');
        }
    }

    return (
        <div>
            <div className="mt-6 md:flex items-center gap-3 w-full">
                {stock && (
                    <div className="bg-gray-300 text-xl py-1.5 px-4 flex gap-4 justify-around items-center rounded-xl">
                        <button onClick={decrement} className="p-2 bg-slate-600 rounded-full text-white duration-500 hover:bg-slate-950 cursor-pointer">
                            <AiOutlineMinus />
                        </button>

                        <span className="text-2xl">{quantity}</span>

                        <button onClick={increment} className="p-2 bg-slate-600 rounded-full text-white duration-500 hover:bg-slate-950 cursor-pointer">
                            <AiOutlinePlus />
                        </button>
                    </div>
                )}
                
                {stock && (
                    <button 
                        onClick={addToCart} 
                        className="max-md:w-full max-md:mt-2 text-xl py-2.5 px-6 bg-yellow-600 outline-hidden border-none text-white rounded-lg hover:bg-yellow-900 duration-500 cursor-pointer">
                            Add To Cart
                    </button>
                )}

                        
                <button onClick={addToWishlist} className="max-md:mt-2 p-2 rounded-full duration-400 cursor-pointer bg-red-200 hover:bg-red-300">
                    <AiOutlineHeart className="text-3xl text-red-500" />
                </button>
            </div>

            <div className="mt-6 border-t-2 broder-gray-500 py-4">
                <div className="flex gap-5">
                    <p>Available : </p>
                    <p>{stock ? 
                        <span className="text-green-800">In Stock ({stock})</span> : 
                        <span className="text-red-500">Out Of Stock</span>}
                    </p>
                </div>
                <div className="flex gap-5 py-2">
                    <p>Share On: </p>
                    <div className="flex gap-3 items-center cursor-pointer text-lg">
                        <FaFacebook />
                        <FaTwitter />
                        <FaLinkedin />
                        <FaInstagram />
                        <FaGithub />
                    </div>
                </div>
                <div className="md:flex items-center gap-3 mt-3">
                    {stock && (
                        <button onClick={buyNow} className="max-md:w-full text-xl py-3 px-6 bg-slate-800 outline-hidden border-none text-white rounded-lg hover:bg-slate-600 duration-500 cursor-pointer">Buy Now</button>
                    )}
                    
                    <button
                        onClick={chatSellerHandler}
                        className="max-md:w-full max-md:mt-2 text-xl py-3 px-6 bg-indigo-800 outline-hidden border-none text-white rounded-lg hover:bg-blue-600 duration-500 cursor-pointer">
                            Chat Seller
                    </button>
                </div>
            </div>
        </div>
    )
}