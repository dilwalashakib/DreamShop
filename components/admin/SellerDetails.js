import Link from "next/link";
import Seller from "@/models/Seller";
import StatusButton from "./StatusButton";
import { ToastContainer } from "react-toastify";

const getSellerById = async(id) => {
    try {
        const seller = await Seller.findById(id);
        return seller
    } catch {
        return {error: "Server Side Error"}
    }
}

export default async function SellerDetails({ id }) {
    const seller = await getSellerById(id);

    return (
        <div>
            <div className="bg-gray-800 text-green-500 text-2xl py-3">
                <Link 
                    className="ml-3" 
                    href="/admin/sellers">
                    All Sellers
                </Link>
            </div>

            <div className="md:grid grid-cols-4 gap-4 p-3 bg-slate-800 mt-2 rounded-md">
                <div className="col-span-1">
                    <img 
                        className="w-full object-cover rounded-xl" 
                        src={seller?.image?.url || "/images/default.png"}
                    />
                    
                    <StatusButton id={id} sellerStatus={seller?.status} />
                </div>

                <div className="col-span-3 p-3 text-xl rounded-xl bg-gray-950">
                    <h2 className="mb-3 text-4xl">Basic Info</h2>
                    <p><span>Name : </span> {seller?.name}</p>
                    <p><span>Email : </span> {seller?.email}</p>
                    <p><span>Role : </span> {seller?.role}</p>
                    <p><span>Status : </span> {seller?.status}</p>
                    <p><span>Payment Status : </span> {seller?.payment}</p>

                    { seller?.shopInfo?.shopName && 
                        <div className="mt-2 bg-gray-950 p-3 rounded-lg">
                            <p><span>Shop Name : </span> {seller?.shopInfo?.shopName}</p>
                            <p><span>Division : </span> {seller?.shopInfo?.division}</p>
                            <p><span>District : </span> {seller?.shopInfo?.district}</p>
                            <p><span>Sub District : </span> {seller?.shopInfo?.subDistrict}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}