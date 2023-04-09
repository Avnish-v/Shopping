import React from 'react'
import OrderItem from "./OrderItem";
import { useEffect,useState } from 'react';


const Order = () => {
  const [order,setorder] = useState([]);
  const [Username ,  setUsername] = useState([]);
let fetchData = async()=>{
  let token = localStorage.getItem("token");
  let response  =  await fetch(`http://localhost:8080/api/auth/orderDetails/?token=${token}`)
   response =  await response.json();
   
   let filter ;
   filter = response.order;
   setorder(filter); 
   setUsername(filter[0].UserName)
 
}
useEffect(() => {
  fetchData();
}, [])

  return (
    <>
   
      <div className="order-details-container">
      <h1>Order Details <i class="fa fa-book" aria-hidden="true"></i>
   <h2 className='text-muted'>Thankyou {Username} for choosing Dresswel</h2> </h1>
    {order.map((order , index)=> <OrderItem orders={order}  key={index}/>
    )}
    </div>
    </>
  )
}

export default Order