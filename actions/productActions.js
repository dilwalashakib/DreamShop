'use server'

import fs from "fs/promises";
import cloudinary from "cloudinary";
import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";
import { fileUpload } from "./fileUploadAction";

// add New Product
export async function addNewProduct({ sellerId, name, category, price, stock, brand, discount, description, shopName, files }) {
    try {
        dbConnect();
        const multipleBufferFiles = files.map(async(file) => {
            const { public_id, url, tempDir } = await fileUpload(file);
            return { public_id, url, tempDir };
        });

        const fileInfo = await Promise.all(multipleBufferFiles);
        const imageUrl = fileInfo.map((item) => {
            fs.unlink(item.tempDir);
            return { 
                public_id: item.public_id, 
                url: item.url
            }
        })
        await Product.create({
            sellerId,
            name,
            category,
            price: parseInt(price),
            stock: parseInt(stock),
            discount: parseInt(discount),
            brand,
            description,
            shopName,
            images: imageUrl
        });
    
        return { success: "Product Add Success"}

    } catch(err) {
        return {error: "Server Side Error !"}
    }
}

// Update Data
export async function productUpdate({ productId, data, files, imageUrls }) {
    try {
        if(Object.keys(files).length > 0) {
            let imagesArray = [...imageUrls];

            for(let key in files) {
                const file = files[key];
                const removeImageId = imageUrls[key].public_id;
                const { public_id, url, tempDir } = await fileUpload(file);
                
                imagesArray[key] = { public_id, url, tempDir };
                // remove Image from Cloudinary
                await cloudinary.v2.uploader.destroy(removeImageId);
            }

            let urls = imagesArray.map((item) => {
                if(item?.tempDir) {
                    fs.unlink(item.tempDir);
                }
                return { public_id: item.public_id, url: item.url }
            })

            data.images = urls;
        } else {
            data.images = imageUrls;
        }
        await Product.findByIdAndUpdate(productId, data);
        return { success: "Product Update Success" }
    } catch(err) {
        return { error: "Server Side Error" }
    }    
}

// Delete Product
export async function productDelete(productId, images) {
    try {
        dbConnect()
        await Product.findByIdAndDelete(productId);

        // remove image from Cloudinary
        images.forEach(async(item) => await cloudinary.v2.uploader.destroy(item.public_id));
    
        return { success: "Product Delete Successfull" }
    } catch(err) {
        return { error: "Server Side Error!" }
    }
}

// Query Product Or Search Product
export async function getFilterProducts({search, category, rating, low, high, sort, page}) {
    try {
        dbConnect();
        const perPage = 5;        
        const skipPage = (page - 1) * perPage;

        let query = {};

        if(search) {
            query.name = {
                $regex: search, 
                $options: 'i'
            }
        }
        if(category) {
            query.category = category;
        }
        if(rating) {
            query.rating = rating;
        }
        
        if(low || high) {
            if(low && high) {
                query.$and = [{price:{$gt: parseInt(low)}}, {price:{$lt: parseInt(high)}}]
                
            } else {
                low ? query.price = {$gt: parseInt(low)} : query.price = {$lt: parseInt(high)}
            }
        }
        
        const products = await Product.find(query).skip(skipPage).limit(perPage).sort({ price: parseInt(sort) });

        // count product
        const countProduct = await Product.find(query).countDocuments();

        return {
            success: "success",
            products: JSON.stringify(products),
            countProduct,
            perPage
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}