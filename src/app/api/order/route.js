import connectToDB from "@/config/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { authUser } from "@/utils/actions";

export async function POST(req) {
    try {
        connectToDB()
        const { products, totalPrice } = await req.json();

        const user = await authUser();
        if (!user) {
            return Response.json({ message: "user is not authenticated" }, {
                status: 401
            })
        }

        const order = await Order.create({
            user: user._id,
            products,
            totalPrice
        });

        await User.findOneAndUpdate({ _id: user._id }, {
            $push: {
                orders: order._id
            }
        })

        return Response.json({ message: "order added successfully" }, { status: 201 });

    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}