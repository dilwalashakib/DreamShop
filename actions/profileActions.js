"use server";

import bcrypt from "bcrypt";
import fs from "fs/promises";
import cloudinary from "cloudinary";
import Seller from "@/models/Seller";
import { cookies } from "next/headers";
import dbConnect from "@/utils/dbConnect";
import { fileUpload } from "./fileUploadAction";
import { createTokenWithSetCookie } from "@/utils/token";
import Customer from "@/models/Customer";

// Logout
export async function logout() {
    try {
        const cookie = await cookies();
        cookie.delete("userInfo");
        return { success: "Logout Success" }
    } catch(err) {
        return { error: "Server Side Error !" }
    }
}
// Update Profile Image
export async function updateProfileImage({ id, file, oldImage }) {
    try {
        dbConnect();
                
        const { public_id, url, tempDir } = await fileUpload(file);
        
        const data = await Seller.findByIdAndUpdate(id, { image: { public_id, url } });

        await createTokenWithSetCookie({
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            status: data.status,
            payment: data.payment,
            image: { public_id, url },
            shopInfo: data.shopInfo
        });

        // Remove Image from Cloudinary
        if(oldImage?.public_id) {
            await cloudinary.v2.uploader.destroy(oldImage.public_id);
        }

        // remove File from Temp Folder
        fs.unlink(tempDir);

        return { success: "Profile Update Success" }
    } catch(err) {
        console.log(err);
        
        return { error: "Error Found !" }
    }
}

// Update Profile Info
export async function updateInfo({ id, shopName, division, district, subDistrict }) {
    try {
        dbConnect();
        const data = await Seller.findByIdAndUpdate(id, {
            shopInfo: {
                shopName,
                division,
                district,
                subDistrict
            }
        }, { new: true });

        const { token } = await createTokenWithSetCookie({
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            status: data.status,
            payment: data.payment,
            image: data.image,
            shopInfo: data.shopInfo
        });

        return { success: "Profile Info Update Success", token }
    } catch(err) {
        return { error: "Error Found !" }
    }
}

// Change Password
export async function passwordChange({ email, oldPassword, newPassword, role }) {
    dbConnect();
    if(role === "seller" && email && oldPassword && newPassword) {
        const findEmail = await Seller.findOne({ email: email });
        const passCompare = await bcrypt.compare(oldPassword, findEmail?.password);
        if(findEmail && passCompare) {
            const hassPassword = await bcrypt.hash(newPassword, 10);
            await Seller.findByIdAndUpdate(findEmail?._id, { password: hassPassword});
            return { success: "Password Has been Changed !"};
        } else {
            return { error: "UnAuthorized !"};
        }
        
    } else if(role === "customer" && email && oldPassword && newPassword) {
        const findEmail = await Customer.findOne({ email: email });
        const passCompare = await bcrypt.compare(oldPassword, findEmail?.password);
        if(findEmail && passCompare) {
            const hassPassword = await bcrypt.hash(newPassword, 10);
            await Customer.findByIdAndUpdate(findEmail?._id, { password: hassPassword});
            return { success: "Password Has been Changed !"};
        } else {
            return { error: "UnAuthorized !"};
        }
    }
}