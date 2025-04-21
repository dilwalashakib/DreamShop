import { Schema, model, models } from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Category = models.Category || model("Category", categorySchema);

export default Category;