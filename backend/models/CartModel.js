const mongoose =  require("mongoose");
const cart  =  new mongoose.Schema({
   UserId : {type: String,required: true, unique: true,},
products: [
    {
        productId: {
            type: String,
            required :true,
            unique: true
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
        },
        stock :{
            type: Number,
        }
        
    }

]

}, {timestamps: true})


const  CartModel = mongoose.model("CartModel", cart);

module.exports = CartModel;