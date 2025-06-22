const { default: mongoose } = require("mongoose");
import "./User";
import "./Product";

const schema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    productID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    isAccepted:{
        type:Boolean,
        required:true,
        default:false
    }
}, {
    timestamps: true
});
const model = mongoose.models.Comment || mongoose.model("Comment", schema);
export default model;