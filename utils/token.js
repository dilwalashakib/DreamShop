import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function createTokenWithSetCookie({id, name, email, role, status, payment, image}) {
    const token = jwt.sign({ id, name, email, role, status, payment, image}, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '30d'
    });

    const day = Date.now() + 60 * 60 * 24 * 30 * 1000;
    (await cookies()).set({
        name: 'userInfo',
        value: token,
        httpOnly: true,
        path: '/',
        expires: day
    });
    return { token };
}