const { default: mongoose } = require("mongoose");
import "./User";
import "./Product";

const productSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    price: { type: Number, required: true },
    count: { type: Number, required: true, min: 1 },
    img: { type: String, required: true },
    total: { type: Number, required: true }
});

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: { type: [productSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'delivered', 'cancelled'],
        default: 'pending',
    },
}, {
    timestamps: true
});

const model = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default model;