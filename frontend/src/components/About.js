import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
  <>
  <section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
 
 <div className="container py-5 h-100">
   <div className="row d-flex justify-content-center align-items-center h-100">
     <div className="col-xl-10">
       <div className="card rounded-3 text-black">
         <div className="row g-0">
           <div className="col-lg-6">
             <div className="card-body p-md-5 mx-md-4">

               <div className="text-center">
                 {/* <img src="/uploads/logo.jpg"
                   style="width: 185px;" alt="logo"/> */}
<img src='/website/logo.jpg'  style={{Width: "185px"}} alt="logo"/>
                 <h4 className="mt-1 mb-5 pb-1">We are The DressWel Team</h4>
               </div>
               <h3>Introduction</h3>
               <ul>
             <li>DressWel is a one stop shop for all your fashion and lifestyle needs.</li>
             <li>Myntra's value proposition revolves around giving consumers the power and ease of purchasing fashion and lifestyle products online. Offerings such as the largest in-season product catalogue, 100% authentic products, cash on delivery and 30 day return policy make Myntra, the preferred shopping destination in the country. To make online shopping easier for you, a dedicated customer connect team is on standby to answer your queries 24x7.
</li>
</ul>
<ul>
<h3 style={{marginLeft:"-34px"}}>Founder</h3>
<li>Avnish Tiwari & Yash patankar </li>
               </ul>
             <a href="https://www.instagram.com/__avnish24_/" target={'_blank'}>
             <i style={{fontSize:"40px" , color:"black"}} className="fa fa-instagram " aria-hidden="true"></i>
             </a>
             <a href="https://twitter.com/i/flow/single_sign_on" target={'_blank'}>
             <i class="fa fa-twitter" style={{fontSize:"40px" , color:"black",margin:"32px"}} aria-hidden="true"></i>

             </a>

               </div>
               </div>
               </div>
               </div>
               </div>
               </div>
               </div>
               </section>
  </>
  )
}

export default About