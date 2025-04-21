import { Schema, model, models } from "mongoose";

const sellerWalletSchema = Schema({
    sellerId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const SellerWallet = models.SellerWallet || model("SellerWallet", sellerWalletSchema);

export default SellerWallet;

