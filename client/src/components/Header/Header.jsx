import React from "react";
// import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.jpg'


export default function Header(){

return(
<>


<nav className="navbar navbar-expand-lg  bg-dark  navbar-dark">
  <div className="container ">
    <Link className="navbar-brand" to="/"><img src={logo} height="40" alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to="/">Add Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/read-contact">Read Contact</Link>
        </li>
        
        </ul>
      
    </div>
  </div>
</nav>

</>
    )
}