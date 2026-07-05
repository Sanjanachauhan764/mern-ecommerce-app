const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userEmail: String,
    products: Array,
    total: Number
});

module.exports = mongoose.model("Order", orderSchema);