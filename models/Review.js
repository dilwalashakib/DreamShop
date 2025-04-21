import { Schema, model, models } from "mongoose";

const reviewSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Review = models.Review || model("Review", reviewSchema);

export default Review;