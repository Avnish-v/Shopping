const mongoose = require("mongoose")

const User = new mongoose.Schema({
    username: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    isAdmin:{type:Boolean , default:false},
})

const user = mongoose.model("user", User);
module.exports = user;