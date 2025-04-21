import { Schema, model, models } from "mongoose";

const customerSellerMessageSchema = Schema({
    senderId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "unseen"
    }
}, { timestamps: true });

const CustomerSellerMessage = models.CustomerSellerMessage || model("CustomerSellerMessage", customerSellerMessageSchema);

export default CustomerSellerMessage;