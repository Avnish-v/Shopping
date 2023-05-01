const express  =  require("express");
const productModel = require("../models/productModel");
const UserModel  =  require("../models/UserModel");
const app  = express.Router();
const fs = require('fs');
const jwt = require("jsonwebtoken");

app.delete("/DeleteProduct" , async (req,res)=>{
    try {

        let id   = req.query.productId;
        let token  = req.query.token;

        let decode  =  jwt.decode(token).id;
        console.log("this is decode " , decode.id);
        let checkuser  =  await UserModel.findById(decode);
        if(checkuser.username === "Admin"){
            let findthe =  await productModel.findById(id);
          
            let product =  await productModel.findByIdAndDelete(id)
            let img   = findthe.img;
            img.map((item)=>{
                fs.unlink(item , (err)=>{
                    if(err){
                        console.error(err);
                        return;
                    }
                    console.log(`../${item} was deleted`);
                });
            })
        res.json({product});    
        }else{

            res.json({"error":"invalid user.."})
        }
        
    } catch (error) {
        res.json({error})
        
    }
});


app.post("/updateStock",async (req,res)=>{
    try {
        let {id , stock,token} = req.body;
        let decode  =  jwt.decode(token).id;
        let findUser = await UserModel.findById(decode);
        if(findUser.username === "Admin"){
            let update = await productModel.findByIdAndUpdate(
                id,
                { stock: stock },
                { new: true }
              );
    
              res.json({"sucess":"updated" , update})

        }else{

            res.json({"error":"invalid user.."})
        }
        
    } catch (error) {
        
        res.json(error);
    }

})

app.get("/getOutOfStock" ,  async  (req,res)=>{
    try {
        let token = req.query.token;  
        let decode = jwt.decode(token).id
        let findUser =  await UserModel.findById(decode);
        if(findUser.username === "Admin"){
            const products = await productModel.find({ stock: { $lt: 10 } });
            res.json({products});

        }else{
            res.json({"error":"invalid user.."})
        }
    } catch (error) {
        res.json(error);
    }
})

module.exports = app;