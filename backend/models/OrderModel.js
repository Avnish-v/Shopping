const mongoose = require("mongoose");

const order = new mongoose.Schema({
   userId :{required:true , type:String, },
   UserName :{type:String ,  required:true},
   items :[{
    productId :{require:true , type:String},
    quantity :{required:true , type:Number},
    price  :{required:true, type:Number},
    img : {type:Array,  required:true},
    status : {type:String , required:true},
    shipping : {type:String , required:true},
    
    description :{type:String},
    date : {},
deliveryDate:{},
   }  ]
},{timestamps: true},)
const Order = mongoose.model("orders", order);

module.exports = Order;