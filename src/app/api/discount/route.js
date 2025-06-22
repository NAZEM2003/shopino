import connectToDB from "@/config/db";
import { authAdmin} from "@/utils/actions";
import { discountSchema } from "@/utils/zod";
import Discount from "@/models/Discount";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        connectToDB();
        const { code, percent, maxUse } = await req.json();
        const admin = await authAdmin();
        
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const isDataValid = discountSchema.safeParse({ code, percent, maxUse });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 400
            });
        }
        await Discount.create({
            code,
            percent,
            maxUse,
            user: admin._id
        });
        return Response.json({ message: "discount code added successfully" }, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}

export async function DELETE(req) {
    try {
        connectToDB();
        const admin = authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const { discountID } = await req.json();

        const isDiscountIDValid = mongoose.Types.ObjectId.isValid(discountID);

        if (!isDiscountIDValid) {
            return Response.json({ message: "discountID is not Valid" }, {
                status: 400
            });
        }
        await Discount.findOneAndDelete({ _id: discountID });
        return Response.json({ message: "Discount Successfully Removed" });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}