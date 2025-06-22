import connectToDB from "@/config/db";
import { emailSchema } from "@/utils/zod";
import Newsletter from "@/models/Newsletter";

export async function POST(req) {
    try {
        connectToDB();
        const { email } = await req.json();
        const isEmailValid = emailSchema.safeParse(email);
        if (!isEmailValid.success) {
            return Response.json({ message: isEmailValid.error.issues[0].message }, { status: 400 });
        }
        await Newsletter.create({ email });
        return Response.json({ message: "Email added to newsletter successfully" }, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }

}