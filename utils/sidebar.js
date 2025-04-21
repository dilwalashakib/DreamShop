import { FaLock, FaProductHunt } from "react-icons/fa";
import { BsChat, BsFillChatDotsFill, BsPatchPlus } from "react-icons/bs";
import { AiFillDashboard, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiGroup, BiDollar, BiLoaderCircle } from "react-icons/bi";

const adminSidebar = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <AiFillDashboard />,
        path: 'dashboard',
        role: 'admin'
    },
    {
        id: 2,
        name: 'Orders',
        icon: <AiOutlineShoppingCart />,
        path: 'orders',
        role: 'admin'
    },
    {
        id: 3,
        name: 'Category',
        icon: <BiCategory />,
        path: 'category',
        role: 'admin'
    },
    {
        id: 4,
        name: 'Sellers',
        icon: <BiGroup />,
        path: 'sellers',
        role: 'admin'
    },
    {
        id: 5,
        name: 'Deactive Sellers',
        icon: <BiGroup />,
        path: 'deactive-sellers',
        role: 'admin'
    },
    {
        id: 6,
        name: 'Sellers Request',
        icon: <BiLoaderCircle />,
        path: 'sellers-request',
        role: 'admin'
    },
    {
        id: 7,
        name: 'Payment Request',
        icon: <BiDollar />,
        path: 'payment-request',
        role: 'admin'
    },
    {
        id: 8,
        name: 'Chat Seller',
        icon: <BsFillChatDotsFill />,
        path: 'chat-seller',
        role: 'admin'
    }
]

const activeSellerSidebar = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <AiFillDashboard />,
        path: 'dashboard',
    },
    {
        id: 2,
        name: 'All Product',
        icon: <FaProductHunt />,
        path: 'all-product',
    },
    {
        id: 3,
        name: 'Add Product',
        icon: <BsPatchPlus />,
        path: 'add-product',
    },
    {
        id: 4,
        name: 'Orders',
        icon: <AiOutlineShoppingCart />,
        path: 'orders',
    },
    {
        id: 5,
        name: 'Payments',
        icon: <BiDollar />,
        path: 'payments',
    },
    {
        id: 6,
        name: 'Chat Customer',
        icon: <BsFillChatDotsFill />,
        path: 'chat-customer',
    },
    {
        id: 7,
        name: 'Chat Support',
        icon: <BsChat />,
        path: 'chat-support',
        status: 'pending'
    },
    {
        id: 8,
        name: 'Profile',
        icon: <BiGroup />,
        path: 'profile',
        role: 'seller'
    },

]

const pendingSellerSidebar = [
    {
        id: 1,
        name: 'Chat Support',
        icon: <BsChat />,
        path: 'chat-support',
        status: 'pending'
    },
    {
        id: 2,
        name: 'Profile',
        icon: <BiGroup />,
        path: 'profile',
        role: 'seller'
    }
]

const deactiveSellerSidebar = [
    {
        id: 1,
        name: 'Payments',
        icon: <BiDollar />,
        path: 'payments',
    },
    {
        id: 2,
        name: 'Chat Support',
        icon: <BsChat />,
        path: 'chat-support',
        status: 'pending'
    },
    {
        id: 3,
        name: 'Profile',
        icon: <BiGroup />,
        path: 'profile',
        role: 'seller'
    }
]

const customerSidebar = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <AiFillDashboard />,
        path: 'dashboard',
    },
    {
        id: 2,
        name: 'Orders',
        icon: <AiOutlineShoppingCart />,
        path: 'orders',
    },
    
    {
        id: 3,
        name: 'WishList',
        icon: <AiFillHeart />,
        path: 'wishlist',
    },
    {
        id: 4,
        name: 'Chat-Seller',
        icon: <BsFillChatDotsFill />,
        path: 'chat-seller',
    }, 
    {
        id: 5,
        name: 'Change Password',
        icon: <FaLock />,
        path: 'change-password',
    }
]


export {
    adminSidebar,
    activeSellerSidebar,
    pendingSellerSidebar,
    deactiveSellerSidebar,
    customerSidebar
};