import connectToDB from "@/config/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import User from "@/models/User";

export async function GET() {
    try {
        connectToDB();
        const cookieStore = cookies();
        const token = cookieStore.get("token"); 
               
        if (!token) {
            return Response.json({ message: "there is no token" }, {
                status: 401
            })
        }
        const tokenPayload = verifyAccessToken(token.value)
        const user = await User.findOne({ email: tokenPayload.email });
        return Response.json(user);

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}