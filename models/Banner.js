import { Schema, model, models } from "mongoose";

const bannerSchema = Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Banner = models.Banner || model("Banner", bannerSchema);

export default Banner;