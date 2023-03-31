const express = require("express");
const app = express.Router();
const user = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const jwt_sc = "Avnskihbsdkjdmmnm";
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/FetchUser");
const bcryptjs = require("bcryptjs");
const productModel = require("../models/productModel");
const cart  =  require("../models/CartModel");
const WishList = require("../models/WishlistModel");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
app.post("/create", async (req, res) => {
    let result = false;
    const { username, password, address, phone, email, } = req.body;
    try {
        let data = await user.findOne({ email });
        if (data !== null) {
            return res.status(200).json({ result, error: "User exist " });
        }
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password, salt);
        data = await user.create({
            username: username,
            password: newpassword,
            address: address,
            phone: phone,
            email: email,
        });
        let ID = {
            id: data.id,
        };
        const AuthToken = jwt.sign(ID, jwt_sc);
        result = true;
        res.status(201).json({ result, AuthToken });
    } catch (error) {
        result = false;
        res.json({ result, error });
    }
});
//!login ---->
app.post("/login",async (req, res) => {
    let result = false;
    const { password, email } = req.body;
    try {
        let response = await user.findOne({ email });
        const compare = await bcrypt.compare(password, response.password);

//         if(email === "admin12@gmail.com" && comapre){
// res.json({})
//         }else 
if (!compare) {
            res
                .status(400)
                .json({ result, error: "please enter correct cardential" });
        } else {

        if(email === "admin12@gmail.com"){
result  = "admin";
            let ID = {
                id: response.id,
            };
            const AuthToken = jwt.sign(ID, jwt_sc);
            res.json({ result, AuthToken });
        }else{
            result = true;
            let ID = {
                id: response.id,
            };
            const AuthToken = jwt.sign(ID, jwt_sc);
            res.json({ result, AuthToken });
        }
        }
    } catch (error) {
        result = false;
        res.status(400).json({ result, error: "please enter correct cardential" });
    }
});
//! change password ---->  but there is the issue this service is only valid when the user is logged in ....>
app.put("/change",  async (req, res) => {
    try {
        const { password, email } = req.body;
        const check = await user.findOne({ email });
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt);
        const update = await user.updateOne(
            { email },
            { $set: { password: secpass } }
        );
        if (update) {
            result = true;
            res.status(201).json({ msg: "updation is done successfully", result });
        } else {
            result = false;
            res.status(400).json({ result });
        }
    } catch (error) {
        res.status(404).json({ error });
    }
});
app.get("/cart", async (req, res) => {
    try {

      const productId = req.query.id;
      let  quantity = req.query.quantity
      const tokenID = req.query.tk;
      const UserId = jwt.decode(tokenID).id;
      let UserExist = await cart.findOne({ UserId });
     
      // user have the Cart or not --- with userID field
      let extractProduct = await productModel.findById(productId);
      let  {price ,img} = extractProduct;
      let Name  = extractProduct.name;
      if(!quantity){

      }
      if (UserExist) {
        //!user cart already exists...
        let itemIndex = UserExist.products.findIndex(
          (p) => p.productId === productId
        ); //idhar humae uska index milega konse position per h agar product h cart me
        if (itemIndex > -1) {
          // Product already exists in cart, update its quantity
          UserExist.products[itemIndex].quantity = quantity;
          if (UserExist.products[itemIndex].quantity <= 0) {
            // If quantity is zero or negative, remove the product from cart
            UserExist.products.splice(itemIndex, 1);
          }
        } else {
          // Product does not exist in cart, add it
          let newProduct = { productId, quantity:1, price, img, Name };
          UserExist.products.push(newProduct);
        }
        UserExist = await UserExist.save();
        return res.status(201).json(UserExist);
      } else {
        // idhar per user ka cart he nhi h toh naya banya hai
        const newCart = await cart.create({
          UserId,
          products: [{ productId, quantity:1, price, img, Name }],
        });
        console.log(newCart)
        return res.status(201).json(newCart);
      }
    } catch (error) {
      res.status(302).json({ error });
    }
  });
  
app.get("/updatedCart", async (req, res) => {
    try {
        let token  =  req.query.token;
        let userid= jwt.decode(token).id;
      
        let UserCart  =  await cart.find()
   
        let carts = new Array();
    UserCart.forEach(Element=>{
        if(Element.UserId === userid){
         carts.push(Element.products)   
        }
    })
    if(carts){
        let reverse = carts.reverse();
        res.status(201).json({reverse}); 
    }
    } catch (error) {
        res.status(301).json({error})
    }
});

//!here i am going to perform all the wishlist remove the product and  and the the product ...>
app.post('/wishlist', async (req, res) => {
  try {
    const { productId, token, check } = req.query;
if(token && productId){
  
  const { id: userId } = jwt.decode(token);
  let userWishlist = await WishList.findOne({ UserId:userId });
  let Product =  await productModel.findById(productId);
  const { name,price,img} = Product;

 
    if (!userWishlist) {
      //the userWishlist not exist we will create new
      const newWishlist = await WishList.create({
        UserId:userId,
        products: [{ Name : name , price , img ,productId }],
      });
      return res.status(201).json({"created":"new"});
    } else {
      // check if the product already exists in the wishlist
      const productExists = userWishlist.products.some(p => p.productId === productId);
      if (productExists) {
        return res.status(400).json({ error: 'This product is already in your wishlist.' });
      } else {
        userWishlist.products.push({  Name : name , price , img ,productId });
        await userWishlist.save();
        return res.status(200).json({"added":"addeds"});
      }
    }
  } 
   }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});


app.delete('/wishlist', async (req, res) => {
  try {
    const { token ,productId } = req.query;
    if (token && productId) {
      const { id: userId } = jwt.decode(token);
      const userWishlist = await WishList.findOne({ UserId: userId });

      if (userWishlist) {
        const productIndex = userWishlist.products.findIndex(p => p.productId === productId);
        if (productIndex >= 0) {
          userWishlist.products.splice(productIndex, 1);
          await userWishlist.save();
          return res.status(200).json({ message: "Product removed from wishlist" });
        } else {
          return res.status(404).json({ message: "Product not found in wishlist" });
        }
      } else {
        return res.status(404).json({ message: "Wishlist not found" });
      }
    } else {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});



 app.delete("/RemoveCart",async (req,res)=>{
  try {
    let token  = req.query.token;
    console.log("this is the token",token)
    let UserId =  jwt.decode(token).id;
    console.log("this is id",UserId)
    let remove =  await cart.findOneAndDelete({UserId:UserId})
    console.log(remove)
    res.json(remove)
   
 
  } catch (error) {
    res.json(error)
    
  }
 })
  app.get("/wishlistCart" , async (req,res)=>{
    try {
        let token  =  req.query.token;
        let userid= jwt.decode(token).id;
      if(userid){
        let UserCart  =  await WishList.find()
        let carts = new Array();
    UserCart.forEach(Element=>{
        if(Element.UserId === userid){
         carts.push(Element.products)   
        }
    })
    if(carts){
        let reverse = carts.reverse();
        res.status(201).json({reverse}); 
    }
      }
    } catch (error) {
        res.status(301).json({error})
    }
  })


  //!order details ............
  app.get("/orderDetails",async (req,res)=>{
    try {
      console.log("jenjd")
      const token =  req.query.token;
      console.log(token)
     
      const UserId = jwt.decode(token).id;
      let FindUserID  = await OrderModel.find();
      let order = new Array();
      let totalAmount 
      let Totalquantity
      let status
      let timestamps 
      FindUserID.forEach(element =>{
      
        if(element.userId === UserId){
          totalAmount = element.totalAmount
          Totalquantity = element.quantity,
          status=  element.status
timestamps =element.createdAt
          
          order.push(element);
        }
      })
      if(order){
        order = order.reverse();
        res.json({order, Totalquantity ,totalAmount,status,timestamps});
      }
      
    } catch (error) {
      res.json(error)
    }
   

  })
  

module.exports = app;

