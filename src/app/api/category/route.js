import connectToDB from "@/config/db";
import Category from "@/models/Category";
import { authAdmin } from "@/utils/actions";
import cloudinary from "@/utils/cloudinary";
import { categoryTitleSchema } from "@/utils/zod";
import { revalidateTag } from "next/cache";


export const POST = async (req) => {
    try {
        connectToDB();
        const formData = await req.formData();
        const title = formData.get("title");
        const img = formData.get("img");

        const admin = await authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const isTitleValid = categoryTitleSchema.safeParse(title);
        if (!isTitleValid.success) {
            return Response.json({ message: isTitleValid.error.issues[0].message }, {
                status: 422
            });
        }
        if (!img) {
            return Response.json({ message: "category image not selected" }, {
                status: 422
            });
        };

        try {
            const uploadedResponse = await cloudinary.uploader.upload(img, {
                upload_preset: "img_uploads"
            });
            await Category.create({
                title,
                img: uploadedResponse.secure_url
            });
            revalidateTag("fetchCategories");

        } catch (error) {
            return Response.json({ message: "error in uploading image", error: error.message }, {
                status: 500
            });
        }

        return Response.json({ message: "category added successfully" }, {
            status: 201
        });

    } catch (error) {
        console.log(error);

        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}

export const GET = async () => {
    try {
        connectToDB();
        const categories = await Category.find({}).sort({ _id: -1 }).lean();
        return Response.json(categories);
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        })
    }
}
