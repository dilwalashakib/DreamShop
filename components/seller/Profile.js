'use client'

import { useState } from "react";
import Input from "../others/Input";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FadeLoader, PropagateLoader } from "react-spinners";
import { stripeAccountActive } from "@/actions/sellerActions";
import { passwordChange, updateInfo, updateProfileImage } from "@/actions/profileActions";

export default function Profile({ user }) {
    const router = useRouter();
    const [infoEdit, setInfoEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [infoLoading, setInfoLoading] = useState(false);
 
    const changeProfile = async(e) => {
        try {
            setLoading(true);
            const file = e.target.files[0];
            const response = await updateProfileImage({
                id: user?.id,
                oldImage: user?.image,
                file
            });
 
            if(response?.success) {
                toast.success(response.success);
                router.refresh();
            } 
            toast.error(response?.error);
        } catch(err) {
            toast.error(err.message);
        } finally {
            setLoading(false)
        }
    }

    const createInfo = async(formData) => {
        try {
            setInfoLoading(true);
            const { shopName, division, district, subDistrict } = Object.fromEntries(formData);

            const response = await updateInfo({
                id: user.id,
                shopName, 
                division,
                district, 
                subDistrict
            });

            if(response?.success) {
                toast.success(response?.success);
                setInfoEdit(false)
                router.refresh();
            } 
            toast.error(response?.error);
        } catch(err) {
            toast.error(err.message);
        } finally {
            setInfoLoading(false);
        }
    }

    const activeStripeAccount = async(e) => {
        const response = await stripeAccountActive({
            id: user?.id
        });
        if(response?.success) {
            router.push(response.url);
        }
    }

    const passwordChangeAction = async(formData) => {
        const { email, oldPassword, newPassword } = Object.fromEntries(formData);
        if(email && oldPassword && newPassword) {
            const response = await passwordChange({ email, oldPassword, newPassword, role: user.role });
            if(response?.success) {
                toast.success(response.success);
            } else {
                toast.error(response.error);
            }
        } else {
            toast.error("Please Provide Valid Inputs !");
        }
    }

    return (
        <div className="md:grid justify-center md:grid-cols-2 gap-2 h-full p-3">
            <div className="p-3 bg-gray-950 p-3 rounded-xl">
                <div>
                    <label htmlFor="profile" title="Change Profile Image">
                        {loading ? (
                            <div className="bg-gray-950 w-full sm:h-48 flex items-center justify-center rounded-full">
                                <FadeLoader color="#36d7b7" />
                            </div>
                        ) : (
                            <img 
                                className="w-full sm:h-48 object-cover rounded-xl cursor-pointer" 
                                src={user?.image?.url ? user.image.url : "/images/default.png"} 
                            /> 
                        ) }
                        
                    </label>
                    <input 
                        onChange={changeProfile} 
                        type="file" 
                        id="profile" 
                        hidden 
                    />

                    <div className="mt-3 p-3 text-xl bg-gray-900 rounded-lg relative">
                        <button 
                            onClick={() => setInfoEdit(!infoEdit)} 
                            className="absolute top-2 right-2 text-green-400 hover:text-white duration-300 text-2xl cursor-pointer p-2">
                            <FaEdit />
                        </button>
                        <p>Name : {user?.name}</p>
                        <p>Email : {user?.email}</p>
                        <p>Role : {user?.role}</p>
                        <p>Status : {user?.status === "active" ? 
                            <span className="bg-green-600 px-2 rounded-md">{user?.status}</span> :
                            <span className="bg-red-600 px-2 rounded-md outline-hidden border-none">
                                {user?.status}
                            </span>}
                        </p>
                        <p>Payment Status : {user?.payment === "active" ? 
                            <span className="bg-green-600 px-2 rounded-md">{user?.payment}</span> :
                            <button onClick={activeStripeAccount} className="bg-red-600 px-2 rounded-md hover:bg-red-500 outline-hidden border-none">
                                {user?.payment}
                            </button>}
                        </p>

                        {user?.shopInfo?.shopName && (
                            <div className="mt-2 bg-gray-950 p-3 rounded-lg">
                                <p><span>Shop Name : </span> {user?.shopInfo?.shopName}</p>
                                <p><span>Division : </span> {user?.shopInfo?.division}</p>
                                <p><span>District : </span> {user?.shopInfo?.district}</p>
                                <p><span>Sub District : </span> {user?.shopInfo?.subDistrict}</p>
                            </div>
                        )}
                    </div>

                    {infoEdit && <form action={createInfo} className="p-3 w-full bg-slate-900 rounded-md mt-2">
                        <Input
                            inputColor="white"
                            labelColor="white"
                            label="Shop Name"
                            name="shopName"
                            type="text"
                            placeholder="Shop Name"
                        />
                        <Input
                            inputColor="white"
                            labelColor="white"
                            label="Division"
                            name="division"
                            type="text"
                            placeholder="Division"
                        />
                        <Input
                            inputColor="white"
                            labelColor="white"
                            label="District"
                            name="district"
                            type="text"
                            placeholder="District"
                        />
                        <Input
                            inputColor="white"
                            labelColor="white"
                            label="Sub District"
                            name="subDistrict"
                            type="text"
                            placeholder="Sub District"
                        />
                        <button className="py-2 w-full px-5 bg-green-600 rounded-lg hover:bg-green-900 duration-500 text-xl">
                            {infoLoading ? (
                                <PropagateLoader
                                    color="white"
                                    cssOverride={{
                                        paddingBottom: '.8rem'
                                    }}
                                />
                            ) : "Update Info"}
                        </button>
                    </form>}
                </div>
            </div>

            <form action={passwordChangeAction} className="p-3 w-full">
                <h2 className="text-2xl text-center mb-6">Change Password</h2>
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    defaultValue={user?.email}
                    placeholder="type your email"
                />
                <Input
                    label="Old Password"
                    name="oldPassword"
                    type="password"
                    placeholder="type your Old password"
                />
                <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    placeholder="type your new password"
                />
                <button className="py-2 px-4 bg-green-500 text-xl rounded-xl w-full hover:bg-green-800 duration-500 cursor-pointer">
                    Update
                </button>
            </form>
        </div>
    )
}