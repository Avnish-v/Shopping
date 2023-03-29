const PublicKey = process.env.Public_Key;
const PrivateKey = process.env.Private_Key;
const stripe = require("stripe")(PrivateKey);
const express = require("express");
const path = require("path")
const app = express.Router();
// const bodyParser =  require("body-parser");
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
app.get("/pay" ,(req,res)=>{
    res.send({key:PublicKey})
}  )
app.post('/create-checkout-session', async (req, res) => {
  try {
    const cart  =  req.body.cartitem;
    const id  =  req.body.id;
    const line_items =  cart.map((item)=>{
      console.log("this is the ",item)
      let A = [];
      A.push(`http://localhost:3000${item.img[0].slice(18)}`)
      return  {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.Name,
            description :item.description,
            metadata:{
              id : item.productId

            },
             
            images:A
           
          },
          unit_amount: item.price *100,
        },  
        quantity: item.quantity,
        
      };
  
    })
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.URL}/checkout-sucess/`,
        cancel_url: `${process.env.URL}`,
      });
    console.log(session)
      res.json({url:session.url});
    
  } catch (error) {
    res.json({error})
    console.log("this is the",error)
    
  }
 
  });
  

     module.exports = app;