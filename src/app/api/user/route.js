import connectToDB from "@/config/db";
import { updateUserSchema } from "@/utils/zod";
import User from "@/models/User";
import { authAdmin, authUser } from "@/utils/actions";
import { cookies } from "next/headers";
import { generateAccessToken } from "@/utils/auth";
import mongoose from "mongoose";
import cloudinary from "@/utils/cloudinary";

//update user data
export async function PATCH(req) {
    try {
        connectToDB();
        const user = await authUser();
        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const img = formData.get("img");
        if (!user) {
            return Response.json({ message: "your token has expired" }, {
                status: 401
            })
        }
        //data validation
        const isDataValid = updateUserSchema.safeParse({ name, email });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 400
            })
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img, {
                upload_preset: "img_uploads"
            });
            await User.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    name,
                    email,
                    img: uploadedResponse.secure_url
                }
            });
            const accessToken = generateAccessToken({ email });
            const cookieStore = cookies();
            cookieStore.set("token", accessToken, {
                httpOnly: true,
                path: "/"
            });
            return Response.json({ message: "the update was successful" });
        }

        const accessToken = generateAccessToken({ email });
        const cookieStore = cookies();
        cookieStore.set("token", accessToken, {
            httpOnly: true,
            path: "/"
        });
        await User.findOneAndUpdate({ _id: user._id }, {
            $set: {
                name,
                email,
            }
        });
        return Response.json({ message: "the update was successful" });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}

export async function DELETE(req) {
    try {
        connectToDB();
        const { userID } = await req.json();
        const admin = authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const isUserIDValid = mongoose.Types.ObjectId.isValid(userID);
        if (!isUserIDValid) {
            return Response.json({ message: "incorrect userID" }, {
                status: 400
            });
        };
        const user = await User.findOne({ _id: userID }).lean();
        if (!user) {
            return Response.json({ message: "user not found" }, {
                status: 404
            });
        }
        await User.findOneAndDelete({ _id: userID });
        return Response.json({ message: "user successfully deleted" });

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}