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
    }
});

module.exports = mongoose.model("Order", orderSchema);