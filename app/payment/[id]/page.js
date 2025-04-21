import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Success from "@/components/customer/Success";
import ThankYou from "@/components/customer/ThankYou";

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

export default async function MyPayment({params, searchParams }) {
    const user = await getUserInfo();
    const param = await params;
    const searchParam = await searchParams;
    return (
        user?.role === "customer" ? (
            <div>
                {param?.id === "success" && <Success activeId={searchParam?.activeId} />}
                {param?.id === "thank-you" && <ThankYou />}
            </div>
        ) : (
            <h1>{user?.error}</h1>
        )
    )
}