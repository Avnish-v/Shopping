import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Details = (props) => {
    const {img,description,id,brand, price,name} =  props
    const [second ,setsecond] =  useState(0);

  return (
    <>
<div className="container my-5" >
  <div className="row">
    <div className="col-md-6" >
    <a href="#" class="previous round" style={{ textDecoration: "none",
  display: "inline-block",
  padding: "8px 16px",borderRadius:"50%",backgroundColor:"grey",color:"white",marginRight:"95px",marginLeft:"-60px"}} onClick={()=>{setsecond(0)}}>&#8249;</a>
      <img src={`http://localhost:3000`+ img[second].slice(18)}  className="img-fluid" style={{borderRadius:"22px",marginLeft:"-90px" ,width:"95%", height:"90%"}}/>
      <a href="#" class="next round" style={{ textDecoration: "none",
  display: "inline-block",
  padding: "8px 16px",borderRadius:"50%",backgroundColor:"grey",color:"white",marginLeft:"12px"}} onClick={()=>{setsecond(1)}}>&#8250;</a>
    </div>
    <div className="col-md-5 my-6 center">
      <h1>{name}</h1>
      <hr/>
      <h2> {brand}</h2>
      <hr/>
     <p className='text-muted' ><b>Description</b></p> <p>{description}</p>
      <h2>price-: {price}₹</h2>
        <Link to={localStorage.status === "logout" ? `/AddToCart/?id=${id}`:`/login`}className="btn btn-danger">add to cart</Link>
    <Link to ={localStorage.status === "logout" ? `/WishList/?id=${id}`:`/login`}><i className="fa fa-heart-o mx-4" style={{textDecoration : "none" , color:"red" , fontSize:"1.8rem" , marginTop:"2px"}} aria-hidden="true" ><button  style = {{display:"none"}}></button></i></Link>
      
    </div>
  </div>
</div>
 </>
  )
}

export default Details