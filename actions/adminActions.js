"use server"

import fs from "fs/promises";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin";
import cloudinary from "cloudinary";
import Seller from "@/models/Seller";
import { cookies } from "next/headers";
import Category from "@/models/Category";
import dbConnect from "@/utils/dbConnect";
import StripeModel from "@/models/Stripe";
import WithdrawRequest from "@/models/WithdrawRequest";
import { fileUpload } from './fileUploadAction';

// cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// Admin Login
export async function adminLogin({email, password}) {
    try {
        dbConnect();

        if(email && password) {
            const findEmail = await Admin.findOne({email: email});
            const hassPass = await bcrypt.compare(password, findEmail.password);

            if(findEmail && hassPass) {            
                const token = jwt.sign({
                    id: findEmail._id,
                    name: findEmail.name,
                    email: findEmail.email,
                    role: findEmail.role,
                }, process.env.TOKEN_SECRET_KEY, {
                    expiresIn: '30d'
                });

                const day = Date.now() + 60 * 60 * 24 * 30 * 1000;
                (await cookies()).set({
                    name: 'userInfo',
                    value: token,
                    httpOnly: true,
                    path: '/',
                    expires: day
                });

                return {
                    success: "Login Successfull",
                    token
                };

            } else {
                return {error: "UnAuthorized"}
            }
        } else {
            return { error: "UnAuthorized !" }
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

// GET Active Sellers
export async function getActiveSellers({ perPage, search, page }) {
    try {
        dbConnect();
        const skipPage = (page - 1) * perPage;
        const countSeller = await Seller.countDocuments({ status: "active"});
        
        if(search) {
            const sellers = await Seller.find({
                $or: [{
                    name: { 
                        $regex: search, 
                        $options: 'i'
                    }
                }, {
                    email: { 
                        $regex: search,
                        $options: 'i'
                    } 
                }],
                status: "active"
            }).skip(skipPage).limit(perPage);

            return {
                success: "success",
                sellers,
                countSeller
            }
        } else {
            const sellers = await Seller.find({status: "active"}).skip(skipPage).limit(perPage)

            return {
                success: "success",
                sellers,
                countSeller
            }
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

// GET Pending Sellers
export async function getPendingSellers({ perPage, search, page }) {
    try {
        dbConnect();
        const skipPage = (page - 1) * perPage;
        const countSeller = await Seller.countDocuments({ status: "pending"});
        
        if(search) {
            const sellers = await Seller.find({
                name: { 
                    $regex: search, 
                    $options: 'i'
                },
                status: "pending"
            }).skip(skipPage).limit(perPage);

            return {
                success: "success",
                sellers: JSON.stringify(sellers),
                countSeller
            }
        } else {
            const sellers = await Seller.find({ status: "pending" }).skip(skipPage).limit(perPage)

            return {
                success: "success",
                sellers: JSON.stringify(sellers),
                countSeller
            }
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

// GET Deactive Sellers
export async function getDeactiveSellers({ perPage, search, page }) {
    try {
        dbConnect();
        const skipPage = (page - 1) * perPage;
        const countSeller = await Seller.countDocuments({ status: "deactive"});
        
        if(search) {
            const sellers = await Seller.find({
                name: { 
                    $regex: search, 
                    $options: 'i'
                },
                status: "deactive"
            }).skip(skipPage).limit(perPage);

            return {
                success: "success",
                sellers: JSON.stringify(sellers),
                countSeller
            }
        } else {
            const sellers = await Seller.find({ status: "deactive" }).skip(skipPage).limit(perPage)

            return {
                success: "success",
                sellers: JSON.stringify(sellers),
                countSeller
            }
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

// Update Product Image
export async function sellerStatusUpdate({ id, status }) {
    try {
        dbConnect();
        const data = await Seller.findByIdAndUpdate(id, { status: status });
        return { 
            success: "Status Update Success", 
            status 
        }
    } catch(err) {
        return { error: "Error Found !" }
    }
}

// Create Category
export async function createCategory({ name, file }) {
    try {
        dbConnect();
        if(name && file) {
            const slug = name.trim().split(' ').join("-");
            const isExist = await Category.findOne({ slug });

            if(!isExist) {
                const { public_id, url, tempDir } = await fileUpload(file);
                
                await Category.create({
                    name,
                    image: url,
                    publicId: public_id,
                    slug
                });
                // remove the image from Local-Temp folder
                fs.unlink(tempDir);

                return {success: "Category successfully Created"}
            } else {
                return {error: "Category Already Exists"}
            }
        } else {
            return {error: "Missing your category name & image!"}
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

// Get Categorys
export async function getCategorys({ perPage, search, page}) {
    try {
        const skipPage = (page - 1) * perPage;
        const count = await Category.find().countDocuments();

        if(search) {
            const categorys = await Category.find({
                name: { 
                    $regex: search, 
                    $options: 'i'
                }}).skip(skipPage).limit(perPage).sort({createdAt: -1});
            return {categorys, count};
        } else {
            const categorys = await Category.find({})
                .skip(skipPage)
                .limit(perPage)
                .sort({createdAt: -1});
            return {categorys, count};
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

// Category Delete
export async function deleteCategory({ id, publicId }) {
    try {
        dbConnect();

        await Category.findByIdAndDelete(id);
        await cloudinary.v2.uploader.destroy(publicId);
        return { success: "Category Successfully Deleted !" }
    } catch(err) {
        return { error: "Error Found !" }
    }
}

// Payment Transfer
export async function paymentTransfer(id) {
    try {
        dbConnect();

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const withdraw = await WithdrawRequest.findById(id);
        const { stripeId } = await StripeModel.findOne({sellerId: withdraw?.sellerId});

        await stripe.transfers.create({
            currency: 'usd',
            amount: withdraw?.amount * 100,
            destination: stripeId,
        });
        await WithdrawRequest.findByIdAndUpdate(id, {status: "withdraw"});

        return { success: "Payment transfer success !" }
    } catch(err) {
        return { error: "Payment transfer Error!" }
    }
}
