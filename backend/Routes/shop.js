const express = require("express");
const multer = require("multer");
const path = require("path")
const app = express.Router();
const FetchUser = require("../middleware/FetchUser");
const uuid = require("uuid.v4")
const productModel = require("../models/productModel");
let result = false;
const storageMulter = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/uploads");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filepath = `${id}${ext}`;
        cb(null, filepath);
    },
});
const avatarStorage  =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , "../frontend/public/Avatar");
    },
    filename:(req,file,cb)=>{
        const ext =   path.extname(file.originalname);
        const id =  uuid();
        const filepath = `${id}${ext}`;
        cb(null,filepath);
    }
});

app.use("/Avatar",express.static("Avatar"));
const Avatar = multer({storage : avatarStorage});
app.use("/uploads", express.static("uploads"));
const upload = multer({ storage: storageMulter });
//! upload from here 

app.post('/avatar' , Avatar.single("avatar"),async (req,res)=>{
    
})
app.post("/backend",upload.array('file'), async (req, res) => {
    try {
         let  val   =  req.files;
    
        var  iterable  = new Array();
    for (let i = 0 ; i < val.length;i++){
             iterable[i]   =  val[i].path
}
    const User = await productModel.create({
            name: req.body.name,
            img: iterable,
            brand: req.body.brand,
            gender: req.body.gender,
            price: req.body.price,
            brand: req.body.brand,
            type: req.body.type,
            description: req.body.description,
            stock : req.body.stock,
        });
        result = true;
        res.json({  User, result })
    }
    catch (error) {
        console.log(error);
        result = false;
        res.status(500).json({ "error" :error , result })

    }

})
//! category gender
app.get("/men", async (req, res) => { 
    try {
        result = true;
        const user = await productModel.find({ gender: "male" })
        res.status(201).json({ "data": user, result })
    } catch (error) {
        result = false
        res.json({ error, result })
    }
})
//! women
app.get("/women", async (req, res) => {
    try {
        result = true;
        const user = await productModel.find({ gender: "female" })
        res.status(201).json({ "data": user, result })
    } catch (error) {
        result = false
        res.json({ error, result })
    }
})
//! kids
app.get("/kids", async (req, res) => {
    try {
        result = true;
        const user = await productModel.find({ gender: "kids" })
        res.status(201).json({ "data": user, result })

    } catch (error) {
        result = false
        res.json({ error, result })
    }
})
//!unisex
app.get("/unisex", async (req, res) => {
    try {
        result = true;
        const user = await productModel.find({ gender: "unisex" })
        res.status(201).json({ "data": user, result })
    } catch (error) {
        result = false
        res.json({ error, result })
    }
})

//! in terms of items all to fetch
app.get("/items", async (req, res) => {
    try {
        const user = await productModel.find();
        res.json({ "data": user });
    } catch (error) {
        res.json({ result, error })
    }
})


//! get request for the path 
app.get("/productdata", async (req,res)=>{
    try {
        let id =  req.query.id;
        
        const user  = await productModel.findById(id);
        res.json({action :"true" ,   "data":[user] })
        
    } catch (error) {
        res.json({error})
    }
let id =  req.query.id;
})


app.get("/search/:key", async (req, res) => {
    try {
      
      let product = await productModel.find({
        $or: [
          { name: { $regex: req.params.key } },
          { brand: { $regex: req.params.key } },
          { type: { $regex: req.params.key } },
          { gender: { $regex: req.params.key } },
        ],
      });
      res.json({ data: product });
    } catch (error) {
      res.json({ error });
    }
  });


module.exports = app;
