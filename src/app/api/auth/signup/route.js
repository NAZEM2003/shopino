import connectToDB from "@/config/db";
import { signupSchema } from "@/utils/zod";
import User from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { role } from "@/utils/constants";
import { cookies } from "next/headers";
import cloudinary from "@/utils/cloudinary";

export async function POST(req) {
    try {
        connectToDB();
        const formData = await req.formData();

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const img = formData.get("img");

        //if an image is not selected:
        let imgName = "defaultProfile.png";
        //if an image is selected:
        if (img) {
            try {
                const uploadedResponse = await cloudinary.uploader.upload(img, {
                    upload_preset: "img_uploads"
                });
                imgName = uploadedResponse.secure_url;
            } catch (error) {
                return Response.json({ message: "error in uploading image", error: error.message }, {
                    status: 500
                });
            }
        }
        //validation of received data
        const isDataValid = signupSchema.safeParse({ name, email, password });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 422
            });
        }
        //check if there is a user with the received Email:
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return Response.json({ message: "this email already exists" }, {
                status: 422
            })
        };
        //hashing password
        const hashedPassword = await hashPassword(password);
        // generating access token 
        const accessToken = generateAccessToken({ email });
        //are there any exiting users. if YES : role = USER    and if NO : role = ADMIN 
        const users = await User.find({});
        await User.create({
            name,
            email,
            password: hashedPassword,
            role: users.length > 0 ? role.user : role.admin,
            img: imgName
        });
        //storing AccessToken in Cookies
        const cookieStore = cookies();
        cookieStore.set("token", accessToken, {
            httpOnly: true,
            path: "/"
        });
        return Response.json({ message: "you have successfully signed up" }, {
            status: 201
        })
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }

}