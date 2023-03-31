import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from './Alert';

const CheckoutSucess = () => {
  let history  =  useNavigate();
  const token  =  localStorage.getItem("token");
  const deleteTheCart =  async ()=>{
    let deleteCart  =  await fetch(`http://localhost:8080/api/auth/RemoveCart/?token=${token}`,{method:"DELETE"});
    deleteCart = deleteCart.json();
  }
  useEffect(() => {
    deleteTheCart();
    setTimeout(() => {
      history("/order")
      
    }, 3000);
  }, [])


  
  return (
    <>
    {console.log(token)}
   <Alert msg={"checkout sucessful"} type={"success"}></Alert>
    </>
  )
}

export default CheckoutSucess