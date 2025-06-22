import connectToDB from "@/config/db";
import { signinSchema } from "@/utils/zod";
import User from "@/models/User";
import { generateAccessToken, verifyPassword } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        connectToDB();
        const body = await req.json();
        const isBodyDataValid = signinSchema.safeParse(body);
        if (!isBodyDataValid.success) {
            return Response.json({ message: isBodyDataValid.error.issues[0].message }, {
                status: 422
            });
        };
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return Response.json({ message: "the password or email is incorrect" }, {
                status: 422
            });
        }
        const isPasswordCorrect = await verifyPassword(body.password, user.password);
        if (!isPasswordCorrect) {
            return Response.json({ message: "the password or email is incorrect" }, {
                status: 422
            });
        };
        const accessToken = generateAccessToken({ email: body.email });
        const cookieStore = cookies();
        cookieStore.set("token", accessToken, {
            httpOnly: true,
            path: "/"
        });

        return Response.json({ message: "you have successfully signed in" });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}