import { Schema, model, models } from "mongoose";

const adminSchema = Schema({
    name: {
        type: String,
        required: [true, "please provide your name"]
    },
    email: {
        type: String,
        required: [true, "please provide your email"]
    },
    password: {
        type: String,
        required: [true, "please provide your password"]
    },
    image: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'admin'
    }
}, { timestamps: true });


const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;

