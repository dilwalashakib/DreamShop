/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['mongoose'],
    env: {
        API_SECRET: process.env.API_SECRET,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        API_KEY: process.env.API_KEY,
        SHOP_URL: process.env.SHOP_URL,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        SERVER: process.env.SERVER
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
