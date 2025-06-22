const { default: mongoose } = require("mongoose");
import "./User";

const schema = mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    percent:{
        type:Number,
        required:true
    },
    maxUse:{
        type:Number,
        required:true
    },
    uses:{
        type:Number,
        required:true,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
});

const model = mongoose.models.Discount || mongoose.model("Discount",schema);
export default model;