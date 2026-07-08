const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userEmail: String,
    products: Array,
    total: Number,
    status: {
        type: String,
        default: "Processing"
    },
    paymentMethod: {
        type: String,
        default: "COD"
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Order", orderSchema);