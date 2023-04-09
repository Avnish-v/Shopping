import React from 'react'
import { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Alert from '../Alert';
const Stockitems = (props) => {
  const {price, Name, img, productId,stock, handle} = props;
  const [seconds, setSeconds] = useState(0);
  const [alertmsg ,setalertmsg] = useState('');
  const [quantity ,setquantity] = useState(stock);
 
  const handleChange =  (event,) => {
    setquantity(event.target.value);
   
  };
  const fetchData = async (productId , quantity) => {
    const data = {
      id: productId,
      stock: quantity
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    let response = await fetch(
      `http://localhost:8080/api/Admin/updateStock`,options);
     response =  await response.json();
      if(response.sucess === "updated"){
        setalertmsg("Stocks updated ")
      }
      handle(productId);

  }  
  return (
    <>
    {alertmsg &&
        <div className="alert alert-success">{alertmsg}</div>
      }
<div className="card-body p-4" >
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-2 col-lg-2 col-xl-2">
          
            <img
              src={`http://localhost:3000${img[seconds].slice(18)}`}
              onMouseOver={ () => {
                setSeconds(1)}} onMouseOut={ () => {
                setSeconds(0)}}
              className="img-fluid rounded-3" alt="Cotton T-shirt" />
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
   onChange={(e)=>handleChange(e,productId)}   type="text"
            className="form-control form-control-sm" />
             
          <button className="btn btn-link px-2"
            onClick={()=>{setquantity(quantity + 1)}}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h5 className="mb-0">₹{price}</h5>
          <p><b>ID_:{productId}</b></p>
        </div>
        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
<button className='btn btn-sm btn-secondary' onClick={()=>{ fetchData(productId , quantity) }}>save</button>
        </div>
      </div>
      </div>
    
    </>
  )
}

export default Stockitems;