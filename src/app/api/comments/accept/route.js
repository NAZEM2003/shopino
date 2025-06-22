import connectToDB from "@/config/db"
import Comment from "@/models/Comment";
import Product from "@/models/Product";
import { authAdmin, getProductComments } from "@/utils/actions";

import mongoose from "mongoose";


export async function PATCH(req) {
    try {
        connectToDB();
        const { commentID } = await req.json();
        const admin = await authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const isCommentIDValid = mongoose.Types.ObjectId.isValid(commentID);
        if (!isCommentIDValid) {
            return Response.json({ message: "the commentID is not Valid" }, {
                status: 400
            });
        }
        await Comment.findOneAndUpdate({ _id: commentID }, {
            isAccepted: true
        });
        const comment = await Comment.findOne({ _id: commentID })
        const product = await Product.findOne({ _id: comment.productID });
        const productComments = await getProductComments(product._id);
        const productScore = Math.round(productComments.reduce((prev, comment) => prev + comment.score, 0) / productComments.length);
        await Product.findOneAndUpdate({ _id: product._id }, {
            score: productScore
        });
        return Response.json({ message: "comment successfully accepted" });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        })
    }
}