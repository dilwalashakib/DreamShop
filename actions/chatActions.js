"use server";

import Admin from "@/models/Admin";
import Seller from "@/models/Seller";
import Customer from "@/models/Customer";
import dbConnect from "@/utils/dbConnect";
import CustomerSeller from "@/models/CustomerSeller";
import AdminSellerMessage from "@/models/AdminSellerMessage";
import CustomerSellerMessage from "@/models/CustomerSellerMessage";

// seller Add Customer Chat List
export async function createCustomerSellerChatList({customerId, sellerId}) {
    try {
        dbConnect();
        const seller = await Seller.findById(sellerId);
        const customer = await Customer.findById(customerId);

        const findCustomer = await CustomerSeller.findOne({ myId: customerId });
        const findSeller = await CustomerSeller.findOne({ myId: sellerId });

        if(findCustomer) {
            const findIndex = findCustomer.list.findIndex((item) => item.id.toString() === sellerId);

            if(findIndex > -1) {
                return { error: "Seller already added!" }
            } else {
                await CustomerSeller.updateOne({
                    myId: customerId
                }, {
                    $push: {
                        list: {
                            id: sellerId,
                            name: seller?.shopInfo?.shopName || seller.name,
                            image: seller?.image
                        }
                    }
                })
            }
        } else {
            await CustomerSeller.create({ 
                myId: customerId,
                list: [{
                    id: sellerId,
                    name: seller?.shopInfo.shopName || seller?.name,
                    image: seller?.image
                }]
            })
        }

        if(findSeller) {
            const findIndex = findSeller.list.findIndex((item) => item.id.toString() === customerId);

            if(findIndex > -1) {
                return { error: "Customer already added!" }
            } else {
                await CustomerSeller.updateOne({
                    myId: sellerId
                }, {
                    $push: {
                        list: { 
                            id: customerId,
                            name: customer?.name,
                            image: customer?.image
                        }
                    }
                })
            }            
        } else {
            await CustomerSeller.create({
                myId: sellerId,
                list: [{
                    id: customerId,
                    name: customer?.name,
                    image: customer?.image
                }]
            })
        }

        return {
            success: "success",
            customer: JSON.stringify({
                id: customerId,
                sellerId: sellerId,
                name: customer?.name,
                image: customer?.image
            })
        }
    } catch(err) {
        return {error: "Server Side Error!"}
    }
}

// get Seller Lists
export async function getMessages({ role, customerId, sellerId }) {
    try {
        dbConnect();
        let currentUser = {};

        if(role === "customer" || role === "admin") {
            currentUser = await Seller.findById(sellerId).select("name image shopInfo");
            
        } else if(role === "seller") {
            currentUser = await Customer.findById(customerId).select("name image");
        }

        if(role === "admin") {
            const messages = await AdminSellerMessage.find({
                $or: [{
                    $and: [{senderId: {$eq: customerId}}, {receiverId: {$eq: sellerId}}]
                }, {
                    $and: [{senderId: {$eq: sellerId}}, {receiverId: {$eq: customerId}}]
                }]
            });
            return {
                success: "success",
                messages: JSON.stringify(messages), 
                currentUser: JSON.stringify(currentUser)
            };
        } else {
            const messages = await CustomerSellerMessage.find({
                $or: [{
                    $and: [{senderId: {$eq: customerId}}, {receiverId: {$eq: sellerId}}]
                }, {
                    $and: [{senderId: {$eq: sellerId}}, {receiverId: {$eq: customerId}}]
                }]
            });
            return {
                success: "success",
                messages: JSON.stringify(messages), 
                currentUser: JSON.stringify(currentUser)
            };
        }

    } catch(err) {
        return {error: "Server Side Error!"}
    }
}

// Get Support Message
export async function getSupportMessage({ myId }) {
    try {
        dbConnect()
        const support = await Admin.findOne().select("_id");
        const messages = await AdminSellerMessage.find({
            $or: [{
                $and: [{senderId: {$eq: myId}}, {receiverId: {$eq: support?._id}}]
            }, {
                $and: [{senderId: {$eq: support?._id}}, {receiverId: {$eq: myId}}]
            }]
        });
        return {
            success: "success",
            messages: JSON.stringify(messages)
        }
    } catch(err) {
        return {error: "Server Side Error!"};
    }
}

// Get Support Id
export async function getSupportId() {
    try {
        dbConnect()
        const support = await Admin.findOne().select("_id");
        return {
            success: "success",
            supportId: support?._id?.toString(),
        }
    } catch(err) {
        return {error: "Server Side Error!"};
    }
}

// Create Message
export async function createMessage({ role, senderName, message, senderId, receiverId }) {
    try {
        dbConnect()
        if(role === "admin" ) {
            const msg = await AdminSellerMessage.create({
                senderId,
                senderName,
                message,
                receiverId
            });
            // Seller Update
            await Seller.findOneAndUpdate({_id: receiverId}, {
                updatedAt: msg.createdAt
            });
            
            return {
                success: "success",
                message: JSON.stringify(msg)
            }
        } else {
            const msg = await CustomerSellerMessage.create({
                senderId,
                senderName,
                message,
                receiverId
            });
            // customer update
            const customer = await CustomerSeller.findOne({myId: senderId});
            let customerLists = customer.list;

            const customerIndex = customerLists.findIndex((val) => val.id === receiverId);

            if(customerIndex > 0) {
                const slice = customerLists.splice(customerIndex, 1)[0];
                customerLists.unshift(slice);

                await CustomerSeller.findOneAndUpdate({
                    myId: senderId
                }, {
                    list: customerLists
                });
            }

            // seller update
            const seller = await CustomerSeller.findOne({myId: receiverId});
            let sellerLists = seller.list;

            const sellerIndex = sellerLists.findIndex((val) => val.id === senderId);

            if(sellerIndex > 0) {
                const slice = sellerLists.splice(sellerIndex, 1)[0];
                sellerLists.unshift(slice);

                await CustomerSeller.findOneAndUpdate({
                    myId: receiverId
                }, {
                    list: sellerLists
                });
            }

            return {
                success: "success",
                message: JSON.stringify(msg)
            }
        }
    } catch(err) {
        return {error: "Server Side Error !"}
    }
}

// Create Support Message
export async function createSupportMessage({senderName, message, senderId, receiverId}) {
    try {
        dbConnect()
        const msg = await AdminSellerMessage.create({
            senderId,
            senderName,
            message,
            receiverId
        });
        return {
            success: "success",
            message: JSON.stringify(msg)
        }
    } catch(err) {
        return {error: "Server Side Error !"}
    }
}
