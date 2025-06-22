import connectToDB from "@/config/db"
import { authUser } from "@/utils/actions";
import mongoose from "mongoose";
import Department from "@/models/Department";
import Ticket from "@/models/Ticket";
import { ticketSchema } from "@/utils/zod";
import { revalidateTag } from "next/cache";

export async function POST(req) {
    try {
        connectToDB();
        const user = await authUser();
        if (!user) {
            return Response.json({ message: "the user is not authenticated" }, {
                status: 401
            });
        }
        const reqBody = await req.json();
        const { title, body, department } = reqBody;
        const isDepartmentValid = mongoose.Types.ObjectId.isValid(department);

        if (!isDepartmentValid) {
            return Response.json({ message: "department is not correct" }, {
                status: 400
            });
        } else {
            const isDepartmentExists = await Department.findOne({ _id: department });
            if (!isDepartmentExists) {
                return Response.json({ message: "department not found" }, {
                    status: 404
                });
            }
        }
        const isDataValid = ticketSchema.safeParse({title , body});
        if(!isDataValid.success){
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 400
            });
        }
        await Ticket.create({
            title,
            body,
            department,
            user:user._id
        });
        revalidateTag("fetchTickets");
        return Response.json({ message: "ticke sent successfully" }, { status: 201 })
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        })
    }
}

export async function GET (){
    try{
        connectToDB();
        const user = await authUser();
        if(!user){
            return Response.json({message:"user not authenticated"},{
                status:401
            });
        }
        const tickets = await Ticket.find({user:user._id , isAnswer:false}).populate("department").sort({_id:-1});
        return Response.json(tickets);
    }catch(error){
        return Response.json({message:error.message},{
            status:500
        })
    }
}