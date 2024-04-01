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
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../frontend/public/Avatar")
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({ storage: storage })
app.post("/create",async (req, res) => {
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
app.get("/UserD" ,  async (req,res)=>{
  try {
    let usertk = req.query.tk;
    let UserId =  jwt.decode(usertk).id;
    let data  =  await user.findById(UserId);
    console.log("data",data);
    res.json(data);
    
  } catch (error) {
    res.json(error);
  }
})

app.put("/change" , async (req,res)=>{
  try {
    const {username,phone,address} = req.body;
    let tk   = req.query.tk;
    let userd  =  jwt.decode(tk).id;
    let UserExist = await user.findById(userd);
    if(UserExist){
    UserExist.username = username || UserExist.username;
    UserExist.phone =  phone || UserExist.phone;
    UserExist.address  = address || UserExist.address;
    UserExist.save();
    res.json({ message: 'User information updated successfully' });
    }
  } catch (error) {
    res.json(error);
    
  }

})
//!login ---->
app.post("/login", async (req, res) => {
  let result = false;
  const { password, email } = req.body;
  try {
      let response = await user.findOne({ email });
      const compare = await bcrypt.compare(password, response.password);

      if (!compare) {
          res.status(400).json({ result, error: "Please enter correct credentials" });
      } else {
          result = true;
          let ID = {
              id: response.id,
          };
          const AuthToken = jwt.sign(ID, jwt_sc);
          res.json({ result, AuthToken ,  admin : response.isAdmin });
      }
  } catch (error) {
      result = false;
      res.status(400).json({ result, error: "Please enter correct credentials" });
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
    // Get product ID and quantity from request body
    const { productId, quantity, id } = req.query;
    console.log(productId , quantity ,id)

    // Validate input
    // if (!mongoose.isValidObjectId(productId)) {
    //   return res.status(400).json({ error: "Invalid product ID" });
    // }
    // if (!Number.isInteger(quantity) || quantity <= 0) {
    //   return res.status(400).json({ error: "Invalid quantity" });
    // }

    // Find the user's cart, if it exists
   
    const UserId  = jwt.decode(id).id;
   
    console.log(UserId);
    let userCart = await cart.findOne({ UserId });

    // Get product information
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const { price, img, stock } = product;
    const Name = product.name;

    // Update or add the product to the cart
    if (userCart) {
      // User has a cart, update it
      let itemIndex = userCart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (itemIndex > -1) {
        // Product already exists in cart, update its quantity
        userCart.products[itemIndex].quantity = quantity;
        if (userCart.products[itemIndex].quantity <= 0) {
          // If quantity is zero or negative, remove the product from cart
          userCart.products.splice(itemIndex, 1);
        }
      } else {
        // Product does not exist in cart, add it
        const newProduct = { productId, quantity, price, img, Name, stock };
        userCart.products.push(newProduct);
      }
      userCart = await userCart.save();
      return res.status(200).json(userCart);
    } else {
      // User does not have a cart, create a new one
      const newCart = await cart.create({
        UserId,
        products: [{ productId, quantity, price, img, Name, stock }],
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
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
    const { productId, token } = req.query;

    if (!productId || !token) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const { id: userId } = jwt.decode(token);
    let userWishlist = await WishList.findOne({ UserId: userId });
    let Product = await productModel.findById(productId);

    if (!Product) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }

    const { name, price, img, stock } = Product;

    if (!userWishlist) {
      // the userWishlist does not exist, so we will create a new one
      const newWishlist = await WishList.create({
        UserId: userId,
        products: [{ Name: name, price, img, productId, stock }],
      });

      return res.status(201).json({ created: 'new' });
    } else {
      // check if the product already exists in the wishlist
      const existingProduct = userWishlist.products.find(
        (p) => p.productId === productId
      );
      
      if (existingProduct) {
        return res
          .status(400)
          .json({ error: 'This product is already in your wishlist.' });
      } else {
        // remove the existing product (if any) before adding the new product to the array
        userWishlist.products = userWishlist.products.filter(p => p.productId !== productId);

        userWishlist.products.push({
          Name: name,
          price,
          img,
          productId,
          stock,
        });

        await userWishlist.save();
        return res.status(200).json({ added: 'added' });
      }
    }
  } catch (error) {
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
     
      const token =  req.query.token;
     
      const UserId = jwt.decode(token).id;
      let FindUserID  = await OrderModel.find();
      let order = new Array();
      let totalAmount 
      let Totalquantity
      let status
      let timestamps 
      let uName 
      FindUserID.forEach(element =>{
      
        if(element.userId === UserId){
          totalAmount = element.totalAmount
          Totalquantity = element.quantity,
          status=  element.status
timestamps =element.createdAt
uName =  element.UserName;
          
          order.push(element);
        }
      })
      if(order){
        order = order.reverse();
        res.json({order, Totalquantity ,totalAmount,status,timestamps,uName});
      }
      
    } catch (error) {
      res.json(error)
    }
   

  })
  

module.exports = app;

