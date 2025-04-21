import Table from "./Table";
import Order from "@/models/Order";
import dbConnect from "@/utils/dbConnect";
import OrderStatusSelect from "./OrderStatusSelect";

const getOrders = async({ userId, status }) => {
    try {
        dbConnect();
        const orders = status ? await Order.find({ customerId: userId,deliveryStatus: status }) : await Order.find({ customerId: userId });
        return orders;
    } catch(err) {
        return { error: "Sever Side Error !"}
    }
}

export default async function Orders({ user, status }) {
    const orders = await getOrders({ userId: user?.id, status })

    return (
        <div className="p-3 rounded-lg bg-white mb-4">
            <div className="flex justify-between items-center text-black">
                <h2 className="text-2xl text-center">Recent Orders</h2>
                <OrderStatusSelect />
            </div>
            <Table data={orders} />
        </div>
    )
}