const PublicKey = process.env.Public_Key;
const PrivateKey = process.env.Private_Key;
const stripe = require("stripe")(PrivateKey);
const jwt = require("jsonwebtoken");
const jwt_sc = "Avnskihbsdkjdmmnm";
const express = require("express");
const path = require("path")
const app = express.Router();
const productModel = require("../models/productModel");
const CartModel = require("../models/CartModel")
const OrderModel = require("../models/OrderModel")
const moment = require('moment');

app.post('/create-checkout-session', async (req, res) => {
  try {
    const id = req.body.id;
    let UserId = jwt.decode(id).id;
    const cartItems = req.body.cartitem;
    console.log(cartItems);
    const stripedCartItems = cartItems.map(({ productId, quantity,price}) => ({ productId, quantity,price}));
    const customer = await stripe.customers.create({
      metadata: {
        UserId: UserId,
        Cart: JSON.stringify(stripedCartItems)
      }
    });

    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.Name,
            metadata: {
              id: item.productId
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${process.env.URL}/checkout-sucess/`,
      cancel_url: `${process.env.URL}/AddToCart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  let endpointSecret
//  endpointSecret = "whsec_3fb705bc0f49a876a6e166dc18230fa47b5bd5be011fd3313ad28e06525280d0";
  
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let data;
  let eventType;
  let event;

  if (endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('Webhook verified');
    } catch (err) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    try {
      const customer = await stripe.customers.retrieve(data.customer);
      const metadata = customer.metadata;
      const cartItems = JSON.parse(metadata.Cart);
      const lineItems = [];
      console.log(metadata)
      
      // Convert the .then() callback into an async function
      const getProduct = async (productId) => {
        const product = await productModel.findById(productId);
        return product;
      }
      const result2 = new Date().toLocaleString('en-GB', {
        hour12: true,
      });
      const currentDate = new Date();
const randomDays = Math.floor(Math.random() * 5) + 1;

const randomDate = new Date(currentDate.getTime() + (randomDays * 24 * 60 * 60 * 1000));
const randomDateString = randomDate.toLocaleDateString('en-GB');
const paymentStatus = data.payment_status;
console.log(randomDateString)
        
      for (const item of cartItems) {
        const product = await getProduct(item.productId); // Use await here to fetch the product model
        if (product) {
          lineItems.push({
            productId: product._id,
            name: product.name,
            description: product.description,
            img: product.img,
            quantity: item.quantity,
            price: item.price,
            date : result2 ,
            status : paymentStatus, 
            deliveryDate:randomDateString,
          });
        }
      }

      const totalAmount = data.amount_total / 100;
      const order = new OrderModel({
        userId: metadata.UserId,
        items: lineItems,
        totalAmount: totalAmount,
      });

      const savedOrder = await order.save();
      console.log(savedOrder);
      res.status(200).json(savedOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});
 
app.get('/DeleteOrder', async (req, res) => {
  // calculate the date that is 30 days ago from today
  const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
  const currentTime = moment().toDate();
console.log(thirtyDaysAgo)

  try {
    // find orders older than 30 days
    const oldOrders = await OrderModel.find({ createdAt: { $lt: thirtyDaysAgo } });

    // delete the old orders
    await OrderModel.deleteMany({ createdAt: { $lt: thirtyDaysAgo} });

    res.status(200).send(`Deleted ${oldOrders.length} orders older than 30 days.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete old orders.');
  }
});
const deleteOldOrders = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/payment/DeleteOrder');
    const data = await response.text();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the DeleteOrder API every 24 hours (86400000 milliseconds)
setInterval(deleteOldOrders, 86400000);


 module.exports = app;
