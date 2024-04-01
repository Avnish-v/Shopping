import React from 'react'
import { Link } from 'react-router-dom'
const AdminNav = () => {
  return (
    <>
    
    <li className="nav-item"  >
          <Link className="nav-link " aria-current="page" style={{color:"white"}} to="/admin">  Add Products</Link>
        </li> 
        <li className="nav-item" style={{color:"black"}}>
          <Link className="nav-link " aria-current="page" style={{color:"white"}}  to="/allproduct"> <i class="fa fa-trash" aria-hidden="true"></i> remove Products</Link>
        </li>
        <li className="nav-item" style={{color:"black"}}>
          <Link className="nav-link " to="/outofstock" style={{color:"white"}}  ><i class="fa fa-info" aria-hidden="true"></i> Out-Of-Stock</Link>
        </li>
        <li className='nav-item'style={{color:"black"}}><a className="nav-link " style={{color:"white"}}   onClick={()=>{ localStorage.removeItem("token")
          localStorage.removeItem("role");
          
          }} href="/Login"><i class="fa fa-sign-out" aria-hidden="true"></i>
          {localStorage.status === "logout" ? "logout" : "login"}</a>
          </li>
          </>
  )
}

export default AdminNav