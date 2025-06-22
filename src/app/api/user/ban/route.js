import connectToDB from "@/config/db"
import Ban from "@/models/Ban";
import { authAdmin } from "@/utils/actions";

import { emailSchema } from "@/utils/zod";


export async function POST(req) {
    try {
        connectToDB();
        const { email } = await req.json();
        const admin = authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const isEmailValid = emailSchema.safeParse(email);
        if (!isEmailValid.success) {
            return Response.json({ message: isEmailValid.error.issues[0].message }, {
                status: 400
            })
        }
        const isAlreadyBanned = await Ban.findOne({ email }).lean();
        if (!isAlreadyBanned) {
            await Ban.create({ email });
        }
        return Response.json({ message: "the user was successfully banned" }, { status: 201 });

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        })
    }
}