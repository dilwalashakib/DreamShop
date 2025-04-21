import { Schema, model, models } from "mongoose";

const adminWalletSchema = Schema({
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

const AdminWallet = models.AdminWallet || model("AdminWallet", adminWalletSchema);

export default AdminWallet;

