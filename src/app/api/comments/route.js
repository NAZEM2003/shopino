import connectToDB from "@/config/db";
import { commentSchema } from "@/utils/zod";
import Comment from "@/models/Comment";
import Product from "@/models/Product";
import User from "@/models/User";
import mongoose from "mongoose";
import { authAdmin, getProductComments } from "@/utils/actions";

export const POST = async (req) => {
    try {
        connectToDB();
        const body = await req.json();
        const { message, name, score, userID, productID } = body;

        const isDataValid = commentSchema.safeParse({ message, name, score });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 422
            });
        }

        const comment = await Comment.create({
            name,
            message,
            score,
            userID,
            productID,
            isAccepted: false
        });

        const comments = await Comment.find({ productID });

        await Product.findOneAndUpdate({ _id: productID }, {
            $push: {
                comments: comment._id
            }
        });
        await User.findOneAndUpdate({ _id: userID }, {
            $push: {
                comments: comment._id
            }
        });

        return Response.json({ message: "comment added successfully" }, {
            status: 201
        })

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}

export const GET = async () => {
    try {
        connectToDB();
        const comments = await Comment.find({}).populate("userID", "name img email");
        return Response.json(comments);
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}

export const DELETE = async (req) => {
    try {
        connectToDB();
        const { commentID } = await req.json();
        const admin = await authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        };
        const isCommentIDValid = mongoose.Types.ObjectId.isValid(commentID);
        if (!isCommentIDValid) {
            return Response.json({ message: "the commentID is not Valid" }, {
                status: 400
            });
        };
        const comment = await Comment.findOne({ _id: commentID });
        const product = await Product.findOne({ _id: comment.productID });
        const productComments = await getProductComments(product._id);
        let productScore = 0;
        if (productComments.length > 1) {
            productScore = Math.round(productComments.reduce((prev, comment) => prev + comment.score, 0) / productComments.length);
        }
        await Product.findOneAndUpdate({ _id: product._id }, {
            score: productScore
        });
        await Comment.findOneAndDelete({ _id: commentID });
        return Response.json({ message: "the comment was successfully deleted" });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}
