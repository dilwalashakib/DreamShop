"use client"

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { cartRemove, decrementCartItem, incrementCartItem } from "@/actions/cartActions";

export default function CartItem({ btn, items, item, stockProduct }) {
    const router = useRouter();
    item = item && JSON.parse(item);
    
    const deleteCart = async(id) => {
        const response = await cartRemove(id);
        toast.success(response?.success);
        router.refresh();
    }
    
    const increment = async({ id, stock, qty }) => {
        if(qty <= stock) {
            const response = await incrementCartItem({
                id, 
                qty: qty + 1
            });
            toast.success(response?.success);
            router.refresh()
        }
    }
      
    const decrement = async({ id, qty }) => {
        if(qty > 1) {
            const response = await decrementCartItem({
                id, 
                qty: qty - 1
            });        
            toast.success(response?.success);
            router.refresh()
        } else {
            toast.error("At least 1 item select")
        }
    }
    
    return (
        stockProduct ? (
            JSON.parse(items)?.products?.map((item, i) => (
                <div key={i} className={`${btn ? "md:grid" : "flex"} grid-cols-10 justify-between w-full gap-3 py-4 px-3`}>
                    <div className="sm:flex max-sm:justify-center items-center gap-2 col-span-6">
                        <img
                            className="max-sm:w-full sm:h-20 sm:w-28 rounded-lg object-cover"
                            src={item?.image.url}
                            alt="product image"
                        />
                        <div className="text-xl text-black">
                            <h3>{item?.name.slice(0, 50)}</h3>
                            <p className="text-gray-700 py-1">Brand: {item?.brand}</p>
                        </div>
                    </div>
    
                    {item?.discount ? (
                        <div className="max-md:flex justify-around max-md:py-4 text-black col-span-2">
                            <p className="text-lg font-semibold">
                                {(item.price - Math.floor(item.price * item?.discount / 100)) * item.qty}
                            </p>
                            <del className="text-lg">${item.qty * item.price}</del>
                            <p>-{item.discount}%</p>
                        </div>
                    ) : (
                        <div className="max-md:py-4 text-black col-span-2">
                            <p className="text-lg font-semibold">${item.qty * item?.price}</p>
                        </div>
                    )}
    
                    {btn && <div className="text-black col-span-2">
                        <div className="border-2 border-gray-300 text-xl p-2 flex gap-3 justify-around rounded-lg">
                            <button
                                className="p-2 bg-green-900 rounded-full text-white hover:bg-blue-700 duration-500 cursor-pointer"
                                onClick={(e) => decrement({
                                    id: item.cartId,
                                    qty: item.qty
                                })}>
                                    <AiOutlineMinus />
                            </button>
                            <span>{item?.qty}</span>
                            <button
                                onClick={(e) => increment({
                                    id: item.cartId, 
                                    stock: item.stock, 
                                    qty: item.qty
                                })}
                                className="p-2 bg-green-900 rounded-full text-white hover:bg-blue-700 duration-500 cursor-pointer">
                                    <AiOutlinePlus />
                            </button>
                        </div>
                        <div>
                            <button onClick={(e) => deleteCart(item.cartId)} className="text-xl py-2 bg-red-600 text-white w-full mt-2 rounded-lg hover:bg-red-900 duration-500 cursor-pointer">delete</button>
                        </div>
                    </div>}
                </div>
            ))
        ) : (
            <div className={`${btn ? "md:grid" : "md:flex"} grid-cols-10 justify-between w-full gap-3 py-4 px-3 bg-white mt-2 max-md:border-b border-gray-500`}>
                <div className="sm:flex max-sm:justify-center items-center gap-2 col-span-6">
                    <img
                        className="max-sm:w-full sm:h-20 sm:w-28 rounded-lg object-cover"
                        src={item.image.url}
                        alt="product image"
                    />
                    <div className="text-xl text-black">
                        <h3>{item.name.slice(0, 40)}</h3>
                        <p className="text-gray-700 py-1">Brand: {item.brand}</p>
                    </div>
                </div>

                {item.discount ? (
                    <div className="max-md:flex justify-around max-md:py-4 text-black col-span-2">
                        <p className="text-lg font-semibold">
                            {(item.qty * item.price) - Math.floor(item.price * (item.qty * item.discount)/100)}
                        </p>
                        <del className="text-lg">${item.qty * item?.price}</del>
                        <p>-{item?.discount}%</p>
                    </div>
                ) : (
                    <div className="max-md:py-4 text-black col-span-2">
                        <p className="text-lg font-semibold">${item.qty * item?.price}</p>
                    </div>
                )}

                {btn && <div className="text-black col-span-2">
                    <div className="border-2 border-gray-300 text-xl p-2 flex gap-3 justify-around rounded-lg">
                        <button className="p-2 bg-green-900 rounded-full text-white hover:bg-blue-700 duration-500 cursor-pointer" onClick={(e) => decrement({ id: item.cartId, qty: item.qty })}>
                            <AiOutlineMinus />
                        </button>
                        <span>{item?.qty}</span>
                        <button className="p-2 bg-green-900 rounded-full text-white hover:bg-blue-700 duration-500 cursor-pointer"><AiOutlinePlus /></button>
                    </div>
                    <div>
                        <button onClick={(e) => deleteCart(item.cartId)} className="text-xl py-2 bg-red-600 text-white w-full mt-2 rounded-lg hover:bg-red-900 duration-500 cursor-pointer">delete </button>
                    </div>
                </div>}
            </div>
        )
    )
}