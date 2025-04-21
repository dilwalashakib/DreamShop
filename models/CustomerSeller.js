import { Schema, model, models } from "mongoose";

const customerSellerSchema = Schema({
    myId: {
        type: String,
        required: true
    },
    list: []
}, { timestamps: true });

const CustomerSeller = models.CustomerSeller || model("CustomerSeller", customerSellerSchema);

export default CustomerSeller;