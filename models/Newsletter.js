const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
    email:{
        type:String,
        require:true
    }
});


const model = mongoose.models.Newsletter || mongoose.model("Newsletter" , schema);

export default model;