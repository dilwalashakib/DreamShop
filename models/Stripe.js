import { Schema, model, models } from "mongoose";

const stripeSchema = Schema({
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    stripeId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Stripe = models.Stripe || model("Stripe", stripeSchema);

export default Stripe;

