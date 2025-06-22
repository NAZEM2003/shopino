import connectToDB from "@/config/db";
import { searchParamSchema } from "@/utils/zod";
import Product from "@/models/Product";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const search = searchParams.get("search");
        const isSearchParamValid = searchParamSchema.safeParse(search);
        if (!isSearchParamValid.success) {
            return Response.json({ message: isSearchParamValid.error.issues[0].message }, {
                status: 400
            });
        }
        await connectToDB();

        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        });

        return Response.json(products);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}