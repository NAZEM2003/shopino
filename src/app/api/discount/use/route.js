import connectToDB from "@/config/db"
import { discountCodeSchema } from "@/utils/zod";
import Discount from "@/models/Discount";

export async function PATCH(req) {
    try {
        connectToDB();
        const { code } = await req.json();
        const isCodeValid = discountCodeSchema.safeParse(code);
        if (!isCodeValid.success) {
            return Response.json({ message: isCodeValid.error.issues[0].message }, {
                status: 400
            })
        }
        const discount = await Discount.findOne({ code });
        await Discount.findOneAndUpdate({ code }, {
            $inc: {
                uses: 1
            }
        });
        if (!discount) {
            return Response.json({ message: "discount not found" }, { status: 404 });
        } else if (discount.uses === discount.maxUse) {
            return Response.json({ message: "code usage limit" }, { status: 422 });
        } else {
            return Response.json(discount);
        }

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        })
    }
}