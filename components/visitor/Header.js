import Link from "next/link";
import jwt from "jsonwebtoken";
import Cart from "@/models/Cart";
import Category from "@/models/Category";
import Wishlist from "@/models/Wishlist";
import BottomHeader from "./BottomHeader";
import ResponsiveHeader from "./ResponsiveHeader";
import { AiFillHeart, AiOutlineMail, AiOutlineShoppingCart } from "react-icons/ai";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaLock, FaTwitter, FaUser } from "react-icons/fa";
import { cookies } from "next/headers";

const getData = async() => {
    try {
        const cookie = await cookies();
        const info = cookie.get("userInfo");
        if(info?.value) {
            const user = jwt.verify(info.value, process.env.TOKEN_SECRET_KEY);
            const category = await Category.find({});
            const countCart = await Cart.find({userId: user.id}).countDocuments();
            const countWishlist = await Wishlist.find({userId: user.id}).countDocuments();
            return { user, category, countWishlist, countCart }
        } else {
            return { user: null, category: null, countWishlist: 0, countCart: 0 }
        }
    } catch(err) {
        return {error: "Server Side Error !"}
    }
}

export default async function Header({ id }) {
    const { user, category, countWishlist, countCart } = await getData();
    
    const menu = [
        {
            id: '1',
            name: "Home",
            path: '/'
        },
        {
            id: '2',
            name: "Shop",
            path: '/shop'
        },
        {
            id: '3',
            name: "Blog",
            path: '/blog'
        },
        {
            id: '4',
            name: "About",
            path: '/about'
        },
        {
            id: '5',
            name: "Contact",
            path: '/contact'
        },
    ];

    return (
        <nav>
            <div className="max-lg:hidden flex justify-between items-center bg-[#eeeeee] text-black sm:px-8 py-1">
                <div className="flex gap-2 items-center">
                    <AiOutlineMail />
                    <span className="font-semibold">dilwala446@gmail.com</span>
                </div>
                <div className="flex gap-5">
                    <div className="flex gap-3 items-center cursor-pointer text-lg">
                        <FaFacebook />
                        <FaTwitter />
                        <FaLinkedin />
                        <FaInstagram />
                        <FaGithub />
                    </div>
                    <div className="flex items-center gap-5 before:h-6 before:w-0.5 before:bg-gray-500">
                        <select className="px-3 rounded-sm outline-hidden text-lg bg-white">
                            <option value="english">English</option>
                            <option value="bangla">Bangla</option>
                        </select>
                        
                        { user?.name ? (
                            <div className="text-lg before:h-6 before:w-0.5 before:bg-gray-400 font-semibold cursor-pointer">
                                <Link 
                                    href={`/${user?.role}/dashboard`} 
                                    className="flex gap-2 items-center">
                                        <FaUser className="text-1xl font-bold" />
                                        {user?.name?.slice(0, 10)}
                                </Link>
                            </div>
                        ) : (
                            <Link href="/customer/login" className="flex gap-2 items-center text-lg before:h-6 before:w-0.5 before:bg-gray-400 font-bold">
                                <FaLock className="text-1xl font-bold" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center gap-2 px-6 bg-white text-black py-3 relative">
                <div>
                    <img
                        className="h-10 object-cover cursor-pointer"
                        src="/images/logo.png"
                        alt="Dream Shop"
                    />
                </div>

                {/* Responsive */}
                <div className="lg:hidden">
                    <ResponsiveHeader user={user} id={id} />
                </div>

                <ul className="max-lg:hidden flex gap-6 cursor-pointer text-xl text-gray-600 font-semibold">
                    {menu?.map((item) => (
                        <li 
                            key={item.id} 
                            className={`hover:text-blue-500 border-b-3 border-white ease-in-out hover:border-b-3 hover:border-indigo-500 duration-500 ${item.path === id && "text-blue-500"}`}>
                            <Link href={`${item.path}`}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="max-lg:hidden flex gap-2 items-center text-2xl cursor-pointer">
                    <Link href={`/${user?.role}/wishlist`} className="p-2 bg-gray-300 rounded-full hover:bg-green-400 duration-400 relative">
                        <AiFillHeart className="text-red-600" />
                        {countWishlist > 0 && <span className="absolute top-[-8px] right-[-6px] w-7 h-7 flex justify-center items-center bg-green-500 text-white rounded-full font-semibold text-base">{countWishlist}</span>}
                    </Link>

                    <Link href="/cart" className="p-2 bg-gray-300 rounded-full hover:bg-red-200 duration-400 relative">
                        <AiOutlineShoppingCart className="text-red-600" />
                        
                        {countCart > 0 &&<span className="absolute top-[-8px] right-[-6px] w-7 h-7 flex justify-center items-center bg-green-500 text-white rounded-full font-semibold text-base">{countCart}</span>}
                    </Link>
                </div>
            </div>

            <BottomHeader category={JSON.stringify(category)} />
        </nav>

    )
}