const { default: mongoose } = require("mongoose");
import "./Department";
import "./User";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    hasAnswer: {
        type: Boolean,
        required: true,
        default: false
    },
    isAnswer: {
        type: Boolean,
        required: true,
        default: false
    },
    questionTicket: {
        type: mongoose.Types.ObjectId,
        ref: "Ticket",
        required: false,
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true
});

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);
export default model;