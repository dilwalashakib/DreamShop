import { Schema, model, models } from "mongoose";

const adminSellerMessageSchema = Schema({
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

const AdminSellerMessage = models.AdminSellerMessage || model("AdminSellerMessage", adminSellerMessageSchema);

export default AdminSellerMessage;