import {React,useState,useEffect}from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  const [search, setsearch] = useState("");
  const [keys , setkeys] =  useState(props.User)
  useEffect(() => {
    setkeys(props.User);
    
  }, [keys])
  

  return (  
    
    <>
 
   
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Dress<b style = {{color:'#5a9078'}}>wel</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
  {  keys != "Admin"?  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
            <li><a className="dropdown-item"  onClick={()=>{ localStorage.removeItem("token")
          localStorage.removeItem("status")
          localStorage.removeItem("role");
          }} href="/Login"> {localStorage.status === "logout" ? "logout" : "login"}</a></li>
          </ul>
        </li>
      </ul>:<  >
      <li className="nav-item"  >
          <Link className="nav-link " aria-current="page" style={{color:"white"}} to="/"> Add Products</Link>
        </li> 
        <li className="nav-item" style={{color:"black"}}>
          <Link className="nav-link " aria-current="page" style={{color:"white"}}  to="/AllProduct">remove Products</Link>
        </li>
        <li className="nav-item" style={{color:"black"}}>
          <Link className="nav-link " to="/outofstock" style={{color:"white"}}  >OUT-OF-STOCK</Link>
        </li>
        <li className='nav-item'style={{color:"black"}}><a className="nav-link " style={{color:"white"}}   onClick={()=>{ localStorage.removeItem("token")
          localStorage.removeItem("status")
          localStorage.removeItem("role");
          }} href="/Login"> {localStorage.status === "logout" ? "logout" : "login"}</a></li>
      </>}
     {keys != "Admin"? <form className="d-flex" action='/search'>
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