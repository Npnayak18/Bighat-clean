const mongoose = require("mongoose");
const OrderSchema=new mongoose.Schema({
items:[{
      name: String,
      price: Number,
      qty: Number,
    },],
totalAmount: Number,
status:{
    type: String,
    default: "pending",
  },

createdAt:{
    type: Date,
    default: Date.now,
  },
});

module.exports=mongoose.model("Order",OrderSchema);