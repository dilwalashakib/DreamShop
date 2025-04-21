import Table from "./Table";
import Order from "@/models/Order";
import Search from "../others/Search";
import dbConnect from "@/utils/dbConnect";
import Pagination from "../others/Pagination";

const getOrders = async({ search, perPage }) => {
    try {
        dbConnect();
        const orders = search ? await Order.find({$or: [{_id: search}, {paymentStatus: search}, {deliveryStatus: search}]}) : await Order.find().sort({createdAt: -1});

        return { orders };
    } catch(err) {
        return { error: "Server Side Error!"}
    }
}

export default async function Orders({ searchParams }) {
    const { orders } = await getOrders(searchParams);
    return (
        <div>
            <Search path="/admin/orders" />
            <Table data={orders} />
            
            {/* {countSeller > searchParams?.perPage && (
                <Paginatiog 
                    path="/admin/sellers"
                    total={countSeller}
                    perPage={searchParams?.perPage}
                />
            )} */}  
        </div>
    )
}