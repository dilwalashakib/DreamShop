import { Schema, model, models } from "mongoose";

const productSchema = Schema({
    sellerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        required: true
    }
}, { timestamps: true });


const Product = models.Product || model("Product", productSchema);

export default Product;

