"use server"

import Wishlist from "@/models/Wishlist";
import dbConnect from "@/utils/dbConnect";

// Add Wishlist
export async function addWishlist({userId, productId}) {
    try {
        dbConnect();

        const product = await Wishlist.findOne({
            $and: [
                {userId: {$eq: userId}},
                {productId: {$eq: productId}}
            ]
        });

        if(!product) {
            await Wishlist.create({
                userId,
                productId
            });
            return { 
                success: "add to Wishlist !"
            }
        } else {
            return {error: "Wishlist Already Added !"};
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

// Remove Wishlist
export async function removeWishlist({ wishlistId }) {
    try {
        dbConnect();
        await Wishlist.findByIdAndDelete(wishlistId);

        return { 
            success: "Wishlist remove successfull !",
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}
