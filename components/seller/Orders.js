import Link from "next/link";
import Search from "../others/Search";
import Pagination from "../others/Pagination";
import { getSellerOrders } from "@/actions/orderActions";
import Table from "./Table";

export default async function Orders({ userId, searchParams }) {
    const { orders, countOrder } = await getSellerOrders({
        sellerId: userId,
        perPage: searchParams?.perPage,
        search: searchParams?.search,
        page: searchParams?.page
    });
    
    return (
        <div>
            <Search path="/seller/orders" />

            <div className='relative overflow-x-auto'>
                <Table data={orders} />
                {countOrder > searchParams?.perPage && (
                    <Pagination 
                        path="/seller/orders"
                        total={countOrder}
                        perPage={searchParams?.perPage}
                    />
                )}
            </div>            
        </div>
    )
}