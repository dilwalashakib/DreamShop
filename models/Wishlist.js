import { Schema, model, models } from "mongoose";

const wishlistSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
}, { timestamps: true });


const Wishlist = models.Wishlist || model("Wishlist", wishlistSchema);

export default Wishlist;