import Table from "./Table";
import Card from "../others/Card";
import Order from "@/models/Order";
import dbConnect from "@/utils/dbConnect";
import { AiOutlineShoppingCart } from "react-icons/ai";

const getOrders = async({ id }) => {
    try {
        dbConnect();
        const orders = await Order.find({customerId: id}).sort({createdAt: -1}).limit(5);
        const countOrders = await Order.find({customerId: id}).countDocuments();
        const pending = await Order.find({customerId: id, deliveryStatus: "pending"}).countDocuments();
        const cancelled = await Order.find({customerId: id, deliveryStatus: "cancelled"}).countDocuments();

        return { orders, pending, cancelled, countOrders }
    } catch(err) {
        return { error : "Server Side Error !" }
    }
}

export default async function Dashboard({ userInfo }) {
    const { orders, pending, cancelled, countOrders } = await getOrders({id: userInfo?.id});

    return (
        <div>
            <div className="sm:grid gap-3 lg:grid-cols-3 sm:grid-cols-2">
                <Card
                    bgColor="white"
                    textColor="blue-800"
                    textSize="2xl"
                    count={countOrders || 0} 
                    text="Orders" 
                    icon={<AiOutlineShoppingCart />}
                />
                <Card
                    bgColor="white"
                    textColor="green-900"
                    textSize="2xl"
                    count={pending || 0} 
                    text="Pending Orders" 
                    icon={<AiOutlineShoppingCart />}
                />
                <Card
                    bgColor="white"
                    textColor="blue-900"
                    textSize="2xl"
                    count={cancelled || 0}
                    text="Cancelled Order" 
                    icon={<AiOutlineShoppingCart />}
                />
            </div>

            <Table data={orders} />
        </div>
    )
}