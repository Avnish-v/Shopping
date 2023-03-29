const mongoose = require("mongoose");

const order = new mongoose.Schema({
    // name: { required: true, type: String },
    // date: { type: Date, default: Date.now },
    // description: { type: String, required: true },
    // img:  {type:Array, required: true },
    // price: { type: Number, required: true },
    // gender: { type: String, required: true },
    // type: { type: String, default: "general" },
    // brand: { type: String, required: true },
    // issue: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    // }
    //invoice
})

const Order = mongoose.model("productModel", order);

module.exports = Order;