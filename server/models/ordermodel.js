const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
    userid: { type: String, required: true }, 
    items: { type: Array, required: true },
    amount: { type: String, required: true },
    address: { type: String, required: true },
    status: {type: String,default: "Pending",enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"]},
    date: { type: Date, default: Date.now }
});

const ordermodel = mongoose.models.orders || mongoose.model("orders", orderschema);

module.exports = ordermodel;
