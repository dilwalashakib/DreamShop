'use server';

import moment from 'moment';
import bcrypt from 'bcrypt';
import Stripe from 'stripe';
import jwt from "jsonwebtoken";
import Order from '@/models/Order';
import { cookies } from 'next/headers';
import Customer from "@/models/Customer";
import dbConnect from "@/utils/dbConnect";
import AdminWallet from '@/models/AdminWallet';
import AuthorOrder from '@/models/AuthorOrder';
import SellerWallet from '@/models/SellerWallet';
import { registerValidator } from "@/utils/validator";

export async function customerRegister({name, email, password}) {
    try {
        dbConnect();
        const { isValid, error } = registerValidator({name, email, password});

        if(isValid) {
            const findEmail = await Customer.findOne({email: email});

            if(!findEmail) {
                const hassPassword = await bcrypt.hash(password, 10);

                const customer = await Customer.create({
                    name,
                    email,
                    password: hassPassword,
                    method: 'credentials'
                });

                const token = jwt.sign({
                    id: customer._id,
                    name,
                    email,
                    role: customer?.role
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
                    success: "Register Successfull",
                    token
                }

            } else {
                return {error: "Email Already Exists !"}
            }
        } else {
            return { error }
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

export async function customerLogin({email, password}) {
    try {
        dbConnect();

        if(email && password) {
            const findEmail = await Customer.findOne({email: email});

            if(findEmail) {
                const hassPassword = await bcrypt.compare(password, findEmail?.password);

                if(hassPassword) {
                    const token = jwt.sign({
                        id: findEmail?._id,
                        name: findEmail?.name,
                        email: findEmail?.email,
                        role: findEmail?.role
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
                    }
                } else {
                    return {error: "UnAuthorized !"}
                }
            } else {
                return {error: "UnAuthorized !"}
            }
        } else {
            return {error: "UnAuthorized !"}
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

// Stripe Payment Customer
export async function stripePaymentCheckout(id) {
    try {
        dbConnect();
        const order = await Order.findById(id);
        const shippingOptions = [
            {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: order?.shippingFee * 100,
                    currency: 'usd',
                  },
                  display_name: 'Shipping Fee',
                },
            },
        ]

        const lineItems = order?.products?.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: (item.price - Math.floor(item.price * item?.discount / 100)) * 100,
            },
            quantity: item.qty,
        }));

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_options: shippingOptions,
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.SHOP_URL}/payment/thank-you`,
            cancel_url: `${process.env.SHOP_URL}`
        });
        (await cookies()).set("orderId", id);

        return {sessionId: session?.id}
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}
// Order Info Change When Order Success
export async function orderInfoChange() {
    try {
        dbConnect();
        const token = cookies().get("orderId");
        if(token?.value) {
            await AuthorOrder.updateMany({orderId: token.value}, { $set : {paymentStatus: "paid"}});
            const customerOrder = await Order.findByIdAndUpdate(token.value, {paymentStatus: "paid"});
            const authOrder = await AuthorOrder.find({ orderId: token.value });

            const time = moment(Date.now()).format("l").split("/");

            authOrder?.forEach(async(item) => (
                await SellerWallet.create({
                    sellerId: item?.sellerId,
                    amount: item.price,
                    month: time[0],
                    year: time[2]
                })
            ));

            await AdminWallet.create({
                amount: customerOrder.price,
                month: time[0],
                year: time[2]
            });

            return { success: "success" }
        } else {
            return { error: "You Are not Access This page !" };
        }
    } catch(err) {
        return { error: "Server Side Error !" };
    }
}

// orderId Cookies Remove
export async function orderIdCookiesRemove() {
    try {
        (await cookies()).delete("orderId");
        return {success: "success"}
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

