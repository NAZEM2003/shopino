import connectToDB from "@/config/db";
import { authUser } from "@/utils/actions";
import { hashPassword, verifyPassword } from "@/utils/auth";
import { changePasswordSchema } from "@/utils/zod";
import User from "@/models/User";

export async function PATCH(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { currentPassword, newPassword, repeatPassword } = body;
        const isDataValid = changePasswordSchema.safeParse({ currentPassword, newPassword });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 400
            })
        };
        if (newPassword === currentPassword) {
            return Response.json({ message: "the New Password is the same as the Current Password" }, {
                status: 400
            })
        }
        if (newPassword !== repeatPassword) {
            return Response.json({ message: "repeating the password is not the same as the entered password" }, {
                status: 400
            })
        }
        const user = await authUser();
        if (!user) {
            return Response.json({ message: "user is not authenticated" }, {
                status: 401
            })
        }
        const isPasswordCorrect = await verifyPassword(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return Response.json({ message: "Current Password is incorrect" }, {
                status: 400
            })
        }
        const hashedPassword = await hashPassword(newPassword);
        await User.findOneAndUpdate({ _id: user._id }, {
            password: hashedPassword
        })
        return Response.json({ message: "password successfully changed" });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }

}