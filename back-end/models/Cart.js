const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

    userEmail: String,

    productId: String,

    title: String,

    price: Number,

    image: String,

    description: String

});

module.exports = mongoose.model("Cart",CartSchema);