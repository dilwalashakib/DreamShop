"use server"

import bcrypt from "bcrypt";
import Stripe from "stripe";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import Seller from "@/models/Seller";
import Banner from "@/models/Banner";
import { cookies } from "next/headers";
import StripeModel from "@/models/Stripe";
import dbConnect from "@/utils/dbConnect";
import { fileUpload } from "./fileUploadAction";
import WithdrawRequest from "@/models/WithdrawRequest";

// Seller Login
export async function sellerLogin({ email, password }) {
    try {
        dbConnect();

        if(email && password) {
            const findEmail = await Seller.findOne({email: email});
            const hassPass = await bcrypt.compare(password, findEmail.password);

            if(findEmail && hassPass) {     
                const token = jwt.sign({
                    id: findEmail._id,
                    name: findEmail.name,
                    email: findEmail.email,
                    image: findEmail.image,
                    role: findEmail.role,
                    status: findEmail.status,
                    payment: findEmail.payment
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
                    success: "Login Success",
                    token
                };

            } else {
                return {error: "UnAuthorized"}
            }
        } else {
            return {error: "UnAuthorized"}
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

// Seller Register
export async function sellerRegister({ name, email, password }) {
    try {
        dbConnect();

        if(name && email && password) {
            const findEmail = await Seller.findOne({email: email});

            if(!findEmail) {
                const hassPassword = await bcrypt.hash(password, 10);

                const user = await Seller.create({
                    name,
                    email,
                    password: hassPassword,
                    method: 'credentials'
                });

                const token = jwt.sign({
                    id: user._id,
                    name,
                    email,
                    role: user.role,
                    status: user.status,
                    payment: user.payment
                }, process.env.TOKEN_SECRET_KEY, {
                    expiresIn: '30d'
                });
                 
                const day = Date.now() + 60 * 60 * 24 * 30 * 1000;
                const cookie = await cookies();
                cookie.set({
                    name: 'userInfo',
                    value: token,
                    httpOnly: true,
                    path: '/',
                    expires: day
                });

                return {
                    success: "Register Success",
                    token
                };

            } else {
                return {error: "Seller Already Exists!"}
            }
        } else {
            return {error: "UnAuthorized"}
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

export async function stripeAccountActive({ id }) {
    try {
        dbConnect();
        const stripePayment = new Stripe(process.env.STRIPE_SECRET_KEY);

        const stripeInfo = await StripeModel.findOne({ sellerId: id });

        if(stripeInfo) {
            await StripeModel.deleteOne({sellerId: id});
        }
        const account = await stripePayment.accounts.create({
            type: "express"
        });

        const info = await StripeModel.create({
            sellerId: id,
            stripeId: account.id
        });

        const accountLink = await stripePayment.accountLinks.create({
            account: account.id,
            refresh_url: "http://localhost:3000/payment/refresh",
            return_url: `http://localhost:3000/payment/success?activeId=${info?._id}`,
            type: 'account_onboarding',
        });

        return { success: "Success", url: accountLink.url}
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

export async function sellerInfoChange({ id }) {
    try {
        dbConnect();
        const seller = await Seller.findByIdAndUpdate(id, {payment: "active"});

        const token = jwt.sign({
            id: seller._id,
            name: seller.name,
            email: seller.email,
            role: seller.role,
            status: seller.status,
            image: seller.image,
            payment: "active",
            shopInfo: seller?.shopInfo,
        }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: '30d'
        });
        cookies().delete("userInfo");

        const day = Date.now() + 60 * 60 * 24 * 30 * 1000;
        cookies().set({
            name: 'userInfo',
            value: token,
            httpOnly: true,
            path: '/',
            expires: day
        });
        return { success: "Success" }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

export async function createPaymentRequest({ sellerId, amount }) {
    try {
        dbConnect();
        if(sellerId && amount) {
            await WithdrawRequest.create({
                sellerId,
                amount
            });
            return { success: "Payment Request Send!"}
        } else {
            return { error: "UnAuthorized !"}
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

export async function addProductBanner({ id, file }) {
    try {
        dbConnect();
        const { public_id, url, tempDir } = await fileUpload(file);

        await Banner.create({ 
            productId: id,
            url,
            publicId: public_id
        });

        // remove from temp Local Directory
        fs.unlink(tempDir);

        return { success: "Banner Add Success", url }
    } catch(err) {
        console.log(err);
        
        return { error: "Server Side Error !"}
    }
}

export async function deleteBanner({ productId }) {
    try {
        dbConnect();
        const { publicId } = await Banner.findOne({ productId });
            
        await Banner.deleteOne({ productId });

        publicId && await cloudinary.v2.uploader.destroy(publicId);
        
        return { success: "Banner Delete Success" }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}