const express  =  require("express");
const productModel = require("../models/productModel");
const app  = express.Router();
const fs = require('fs');


app.delete("/DeleteProduct" , async (req,res)=>{
    try {

        let id   = req.query.productId;
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
    } catch (error) {
        res.json({error})
        
    }
});


app.post("/updateStock",async (req,res)=>{
    try {
        let {id , stock} = req.body;
        let update = await productModel.findByIdAndUpdate(
            id,
            { stock: stock },
            { new: true }
          );

          res.json({"sucess":"updated" , update})
        
    } catch (error) {
        
        res.json(error);
    }

})

app.get("/getOutOfStock" ,  async  (req,res)=>{
    try {
        const products = await productModel.find({ stock: { $lt: 10 } });
        res.json({products});
    } catch (error) {
        res.json(error);
    }
})

module.exports = app;