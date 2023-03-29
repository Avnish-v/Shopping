const express = require("express");
const app = express.Router();
const user = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const jwt_sc = "Avnskihbsdkjdmmnm";
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/FetchUser");
const bcryptjs = require("bcryptjs");
const productModel = require("../models/ShopingModel");
const cart  =  require("../models/CartModel");
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
app.get("/cart",async(req,res)=>{
    try {
     const productId = req.query.id;
     const quantity= parseInt(req.query.quantity);
     const tokenID =  req.query.tk;
     const  UserId = jwt.decode(tokenID).id; 
    let UserExist = await cart.findOne({UserId});
    let extractProduct  =  await productModel.findById(productId);
let  price  =   extractProduct.price;
let img   = extractProduct.img;
let Name  =  extractProduct.name;
        if(UserExist){
            //!user cart already exists...
            let itemIndex = UserExist.products.findIndex(p=> p.productId === productId);
            if(itemIndex > -1){
                //product in the cart exists ..
                let productItem = UserExist.products[itemIndex];// it will get the product details in it
                productItem.quantity = quantity ;
                UserExist.products[itemIndex] = productItem;
            }else{
                //user exist but the product not .. 
                UserExist.products.push({productId,quantity, price, img,Name})
            }
            UserExist = await UserExist.save();
            return res.status(201).json(UserExist);
        }else{
            // no cart for the user 
            const newCart  = await cart.create({
                UserId,
                products :[{productId , quantity,price ,img,Name}]
            });
            return res.status(201).json(newCart);

            } 
    } catch (error) {
        res.status(302).json({error})
    }
})
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
    let reverse = carts.reverse();
    res.status(201).json({reverse}); 
    } catch (error) {
        res.status(301).json({error})
    }
});

module.exports = app;
