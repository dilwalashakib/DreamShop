import moment from "moment";
import Order from "@/models/Order";
import dbConnect from "@/utils/dbConnect";
import AuthorOrder from "@/models/AuthorOrder";
import SelectOrderStatus from "../others/SelectOrderStatus";

const getOrders = async(id) => {
    try {
        dbConnect();
        const order = await Order.findById(id);
        const sellerOrders = await AuthorOrder.find({orderId: id});
        return { order, sellerOrders }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}
export default async function OrderDetails({ id }) {
    const { order, sellerOrders } = await getOrders(id);

    return (
        <div className='text-xl'>
            <div className='flex items-center justify-between py-2 bg-slate-700 px-2 mb-3'>
                <h2>Order Details</h2>
                <SelectOrderStatus 
                    id={id} 
                    deliveryStatus={order?.deliveryStatus}
                    role="admin"
                />
            </div>
            <div>
                <div>
                    <div className='flex gap-6 items-center'>
                        <h2>{id}</h2>
                        <p>{moment(order?.createdAt).format("LLL")}</p>
                    </div>
                    <h2>Delivery to : {order?.shippingInfo?.name}</h2>
                    <p>{order?.shippingInfo?.division}, {order?.shippingInfo?.address},  {order?.shippingInfo?.city}, {order?.shippingInfo?.area},</p>
                    <h2 className="mt-2">Payment Status : <span className={`${order?.paymentStatus === "unpaid" && "bg-red-600"} bg-green-600 py-1 px-3 rounded-xl`}>{order?.paymentStatus}</span></h2>
                    <h2>Price : ${order?.price}</h2>

                    {order?.products.map((item, i) => (
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

                {sellerOrders?.map((item, i) => (
                    <div key={i} className='py-4 text-xl'>
                        <h2>Seller {i+1} Order : <span className={`${item?.deliveryStatus === "cancelled" && "bg-red-600"} bg-green-700 py-2 px-3 rounded-xl`}>{item?.deliveryStatus}</span></h2>
                        {item?.products?.map((product, idx) => (
                            <div key={idx} className='flex gap-4 items-center mt-3'>
                                <img className='w-36 h-24 rounded-md object-cover' src={product?.image} />
                                <div>
                                    <h4>{product?.name}</h4>
                                    <p>Brand: {product?.brand}</p>
                                    <p>Quality: {product?.qty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
