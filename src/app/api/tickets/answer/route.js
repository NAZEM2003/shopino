import connectToDB from "@/config/db"
import { authAdmin } from "@/utils/actions";
import { ticketAnswerSchema } from "@/utils/zod";
import Ticket from "@/models/Ticket";

export async function POST(req) {
    try {
        connectToDB();
        const { title, body, department, ticketID } = await req.json();
        const admin = await authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        
        const isDataValid = ticketAnswerSchema.safeParse(body);
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 400
            })
        }
        await Ticket.create({
            title,
            body,
            department,
            isAnswer: true,
            questionTicket: ticketID,
            user: admin._id
        });
        await Ticket.findOneAndUpdate({ _id: ticketID }, {
            hasAnswer: true
        });
        return Response.json({ message: "ticket answer sent successfully" }, { status: 201 });

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        })
    }
}