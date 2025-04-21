import Link from "next/link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Category from "@/models/Category";
import { BiChevronRight } from "react-icons/bi";
import Footer from "@/components/visitor/Footer";
import Header from "@/components/visitor/Header";
import Filter from "@/components/visitor/Filter";

const getUserInfo = async() => {
    const cookie = await cookies();
    const info = cookie.get("userInfo");
    if(info?.value) {
        const userInfo = jwt.verify(info.value, process.env.TOKEN_SECRET_KEY);
        return userInfo
    } else {
        return {error: "You are not access This page !"}
    }
}

const getData = async() => {
    try {
        const categorys = await Category.find();
        return categorys;
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

export default async function SearchCategory({ searchParams }) {
    const user = await getUserInfo();
    const categorys = await getData();
    const searchParam = await searchParams;

    return (
        <main className="w-full">
            <Header id="/shop" />
        
            <section className="w-full flex justify-center items-center relative">
                <img
                    className="w-full h-[30vh] object-cover"
                    src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg" 
                    alt="banner" 
                />
                <div className="absolute">
                    <h2 className="text-6xl font-semibold">Dream Shop</h2>
                    <div className="flex items-center justify-center text-2xl mt-4 font-semibold">
                        <Link href="/">Home</Link>
                        <span className="mt-1 text-3xl"><BiChevronRight /></span>
                        <Link href="/shop">Shop</Link>
                    </div>
                </div>
            </section>

            <section>
                <Filter 
                    categorys={JSON.stringify(categorys)}  
                    categoryName={searchParam?.name} 
                    userId={user?.id}
                />
            </section>
            <Footer />
        </main>
    )
}
