import React from 'react'
import { Link } from 'react-router-dom'
const Suggest = (props) => {
    const {sname ,salt , simg , sprice, sid,sbrand} = props
  return (
    <div className='container' style={{backgroudColor:"white"}}>


 <Link to={`/ProductDet/?id=${sid}`} style={{color:"black", textDecoration:"none"}}>
    <div className="card" style={{width: "15rem", border:"none"}} >
  <img src={simg.slice(18)} width="100" height="165" className="card-img-top" alt={salt}/> 
   <div className="card-body " style={{backgroundColor:"gray"}}>
    <h5 className="card-title">{sname.length <=  19 ? sname : sname.slice(20)}</h5>{sprice}
    <p className="card-text"><b>{sbrand}</b></p>
    <Link to={`/AddToCart/?id=${sid}`}className="btn btn-secondary">add to cart</Link>
    <Link to = {`/WishList/?id=${sid}`}><i className="fa fa-heart-o mx-4" style={{textDecoration : "none" , color:"red" , fontSize:"1.8rem" , marginTop:"2px"}} aria-hidden="true" ><button  style = {{display:"none"}}></button></i></Link>
  </div>
</div>
</Link>
     </div> 
  )
}

export default Suggest