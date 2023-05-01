import {React,useState} from 'react'
import { Link } from 'react-router-dom'

const ProductItem = (props) => {
  const [Seconds,setSeconds] =  useState(0);
  let  Fundelete = async(id)=>{
  let a =   window.confirm("do you really wanted to delete this product")

    if(a){
      let token  =  localStorage.getItem("token");
    let res =  await fetch(`http://localhost:8080/api/Admin/DeleteProduct/?productId=${id}&token=${token}`,{method:"DELETE"});
    res = await res.json();
    handle(id);}
  }
  const {id,description,alt,price,name,img,brand,handle}= props
 
  return (
    <>
   
    <div className="card" style={{ width: "18rem", backgroundColor: "#212529" ,borderRadius:"12px" ,borderColor:"black"}} >
  <img src={img[Seconds].slice(18)} width="100" height="165" className="card-img-top" alt={alt}   onMouseOver={ () => {
                  setSeconds(1)}}
                onMouseOut={ () => {
                  setSeconds(0)}}/>
  <div className="card-body " style={{backgroundColor:"#212529" , color:"white" ,borderRadius:"12px"}}>
    <h5 className="card-title">{name.length <=  19 ? name : name.slice(-20)}</h5>{price} ₹
    <p className="card-text"><b>{brand}</b></p>
  </div>
<button className='btn btn-danger '  onClick={()=>{Fundelete(id)}}><i class="fa fa-trash" aria-hidden="true"></i>
</button>
</div>
</>
  )
}

export default ProductItem