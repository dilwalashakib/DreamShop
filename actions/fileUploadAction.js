'use server';

import os from "os";
import path from "path";
import fs from "fs/promises";
import cloudinary from "cloudinary";

// cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

export async function fileUpload(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const newName = `${Date.now()}-${file.name}`;
    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, newName);
                    
    fs.writeFile(uploadDir, buffer);

    const { public_id, url } = await cloudinary.v2.uploader.upload(uploadDir, { folder: "dreamShop"});

    return { public_id, url, tempDir: uploadDir }
}