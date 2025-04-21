'use server'

import Cart from "@/models/Cart";
import Order from "@/models/Order";
import moment from "moment/moment";
import dbConnect from "@/utils/dbConnect";
import AuthorOrder from "@/models/AuthorOrder";

// Create Order
export async function createOrder({ customerId, shippingInfo, myProduct, price, shippingFee }) {
    try {
        dbConnect();
        const date = moment(Date.now()).format("LLL");
        const cartId = [];

        const products = JSON.parse(myProduct)?.reduce((acc, curr) => {
            curr.products.forEach(item => {
                cartId.push(item?.cartId);
                acc.push(item);
            });
            return acc;
        }, []);

        // Customer Order Create
        const order = await Order.create({
            customerId,
            products,
            price,
            shippingFee,
            shippingInfo,
            date
        })

        // Author Order Notifiy and Order Create
        JSON.parse(myProduct)?.forEach(async(item) => {
            await AuthorOrder.create({
                orderId: order._id,
                sellerId: item.sellerId,
                products: item.products,
                price: item.savePrice,
                shippingInfo: "Dilwala WereHouse",
                date
            })
        });

        // Delete all Card Data
        cartId.forEach(async(id) => {
            await Cart.findByIdAndDelete(id);
        })
    
        return {
            success: "Order Placed Success !",
            orderId: order?._id?.toString()
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

export async function getSellerOrders({ sellerId, perPage, search, page }) {
    try {
        dbConnect();
        const skipPage = (page - 1) * perPage;
        const countOrder = await AuthorOrder.find({sellerId}).countDocuments();
        if(search) {
            const orders = await AuthorOrder.find({
                $or: [
                    {paymentStatus: {$regex: search, $options: 'i'}},
                    {deliveryStatus: {$regex: search, $options: 'i'}},
                    {_id: search}
                ], sellerId: sellerId}).skip(skipPage).limit(perPage);

            return { orders, countOrder }
        } else {
            const orders = await AuthorOrder.find({sellerId}).skip(skipPage).limit(perPage)

            return { orders, countOrder }
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

// changeDeliveryStatus
export async function changeDeliveryStatus({ id, status, role }) {
    try {
        dbConnect();
        if(status) {
            if(role === "seller") {
                await AuthorOrder.findByIdAndUpdate(id, {
                    deliveryStatus: status
                });
                return { success: "Delivery Status Update Success !"}
            } else {
                await Order.findByIdAndUpdate(id, {
                    deliveryStatus: status
                });
                return { success: "Delivery Status Update Success !"}
            }
            
        } else {
            return { error: "Error Found !"}
        }        
    } catch (err) {
        return { error: "Server Side Error!"}
    }
}



