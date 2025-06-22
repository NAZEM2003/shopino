const { default: mongoose } = require("mongoose");
import { role } from "@/utils/constants";
import "./Comment";
import "./Wishlist";
import "./Ticket";
// import "./Order";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
        default: ""
    },
    refreshToken: {
        type: String,
        required: false,
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Wish" }],
    tickets: [{ type: mongoose.Types.ObjectId, ref: "Ticket" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    role: {
        type: String,
        required: true,
        enum: [role.admin, role.user],
        default: "USER"
    }
});

const model = mongoose.models.User || mongoose.model("User", schema);
export default model;