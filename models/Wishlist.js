const { default: mongoose } = require("mongoose");
import "./User";
import "./Product";


const schema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Product"
    }
},{
    timestamps:true
});

const model = mongoose.models.Wishlist || mongoose.model("Wishlist",schema);
export default model;