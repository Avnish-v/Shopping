import React, { useEffect, useState } from 'react';
import { Link,} from 'react-router-dom';

const WishlistItem = (props) => {
  const { price, Name, img, productId,remove,stock } = props;
  const [seconds, setSeconds] = useState(0);
  return (
    <>
      <div className="card-body p-4">
        {console.log("this is the stock", stock)}
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <Link to={`/ProductDet/?id=${productId}`}>
              <img
                src={`http://localhost:3000${img[seconds].slice(18)}`}
                onMouseOver={ () => {
                  setSeconds(1)}}
                onMouseOut={ () => {
                  setSeconds(0)}}
                className="img-fluid rounded-3"
                alt="Cotton T-shirt"
              />
            
            </Link>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <p className="lead fw-normal mb-2">{Name}</p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h5 className="mb-0">₹{price}</h5>
          { stock != 0 ? <Link
              to={
                localStorage.status === 'logout'
                  ? `/AddToCart/?id=${productId}`
                  : `/login`
              }
              className="btn btn-danger"
            >
              Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </Link>:<b style={{color:'red'}}>
              Out OF Stock !
            </b>}
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <a className="text-danger" onClick={() => remove(productId)}>
              <i
                className="fa fa-trash"
                style={{ fontSize: '1.5rem' }}
                aria-hidden="true"
              ></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistItem;

