const { default: mongoose } = require("mongoose");
import "./Comment";
import "./Category";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    img:{
        type:String,
        required:true
    },
    quantity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isExist: {
        type: Boolean,
        required: true,
        default: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "Category"
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }]

});

const model = mongoose.models.Product || mongoose.model("Product" , schema);
export default model;