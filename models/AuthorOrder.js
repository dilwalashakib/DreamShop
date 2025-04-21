import { Schema, model, models } from "mongoose";

const authorOrderSchema = Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shippingInfo: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        default: "unpaid"
    },
    deliveryStatus: {
        type: String,
        default: "pending"
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });

const AuthorOrder = models.AuthorOrder || model("AuthorOrder", authorOrderSchema);

export default AuthorOrder;