const mongoose =  require("mongoose");
const wishlist  =  new mongoose.Schema({
   UserId : {required: true, type: String ,unique:true},
products: [
    {
        productId: {
            type: String,
            required :true,
            
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
        ,stock :{
            type: Number,
        }
        
    }

]

}, {timestamps: true})

const  WishlistModel = mongoose.model("wishlists", wishlist);

module.exports = WishlistModel;