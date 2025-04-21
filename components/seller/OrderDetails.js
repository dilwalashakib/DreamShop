import moment from "moment";
import dbConnect from "@/utils/dbConnect";
import AuthorOrder from "@/models/AuthorOrder";
import SelectOrderStatus from "../others/SelectOrderStatus";

const getOrders = async(id) => {
    try {
        dbConnect();
        const sellerOrders = await AuthorOrder.findOne({_id: id});
        return sellerOrders;
    } catch(err) {
        return {error: "Server Side Error"}
    }
}
export default async function OrderDetails({ id }) {
    const sellerOrders = await getOrders(id);

    return (
        <div className='text-xl'>
            <div className='flex items-center justify-between py-2 bg-slate-700 px-2 mb-3'>
                <h2>Order Details</h2>
                <SelectOrderStatus
                    id={id} 
                    deliveryStatus={sellerOrders?.deliveryStatus}
                    role="seller"
                />
            </div>
            <div>
                <div>
                    <div className='flex gap-6 items-center'>
                        <h2>{id}</h2>
                        <p>{moment(sellerOrders?.createdAt).format("LLL")}</p>
                    </div>
                    <h2>Delivery to : {sellerOrders?.shippingInfo}</h2>
                    <h2 className="mt-2">Payment Status : <span className={`${sellerOrders?.paymentStatus === "unpaid" && "bg-red-600"} bg-green-600 py-1 px-3 rounded-xl`}>{sellerOrders?.paymentStatus}</span></h2>
                    <h2>Price : ${sellerOrders?.price}</h2>

                    {sellerOrders?.products?.map((item, i) => (
                        <div key={i} className='flex gap-4 items-center mt-3'>
                            <img className='w-36 h-24 rounded-md object-cover' src={item?.image} />
                            <div>
                                <h4>{item?.name}</h4>
                                <p>Brand: {item?.brand}</p>
                                <p>Quality: {item?.qty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
