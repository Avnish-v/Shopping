import React from 'react'
import { Link } from 'react-router-dom'
const UserNav = () => {
  return (
    <>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/Mens"><i class="fa fa-male" aria-hidden="true"></i> Mens</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/Womens"> <i class="fa fa-female" aria-hidden="true"></i> Womens</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/Unisex"> <i class="fa fa-universal-access" aria-hidden="true"></i> Unisex</Link>
        </li>  
        <li className="nav-item">
          <Link className="nav-link " to="/kids"><i class="fa fa-child" aria-hidden="true"></i> kids</Link>
        </li>
        <li className="nav-item dropdown">
          
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-bars" aria-hidden="true"></i>

        
          </Link>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to={localStorage.status === "logout"? `/AddToCart` :`/login`}> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart</Link></li>
            <li><Link className="dropdown-item" to={localStorage.status ==="logout" ? `/WishList` :`/login`}><i className="fa fa-heart-o " style={{ color:"red" }} aria-hidden="true" /> WishList</Link></li>
            <li><Link className="dropdown-item" to={localStorage.status ==="logout" ? `/order` :`/login`}> <i class="fa fa-book" aria-hidden="true"></i> Order</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item"  onClick={()=>{ localStorage.removeItem("token")
          localStorage.removeItem("status")
          }} to="/Login"> {localStorage.status === "logout" ? <i class="fa fa-sign-out" aria-hidden="true">
          logout </i>: <i class="fa fa-sign-in" aria-hidden="true">
login</i>}</Link></li>
          </ul>
        </li>
      </ul>
    
    </>
  )
}

export default UserNav