import { Schema, model, models } from "mongoose";

const withdrawRequestSchema = Schema({
    sellerId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true });

const WithdrawRequest = models.WithdrawRequest || model("WithdrawRequest", withdrawRequestSchema);

export default WithdrawRequest;

