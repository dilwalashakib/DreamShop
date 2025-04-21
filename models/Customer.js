import { Schema, model, models } from "mongoose";

const customerSchema = new Schema({
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
        default: 'customer'
    },
    method: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;