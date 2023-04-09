import React from 'react';
import './OrderDetails.css';
import { Link } from 'react-router-dom';

const OrderItem = ({ orders }) => {
  return (
  
        <div className="order-container" >
           {orders.items.map((item,index)=>{
            return   <div key={item._id}> <h2 className="order-number">Order Number: {item._id} </h2>
          <div className="order-info">
            <div className="order-date">
              
              <p>Date-:{item.date}</p>
              {item.date.slice(0,10) === item.deliveryDate?<><p>Delivered <i class="fa fa-check-circle-o" style={{color:"green"}} aria-hidden="true"></i></p></>:<><p>GET IT BY:{item.deliveryDate}</p></>}
              <p>Shipping-:{item.shipping}</p>
            </div>
            <div className="order-total">
              <p>Total:</p>
              <p>{item.price * item.quantity }</p>
              <p>Status</p>{item.status ==="paid"?<h1><i class="fa fa-check-circle-o" style={{color:"green"}} aria-hidden="true"></i>
</h1>: <h1><i class="fa fa-exclamation-circle"  style={{color:"red"}}aria-hidden="true"></i>
</h1>}
            </div>
          </div>
         
         
                <Link to={`/ProductDet/?id=${item.productId}`} style={{textDecoration:"none",color:"black"}} >
              <div className="order-item" key={index}>
                <img className="item-image" src={`http://localhost:3000${item.img[0].slice(18)}`} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                 
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price * item.quantity}</p>
                  {item.quantity !=1?<p>each-:{item.price}</p>:<></>}
                </div>
              </div>
                </Link>
           
          
          </div>
     })}
        </div>
  
  );
};

export default OrderItem;
