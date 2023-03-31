import React from 'react'
import OrderItem from "./OrderItem";
import { useEffect,useState } from 'react';


const Order = () => {
  const [order,setorder] = useState([]);
let fetchData = async()=>{
  let token = localStorage.getItem("token");
  let response  =  await fetch(`http://localhost:8080/api/auth/orderDetails/?token=${token}`)
   response =  await response.json();
   let filter ;
   filter = response.order;
   setorder(filter); 
}
useEffect(() => {
  fetchData();
}, [])

  return (
    <>
      <div className="order-details-container">
      <h1>Order Details   <h2 className='text-muted'>Thankyou for choosing Dresswel</h2> </h1>
    {order.map((order , index)=> <OrderItem orders={order} key={index}/>)}
    </div>
    </>
  )
}

export default Order