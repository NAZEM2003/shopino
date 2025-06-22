const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});
const model = mongoose.models.Contact || mongoose.model("Contact" , schema);
export default model;