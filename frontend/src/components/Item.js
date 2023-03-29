import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import PayButton from './PayButton'
const Item = (props) => {
  // const [status,setstatus] =  status("null");
  const {id,description,alt,price,name,img,brand}= props
  return (
    <>
   <Link to={`/ProductDet/?id=${id}`} style={{ textDecoration:"none"}}>
    <div className="card" style={{ width: "18rem", backgroundColor: "#212529" ,borderRadius:"12px" ,borderColor:"black"}} >
  <img src={img.slice(18)} width="100" height="165" className="card-img-top" alt={alt}/>
  <div className="card-body " style={{backgroundColor:"#212529" , color:"white" ,borderRadius:"12px"}}>
    <h5 className="card-title">{name.length <=  19 ? name : name.slice(-20)}</h5>{price}
    <p className="card-text"><b>{brand}</b></p>
    <Link to={localStorage.status === "logout" ? `/AddToCart/?id=${id}`:`/login`}className="btn btn-secondary">add to cart</Link>
    <Link to ={localStorage.status === "logout" ? `/WishList/?id=${id}`:`/login`}><i className="fa fa-heart-o mx-4" style={{textDecoration : "none" , color:"red" , fontSize:"1.8rem" , marginTop:"2px"}} aria-hidden="true" ><button  style = {{display:"none"}}></button></i></Link>
  </div>
</div>
</Link>
</>
  )
}

export default Item