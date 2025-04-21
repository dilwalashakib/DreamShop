"use client"

import { useState } from "react";
import Input from "../others/Input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createOrder } from "@/actions/orderActions";

export default function ShippingInfo({ cart, userId, price, shippingFee, items }) {
    const router = useRouter();
    const [show, setShow] = useState(true);
    const [process, setProcess] = useState(false);
    const [state, setState] = useState({});
    const btnHandler = (e) => {
        setShow(true)
        setProcess(false)
    }

    const shippingAction = (formData) => {
        const { name, phone, address, postCode, division, city, area } = Object.fromEntries(formData);

        if(name && phone && address && postCode && division && city && area) {
            setShow(false);
            setProcess(true);
            setState({ name, phone, address, postCode, division, city, area });
        } else {
            toast.error("Please Insert valid information")
        }
    }

    
    const placeOrder = async(e) => {
        const data = {
            customerId: userId,
            shippingInfo: state,
            myProduct: cart,
            shippingFee,
            price: price + shippingFee,
        }
    
        const response = await createOrder(data);

        if(response?.success) {
            toast.success(response?.success);
            router.push(`/payment?orderId=${response?.orderId}&price=${price+shippingFee}&items=${items}`)
        }
    }

    return (
        <div className="lg:grid grid-cols-9 gap-4 px-8 py-3 w-full">
            <div className="col-span-6">
                {show ? (
                    <form action={shippingAction} className="bg-white rounded-lg p-5">
                        <h2 className="text-3xl py-4 text-black text-center">Shipping Information</h2>

                        <div className="grid grid-cols-2 gap-5 w-full mt-4">
                            <div>
                                <Input
                                    inputColor="black"
                                    labelColor="black"
                                    label="Name"
                                    name="name"
                                    type="text"
                                    placeholder="type your name"
                                />
                                <Input
                                    inputColor="black"
                                    labelColor="black"
                                    label="Address"
                                    name="address"
                                    type="text"
                                    placeholder="type your address"
                                />
                                
                                <Input
                                    inputColor="black"
                                    labelColor="black"
                                    label="Phone"
                                    name="phone"
                                    type="text"
                                    placeholder="type your phone Number"
                                />
                                <Input
                                    inputColor="black"
                                    labelColor="black"
                                    label="Area"
                                    name="area"
                                    type="text"
                                    placeholder="type your area"
                                />
                            </div>
                            
                            <div>
                                <Input
                                    inputColor="black"
                                    labelColor="black"
                                    label="Post Code"
                                    name="postCode"
                                    type="text"
                                    placeholder="type your Post Code"
                                />

                                <Input
                                    inputColor="black"
                                    labelColor="black"
                                    label="Division"
                                    name="division"
                                    type="text"
                                    placeholder="type your division"
                                />
                                <Input
                                    inputColor="black"
                                    labelColor="black"
                                    label="City"
                                    name="city"
                                    type="text"
                                    placeholder="type your city"
                                />
                            </div>
                        </div>    

                        <button className='py-2 px-5 bg-green-600 rounded-lg  w-full text-xl hover:bg-green-900 duration-500 mt-3 cursor-pointer'>Save</button>
                    </form>
                ) : (
                    <div className="text-black text-2xl p-5 bg-white rounded-lg">
                        <h2>Delivered to {state?.name}</h2>
                        <div className="text-xl py-4">
                            <p>
                                <span>Name: {state?.name} - </span>
                                <span>Phone: {state?.phone}</span>
                            </p>
                            <p>
                                <span>Address: {state?.address} - </span>
                                <span>City: {state?.city}</span>
                            </p>
                            <p>
                                <span>Post Code: {state?.postCode} - </span>
                                <span>Division: {state?.division} - </span> 
                                <span>Area: {state?.area} </span> 
                            </p>
                            
                            <button 
                                onClick={btnHandler} 
                                className="px-4 py-2 bg-blue-300 mt-3 rounded-lg hover:bg-gray-300 cursor-pointer">
                                change
                            </button>      
                        </div>
                        <p>Email to : dilwala446@gmail.com</p>
                    </div>
                )}
            </div>

            <div className="col-span-3 text-black">
                <div className="bg-white rounded-lg px-5 py-5">
                    <h3 className="text-3xl mb-2">Order Summary</h3>
                    <div className="flex justify-between items-center py-2 text-2xl">
                        <span>Items ({ items }) : </span>
                        <span>${price}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 text-2xl">
                        <span>Shipping Fee : </span>
                        <span>${shippingFee}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 text-2xl">
                        <span>Total : </span>
                        <span>${price+shippingFee}</span>
                    </div>

                    {process && <button onClick={placeOrder} className="text-center bg-yellow-600 py-2 px-4 rounded-lg text-white hover:bg-green-700 duration-500 w-full mt-2 text-xl cursor-pointer">Place Order</button>}
                </div>
            </div>
        </div>
    )
}