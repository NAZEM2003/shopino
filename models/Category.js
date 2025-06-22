const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img:{
        type:String,
        required:true
    }
});

const model = mongoose.models.Category || mongoose.model("Category" , schema);
export default model;