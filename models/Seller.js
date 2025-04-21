import { Schema, model, models } from "mongoose";

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'seller'
    },
    status: {
        type: String,
        default: 'pending'
    },
    payment: {
        type: String,
        default: 'inactive'
    },
    method: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        default: {}
    },
    shopInfo: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

const Seller = models.Seller || model("Seller", sellerSchema);

export default Seller;