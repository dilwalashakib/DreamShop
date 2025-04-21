import Order from '@/models/Order';
import dbConnect from '@/utils/dbConnect';
import CartItem from '../visitor/CartItem';

const getOrderById = async(id) => {
    try {
        dbConnect();
        const order = await Order.findById(id); 
        return order;
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

export default async function OrderDetails({ id }) {
    const order = await getOrderById(id);
    return (
        <div className='bg-white text-black rounded-lg p-3'>
            <div className='flex gap-5 text-xl'>
                <h2>{id}</h2>
                <p>{order?.date}</p>
            </div>
            <h2 className='text-xl py-2 font-semibold'>Deliver to : {order?.shippingInfo?.name}</h2>
            <div className='text-lg'>
                <span>Division: {order?.shippingInfo?.division} - </span>
                <span>City: {order?.shippingInfo?.city} - </span>
                <span>Address: {order?.shippingInfo?.address} - </span>
                <span>Area: {order?.shippingInfo?.area}</span>
            </div>
            <p className='py-1 font-semibold text-xl'>Price: ${order?.price} includes shipping Fee</p>
            <p className='text-lg'>Email to: dilwala446@gmail.com</p>

            <div className='pt-2'>
                {order?.paymentStatus === 'paid' ? (
                    <div className='flex gap-3 items-center text-xl'>
                        <span>Payment : </span>
                        <span className='px-3 items-center rounded-md text-white bg-green-700'>{order?.paymentStatus}</span>
                    </div>
                ) : (
                    <div className='flex gap-2 items-center text-xl'>
                        <span>Payment :</span>
                        <span className='px-2 items-center rounded-md text-white bg-red-600'>{order?.paymentStatus}</span>
                    </div>
                )}
            </div>

            <div className='mt-2'>
                {order?.deliveryStatus === 'placed' ? (
                    <div className='flex gap-3 text-xl'>
                        <span>Payment : </span>
                        <span className='px-3 items-center rounded-md text-white bg-green-700'>{order?.deliveryStatus}</span>
                    </div>
                ) : (
                    <div className='flex gap-2 items-center text-xl'>
                        <span>Delivery : </span>
                        <span className='px-2 items-center rounded-md text-white bg-red-600'>{order?.deliveryStatus}</span>
                    </div>
                )}
            </div>

            <div className='mt-4'>
                <h2 className='text-2xl'>Products</h2>
                {order?.products?.map((item, i) => (
                    <CartItem key={i} item={JSON.stringify(item)} />
                ))}
            </div>
        </div>
    )
}
