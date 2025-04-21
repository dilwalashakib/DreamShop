'use server';

import Cart from "@/models/Cart";
import dbConnect from "@/utils/dbConnect";

// Get Cart BY Id
export async function getCartById({ productId }) {
    try {
        const cart = await Cart.findOne({productId: productId});

        if(cart) {
            return {
                success: "success",
                cart: JSON.stringify(cart)
            }
        } else {
            return {error: "cart not found!"}
        }
        
        
    } catch(err) {
        console.log(err);
        return { error: "Server Side Error !"}
    }
}

// All Cart
export async function getCarts({ userId }) {
    try {
        dbConnect();

        const product = await Cart.find({ userId: userId })
            .populate("productId", "-description -category -__v -createdAt -updatedAt")
            .select('-__v')

        let outOfStock = [];

        const data = product.reduce((acc, curr) => {
            const p = curr.productId;
            
            if(p.stock > curr.quantity) {
                const index = acc.findIndex((val) => val.sellerId === curr.productId.sellerId);
                
                if(index > -1) {
                    acc[index] = {
                        ...acc[index],
                        totalPrice: acc[index].totalPrice + ((p.price - Math.floor(p.price * p?.discount / 100)) * curr.quantity),
                        savePrice: acc[index].savePrice + ((p.price - Math.floor(p.price * (p?.discount + 5) / 100)) * curr.quantity),
                        products: [...acc[index].products,
                            {   
                                id: p._id,
                                sellerId: p.sellerId,
                                cartId: curr._id,
                                name: p.name,
                                price: p.price,
                                discount: p.discount,
                                brand: p.brand,
                                stock: p.stock,
                                image: p.images[0],
                                qty: curr.quantity
                            }
                        ]
                    }
                } else {
                    acc.push({
                        sellerId: p.sellerId,
                        shopName: p.shopName,
                        totalPrice: (p.price - Math.floor(p.price * p?.discount / 100)) * curr.quantity,
                        savePrice: (p.price - Math.floor(p.price * (p?.discount + 5) / 100)) * curr.quantity,
                        shippingFee: 85,
                        products: [{
                            id: p._id,
                            sellerId: p.sellerId,
                            cartId: curr._id,
                            name: p.name,
                            price: p.price,
                            discount: p.discount,
                            brand: p.brand,
                            stock: p.stock,
                            image: p.images[0],
                            qty: curr.quantity
                        }]
                    })
                }
            } else {
                outOfStock.push({
                    id: p._id,
                    sellerId: p.sellerId,
                    cartId: curr._id,
                    sellerId: p.sellerId,
                    name: p.name,
                    price: p.price,
                    discount: p.discount,
                    brand: p.brand,
                    image: p.images[0],
                    qty: curr.quantity
                })
            }
            return acc;
        }, []);
        return {
            success: "success",
            product: data,
            outOfStock,
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

// Cart Add
export async function cartAdd({userId, productId, quantity}) {
    try {
        dbConnect();

        const product = await Cart.findOne({
            $and: [
                {userId: {$eq: userId}},
                {productId: {$eq: productId}}
            ]
        });

        if(!product) {
            await Cart.create({
                userId,
                productId,
                quantity
            });
            return { 
                success: "Product Add to Cart"
            }
        } else {
            return { error: "Product Already Added !"};
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

// buy Now Product Add Cart
export async function buyNowProductAddCart({userId, productId, quantity}) {
    try {
        dbConnect();

        await Cart.deleteMany();
        await Cart.create({
            userId,
            productId,
            quantity
        });
        return { 
            success: "success"
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

// delete Cart
export async function cartRemove(id) {
    try {
        dbConnect();
        await Cart.findByIdAndDelete(id);
        return { 
            success: "cart product deleted!",
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

// Increment 
export async function incrementCartItem({ id, qty }) {
    try {
        dbConnect();
        await Cart.findByIdAndUpdate(id, {
            quantity: qty
        });
        return { 
            success: `${qty} items add !`,
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

// Decrement 
export async function decrementCartItem({ id, qty }) {
    try {
        dbConnect();
        await Cart.findByIdAndUpdate(id, {
            quantity: qty
        });
        return { 
            success: `1 item remove !`,
        }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}