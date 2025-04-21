import { Schema, model, models } from "mongoose";

const cartSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;