import { Schema, model, models } from "mongoose";

const orderSchema = Schema({
    customerId: {
        type: Schema.Types.ObjectId,
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
    shippingFee: {
        type: Number,
        required: true
    },
    shippingInfo: {
        type: Object,
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

const Order = models.Order || model("Order", orderSchema);

export default Order;