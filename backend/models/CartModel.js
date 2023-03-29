const mongoose =  require("mongoose");
const cart  =  new mongoose.Schema({
   UserId : {required: true, type: String},
products: [
    {
        productId: {
            type: String,
            required :true
        },
        quantity: {
            type: Number,
            default: 1
        },
        price : {
            type : Number,
            required : true,
        },
        img :{
        type : Array,
        required : true},
        Name :{
            type:String,
            required:true
        }
        
    }

]

}, {timestamps: true})
//    productId : {required: true, type: String},
//    quantity  : {require : true ,default :1 , type: Number },
//    price : {require:true , type:Number}
const  CartModel = mongoose.model("CartModel", cart);

module.exports = CartModel;