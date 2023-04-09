import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Check from "./Check.gif";
import Sound from "./Pay.mp3";

const CheckoutSucess = () => {
  let history  =  useNavigate();
  const token  =  localStorage.getItem("token");
  const deleteTheCart =  async ()=>{
    let deleteCart  =  await fetch(`http://localhost:8080/api/auth/RemoveCart/?token=${token}`,{method:"DELETE"});
    deleteCart = deleteCart.json();
  }
  function play (){
    new Audio(Sound).play();
  }
 
  useEffect(() => {
    play();
    deleteTheCart();
    setTimeout(() => {
      history("/order")
      
    }, 3000);
  }, [])


  
  return (
    <>
    <div className='h-100 d-flex align-items-center justify-content-center my-4'>
    <h2><b>checkout successful thankyou for choosing Dres</b><b style={{color:"green"}}>Wel</b></h2>

    </div>
    <div class="h-100 d-flex align-items-center justify-content-center my-2" >
 <img   style={{marginTop:'4rem',height:"10rem" ,width:"10rem"}} src={Check}></img>
 
 </div>
   
  
    </>
  )
}

export default CheckoutSucess