const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    category: String
});

module.exports = mongoose.model("Product",ProductSchema);