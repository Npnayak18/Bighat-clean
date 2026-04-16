const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');
require("dotenv").config();



const app = express();

app.use(cors());
app.use(express.json());



let otpStore={};
app.post("/send-otp",(req,res)=>{
  const {phone}=req.body;
  if(!phone) {
    return res.status(400).json({ message: "Phone required" });
  }
  const otp=Math.floor(100000 + Math.random() * 900000);
  otpStore[phone]=otp;
  console.log("OTP for", phone, ":", otp);
  res.json({
    success: true,
    message: "OTP sent",
  });
});
app.post("/verify-otp", async (req, res) => {
  const { phone, otp }=req.body;
  if (
    otpStore[phone] && Number(otpStore[phone]) === Number(otp)
  ) {
    delete otpStore[phone];
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone });
    }
    return res.json({
      success: true,
      message: "Login successful",
      user,
    });
  }
  res.status(400).json({
    success: false,
    message: "Invalid OTP",
  });
});
 



mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
  .catch((err)=>console.log(err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname));
  },
});

const upload=multer({ storage: storage });
app.use("/uploads",express.static("uploads"));




app.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price,category,quantity, description } = req.body;
    const product = await Product.create({
      name,
      price,
      category,
     quantity,
      description,
      image: req.file ? req.file.filename : "",
    });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({success: true,products, });
  } catch (err) {
    res.status(500).json({success: false,message: err.message,});
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


app.put("/products/:id",upload.single("image"),async (req,res)=>{
  try {
    const updateData={
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
    };
        if (req.file) {
      updateData.image = req.file.filename;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json({success:true,product });
  } catch (err) {
    res.status(500).json({message:err.message });
  }
});

app.get("/products/:id", async (req,res)=>{
  try{
    const product=await Product.findById(req.params.id);
    res.json({success:true,product});
  }catch(err){
    res.status(500).json({message:err.message});
  }
});
app.post("/orders", async (req, res) => {
  try {
const{items,totalAmount}=req.body;
const order=await Order.create({
      items,
      totalAmount,
      status:"pending",
    });
    res.json({success:true,order});
  } catch(err){
    res.status(500).json({ message:err.message});
  }
});
app.get("/orders/all",async(req,res)=>{
  const orders=await Order.find();
  res.json({orders});
});


app.patch("/orders/:id",async(req,res)=>{
  try {
const {status}=req.body;
const order = await Order.findByIdAndUpdate(req.params.id,{status},{new:true});
res.json({success:true,order});
  } catch(err){
    res.status(500).json({message:err.message});
  }
});



app.post("/create-checkout-session", async (req,res) => {
  try {const {items}=req.body;
    const line_items=items.map(item =>({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price*100,
      },
      quantity:item.qty,
    }));
  const session=await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items,
      mode:"payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-cancel",
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});









app.listen(3001, () => {
  console.log("Server is running on port 3001");
});