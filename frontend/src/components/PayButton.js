import React from 'react';
import axios from 'axios';


const PayButton = ({cartitem}) => {
    const handleCheckOut = async()=>{
      console.log(localStorage.getItem("token"))
        axios.post(`http://localhost:8080/api/Payment/create-checkout-session`,{
          cartitem,
          id :localStorage.getItem("token")
        }).then((res)=>{
          if(res.data.url){
            console.log(res.data.url)
            window.location.href = res.data.url
          }
        }).catch((err)=>{
          console.log(err.message);
        })
        // let response  =  await fetch("POST","http://localhost:8080/api/Payment/create-checkout-session",{
        //   cartitem,
        //      id :localStorage.getItem("token")
        // });
        // response =  await response.json();
        // console.log(response);
    }
  return (
    <button className='btn btn-warning btn-block btn-lg' onClick={()=>{handleCheckOut()}}>Proceed to Pay</button>
  )
}

export default PayButton