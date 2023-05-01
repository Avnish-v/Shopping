import React from 'react'
import { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Alert from './Alert';

import PayButton from './PayButton';

const CartItem = (props) => {
  const {price, Name, img, productId,quantitys,onRemoveItem,handle ,stock} = props;
  const [quantity, setquantity] = useState(quantitys);
  const [seconds, setSeconds] = useState(0);
  const [alertmsg ,setalertmsg] = useState('');
 
  const handleChange =  (event,) => {
    setquantity(event.target.value);
   
  };
  // const handleAddToCart = (stock) => {
    
  // };
  useEffect(() => {
    const fetchData = async () => {
      let localstorage = localStorage.getItem("token");
      let response = await fetch(
        `http://localhost:8080/api/auth/cart?productId=${productId}&id=${localstorage}&quantity=${quantity}`,
        { method: "get" }
      );
      response = await response.json();
      handle(productId,quantity)
      if(quantity === 0 ){
onRemoveItem(productId)
 }
    };
    
    fetchData();
  }, [quantity]);
  
  
  return (
    <>
    {alertmsg &&
        <div className="alert alert-danger">{alertmsg}</div>
      }
<div className="card-body p-4" >
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-2 col-lg-2 col-xl-2">
          <Link to={`/ProductDet/?id=${productId}`}>
            <img
              src={`http://localhost:3000${img[seconds].slice(18)}`}
              onMouseOver={ () => {
                setSeconds(1)}} onMouseOut={ () => {
                setSeconds(0)}}
              className="img-fluid rounded-3" alt="Cotton T-shirt" />
          </Link>
        </div>
        <div className="col-md-3 col-lg-3 col-xl-3">
          <p className="lead fw-normal mb-2">{Name}</p>
        </div>
        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
          <button className="btn btn-link px-2"
            onClick={() => {
              setquantity(quantity -1 )}}>
            <i className="fa fa-minus" aria-hidden="true"></i>

          </button>

          <input id="form1"  name="quantity"  value={quantity } 
  readOnly onChange={(e)=>handleChange(e,productId)}   type="text"
            className="form-control form-control-sm" />
          <button className="btn btn-link px-2"
            onClick={()=>{
              if (stock >= quantity + 1) {
                setquantity(quantity + 1);
              } else {
                setalertmsg(`stock is not sufficient quantity should not be greater then ${stock}!!`)
              }

            }}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h5 className="mb-0">₹{price}</h5>
        </div>
        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
          <a className="text-danger"><i className="fa fa-trash" onClick={(productId)=>{
            setquantity(0)
            onRemoveItem(productId)
            
          }}style={{ fontSize: "1.5rem" }} aria-hidden="true"></i></a>
        </div>
      </div>
      </div>
    
    </>
  )
}

export default CartItem;