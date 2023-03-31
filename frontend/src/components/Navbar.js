import {React,useState}from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [search, setsearch] = useState("");

  return (  
    
    <>
 
   
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Dress<b style = {{color:'#5a9078'}}>wel</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
  {  localStorage.getItem("role") != "Admin"?  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Mens">Mens</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Womens">Womens</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/Unisex">Unisex</Link>
        </li>  
        <li className="nav-item">
          <Link className="nav-link active" to="/kids">kids</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        
          </Link>
          <ul className="dropdown-menu active" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to={localStorage.status === "logout"? `/AddToCart` :`/login`}>Cart</Link></li>
            <li><Link className="dropdown-item" to={localStorage.status ==="logout" ? `/WishList` :`/login`}>WishList</Link></li>
            <li><Link className="dropdown-item" to={localStorage.status ==="logout" ? `/order` :`/login`}>order</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item"  onClick={()=>{ localStorage.removeItem("token")
          localStorage.removeItem("status")
          localStorage.removeItem("role");
          }} to="/Login"> {localStorage.status === "logout" ? "logout" : "login"}</Link></li>
          </ul>
        </li>
      </ul>:<  >
      <li className="nav-item"  >
          <Link className="nav-link " aria-current="page" style={{color:"white"}} to="/Mens">Add Products</Link>
        </li> 
        <li className="nav-item" style={{color:"black"}}>
          <Link className="nav-link " aria-current="page" style={{color:"white"}}  to="/Womens">remove Products</Link>
        </li>
        <li className="nav-item" style={{color:"black"}}>
          <Link className="nav-link " to="/Unisex" style={{color:"white"}}  >Edit products</Link>
        </li>
        <li className='nav-item'style={{color:"black"}}><Link className="nav-link " style={{color:"white"}}   onClick={()=>{ localStorage.removeItem("token")
          localStorage.removeItem("status")
          localStorage.removeItem("role");
          }} to="/Login"> {localStorage.status === "logout" ? "logout" : "login"}</Link></li>
      </>}
     {localStorage.getItem("role") != "Admin"? <form className="d-flex" action='/search'>
        <input className="form-control me-2"  name="search" id ="search" type="search" placeholder="Search" aria-label="Search"   onChange={(event) =>
          setsearch(event.target.value)
        } />
        <button className="btn btn-outline-success"  type="submit">Search</button>
      </form>:<></>}
      <hr style={{backgroundColor :"white"}}></hr>
    </div> 
  </div>
  
</nav>

</>

  )
}

export default Navbar