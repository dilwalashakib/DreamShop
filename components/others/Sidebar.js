import Link from "next/link";
import Logout from "./Logout";
import logo from "../../public/images/logo.svg"
import { activeSellerSidebar, adminSidebar, deactiveSellerSidebar, pendingSellerSidebar } from "@/utils/sidebar";
import Image from "next/image";

export default function Sidebar({ id, role, status }) {
    return (
        <div className="p-2 max-h-[100vh] no-scrollbar overflow-y-scroll">
            <div className="p-2 h-14 cursor-pointer">
                <Image
                    src={logo}
                    quality={100}
                    width={240}
                    height={80}
                    alt="Dream Shop"
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </div>

            { role === 'admin' && 
                adminSidebar.map((item, i) => (
                    <Link 
                        className={`flex items-center rounded-l-lg gap-2 hover:bg-sky-500 mt-2 p-2 text-white text-lg ${item.path === id && "bg-sky-600"}`}
                        key={i} 
                        href={`/${role}/${item.path}`} >
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                    </Link>
                ))
            }

            {(role === 'seller' && status === "active") &&
                activeSellerSidebar.map((item, i) => (
                    <Link
                        key={i}
                        className={`flex items-center rounded-l-lg gap-2 hover:bg-sky-500 mt-2 p-2 text-white text-lg ${item.path === id && "bg-sky-600"}`}
                        href={`/${role}/${item.path}`}>
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                    </Link>
                ))
            }

            {(role === 'seller' && status === "pending") &&
                pendingSellerSidebar.map((item, i) => (
                    <Link
                        className={`flex items-center rounded-l-lg gap-2 hover:bg-sky-500 mt-2 p-2 text-white text-lg ${item.path === id && "bg-sky-600"}`}
                        key={i}
                        href={`/${role}/${item.path}`}>
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                    </Link>
                ))
            }

            {(role === 'seller' && status === "deactive") &&
                deactiveSellerSidebar.map((item, i) => (
                    <Link
                        className={`flex items-center rounded-l-lg gap-2 hover:bg-sky-500 mt-2 p-2 text-white text-lg ${item.path === id && "bg-sky-600"}`}
                        key={i} 
                        href={`/${role}/${item.path}`}>
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                    </Link>
                ))
            }
            <Logout role={role} />
        </div>
    )
}