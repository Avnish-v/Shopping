import React from 'react'
import { Link} from 'react-router-dom'

const Footer = () => {
  return (
    
    <footer className="bg-light text-center text-lg-start fixed-bottom">
  <div className="text-center " style={{backgroundColor:"rgba(0, 0, 0, 0.2)"}}>
    © 2023 Copyright:
    <Link className="text-dark" to="/about">DressWel(PVT)</Link>
  </div>
  
</footer>

  )
}

export default Footer