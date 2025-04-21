"use server";

import Product from "@/models/Product";
import Review from "@/models/Review";
import dbConnect from "@/utils/dbConnect";
import mongoose from "mongoose";

// Review Get
export async function getReviews({ productId, page }) {
    try {
        dbConnect();

        const perPage = 10;
        const skipPage = (page - 1) * perPage;

        const totalCount = await Review.find({productId: productId}).countDocuments();

        const reviews = await Review.find({productId: productId}).sort({createdAt: -1}).skip(skipPage).limit(perPage);
        
        const countReviews = await Review.aggregate([
            {
                $match: {
                    productId: {$eq: new mongoose.Types.ObjectId(productId)}
                }
            },
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {_id: -1}
            }
        ]);        
        const rating = await Product.findOne({_id: productId}).select("-_id rating");

        return {
            totalCount,
            rating: rating?.rating,
            reviews,
            countReviews,
            perPage
        }
        
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}


// Review Create
export async function reviewCreate({ name, userId, productId, message, rating }) {
    try {
        dbConnect();
        if(name && productId && message && rating) {
            const review = await Review.create({
                userId,
                name,
                productId,
                message,
                rating
            });
            const reviews = await Review.find({productId: productId});
            
            const calculateReview = reviews.reduce((acc, curr) => acc + curr.rating, 0);

            const finalReview = calculateReview / reviews.length;

            await Product.findByIdAndUpdate(productId, {
                rating: finalReview.toFixed(1)
            })
        
            return {
                success: "Review add Successfull !",
                review: JSON.stringify(review)
            }
        } else {
            return { error: "Please Provide Your Value !"}
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}
