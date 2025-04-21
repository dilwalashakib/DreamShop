import Image from "next/image";
import logo from "../../public/images/logo.svg";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    const menu = [
        {
            id: '1',
            name: "Become a Seller",
            path: 'seller/login'
        },
        {
            id: '2',
            name: "Delivery Information",
            path: 'delivery-information'
        },
        {
            id: '3',
            name: "Privacy Policy",
            path: 'privacy-policy'
        },
        {
            id: '4',
            name: "Blog",
            path: 'blog'
        },
        {
            id: '5',
            name: "About",
            path: 'about'
        },
        {
            id: '6',
            name: "Contact",
            path: 'contact'
        },
    ];
    
    return (
        <footer className="bg-gray-700">
            <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 px-8 ">
                <div className="text-lg">
                    <Image
                        className="mb-4"
                        width={250}
                        height={150}
                        src={logo} 
                        alt="Logo" 
                    />
                    <p>Address - Noakhali, Kabirhat</p>
                    <p>Phone - +883727278272</p>
                    <p>Email - dilwalashakib@gmail.com</p>
                </div>

                <div>
                    <h3 className="text-2xl mb-4">Usefull Links</h3>
                    <ul className="text-xl">
                        {menu?.map((item) => (
                            <li key={item?.id} className="hover:text-gray-300 duration-400">
                                <Link href={item?.path}>{item?.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-4xl mb-3">Join Our Newsletter</h3>
                    <p>Get E-mail Updates About our Latest Offers</p>
                    <div className="mt-5">
                        <input
                            className="py-2 px-4 text-lg text-white rounded-xl w-full mb-3 border-2 border-gray-300 outline-hidden"
                            type="text"
                            placeholder="youremail@gmail.com"
                        />
                        <button className="py-2 px-4 bg-green-600 text-xl rounded-xl hover:bg-blue-700 duration-400 w-full cursor-pointer">Submit</button>
                    </div>
                    
                    <div className="flex gap-4 justify-center mt-5 cursor-pointer text-lg">
                        <FaFacebook />
                        <FaTwitter />
                        <FaLinkedin />
                        <FaInstagram />
                        <FaGithub />
                    </div>
                    
                </div>
            </div>
            <div className="bg-gray-950 w-full p-3 text-center text-lg">
                <p>Copyright @2023 All right reserved | made by 
                    <a href="www.facebook.com/dilwalashakib"> Dilwala Shakib</a>
                </p>
            </div>
        </footer>

    )
}