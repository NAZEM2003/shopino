import connectToDB from "@/config/db"
import User from "@/models/User";
import { authAdmin } from "@/utils/actions";
import { role } from "@/utils/constants";
import mongoose from "mongoose";

export async function PATCH(req) {
    try {
        connectToDB()
        const { newRole, userID } = await req.json();
        const admin = authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        if (newRole !== role.admin && newRole !== role.user) {
            return Response.json({ message: "the role is not correct" }, { status: 400 });
        }
        const isUserIDValid = mongoose.Types.ObjectId.isValid(userID);
        if (!isUserIDValid) {
            return Response.json({ message: "user id is not correct" }, { status: 400 });
        }
        const user = await User.findOne({ _id: userID }).lean();
        if (!user) {
            return Response.json({ message: "user not found" }, { status: 404 });
        }
        if (newRole === user.role) {
            return Response.json({ message: "Done" });
        }
        await User.findOneAndUpdate({ _id: user._id }, {
            role: newRole
        });
        return Response.json({ message: "role changed successfully" });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        })
    }
}