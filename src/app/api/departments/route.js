import connectToDB from "@/config/db";
import { departmentSchema } from "@/utils/zod";
import Department from "@/models/Department";
import { authAdmin } from "@/utils/actions";
import { revalidateTag } from "next/cache";

export async function POST(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { title } = body;
        const admin = authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const isTitleValid = departmentSchema.safeParse(title);
        if (!isTitleValid.success) {
            return Response.json({ message: isTitleValid.error.issues[0].message }, {
                status: 400
            });
        }
        await Department.create({
            title
        });
        revalidateTag("departmentsFetch");
        return Response.json({ message: "Department added successfully" });

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}

export async function GET() {
    try {
        connectToDB();
        const departments = await Department.find({}, "-__v");
        return Response.json({ data: departments });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}