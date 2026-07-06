const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Order = require("./models/Order");

mongoose.connect("mongodb+srv://sanjana:12345@cluster0.r4uolfu.mongodb.net/E-Commerce?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.post("/add-product", async (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        category: req.body.category
    });
    await product.save();
    res.json({
        message: "Product Added"
    });
});

app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post("/add-to-cart", async (req, res) => {
    const cartItem = new Cart({
        userEmail: req.body.userEmail,
        productId: req.body.productId,
        title: req.body.title,
        price: req.body.price,
        description : req.body.description,
        image: req.body.image
    });
    await cartItem.save();
    res.json({
        message: "Added To Cart"
    });
});

app.get("/cart/:email", async (req, res) => {
    const items = await Cart.find({
        userEmail: req.params.email
    });
    res.json(items);
});

app.delete("/remove-cart/:id", async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({
        message: "Item Removed"
    });
});

app.delete("/delete-product/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
        message: "Product Deleted"
    });
});

app.put("/update-product/:id", async (req, res) => {
    await Product.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description,
            category: req.body.category
        }
    );
    res.json({
        message: "Product Updated"
    });
});

app.post("/register", async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email
    });
    if(existingUser){
        return res.json({
            message: "Email Already Exists"
        });
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    await user.save();
    res.json({
        message: "User Registered"
    });
});

app.post("/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if(!user){
        return res.json({
            message: "User Not Found"
        });
    }
    const isMatch = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if(!isMatch){
        return res.json({
            message: "Invalid Password"
        });
    }
    console.log(user);
    const token = jwt.sign(
        {
            email: user.email,
        },
        "mysecretkey"
    );
    res.json({
        message: "Login Successful",
        token : token,
        role: user.role,
        name : user.name
    });
});

app.post("/place-order", async (req, res) => {
    const userEmail = req.body.userEmail;
    const cartItems = await Cart.find({
        userEmail: userEmail
    });
    const total = cartItems.reduce(
        (sum, item) => sum + item.price,
        0
    );
    const order = new Order({
    userEmail: userEmail,
    products: cartItems,
    total: total,
    status: "Processing",
    paymentMethod: "COD",
    orderDate: new Date()
    });
    await order.save();
    await Cart.deleteMany({
        userEmail: userEmail
    });
    res.json({
        message: "Order Placed Successfully"
    });
});

app.get("/orders/:email", async (req,res) => {
    const orders = await Order.find({
        userEmail: req.params.email
    });
    res.json(orders);
});

app.listen(5000, () => {
    console.log("Server Running");
});