import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from './Alert';

const CheckoutSucess = () => {
  let history  =  useNavigate();
  const token  =  localStorage.getItem("token");
  useEffect(() => {
    setTimeout(() => {
      history("/")
      
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