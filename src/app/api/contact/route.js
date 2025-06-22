import connectToDB from "@/config/db"
import Contact from "@/models/Contact";
import { contactUsSchema } from "@/utils/zod";

export const POST = async (req) => {
    try {
        connectToDB();
        const body = await req.json();
        const {name , email , number , message} = body;
        const isBodyDataValid = contactUsSchema.safeParse(body);
        if(!isBodyDataValid){
            return Response.json({message:isBodyDataValid.error.issues[0].message},{
                status:422
            })
        }
        await Contact.create({
            name ,
            email,
            phoneNumber:number,
            message
        })

        return Response.json({message:"message sent successfully"},{status:201});
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}