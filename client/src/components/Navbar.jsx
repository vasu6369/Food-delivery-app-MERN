import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BsSunFill, BsMoonFill } from "react-icons/bs";

import { StoreContext } from '../context/Context';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, handleLogout, cartitems, theme, toggleTheme,myorders } = useContext(StoreContext);

  const cartlength = Object.values(cartitems).filter(quantity => quantity > 0).length;

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };               

  return (
    <nav className={`navbar navbar-expand-lg shadow fixed-top ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <NavLink to='/'>
          <img src="/logo.png" alt="Food Logo" style={{ height: "60px", width: "100px", marginLeft: "5px" }} />
          <img src="/name.png" alt="name" style={{ height: "60px", width: "150px", marginLeft: "5px" }} />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item p-1">
              <motion.button onClick={toggleTheme} className="btn d-flex align-items-center justify-content-center" style={{width: "50px",height: "50px",borderRadius: "50%",backgroundColor: theme === "dark" ? "#222" : "#f8f9fa",position: "relative",overflow: "hidden",}} whileTap={{ scale: 0.8 }}>
                <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.3 }}>
                  {theme === "dark" ? <BsMoonFill size={22} color="yellow" /> : <BsSunFill size={24} color="orange" />}
                </motion.div>
              </motion.button>
            </li>

            <li className="nav-item p-1">
              <NavLink to="/" className="nav-link fw-bold fs-5" onClick={closeNavbar}>Home</NavLink>
            </li>
            {!user ?
              <>
                <li className="nav-item p-1">
                  <NavLink to="/login" className="nav-link fw-bold fs-5" onClick={closeNavbar}>Login</NavLink>
                </li>
                <li className="nav-item p-1">
                  <NavLink to="/signup" className="nav-link fw-bold fs-5" onClick={closeNavbar}>SignUp</NavLink>
                </li>
              </>
              :
              <>
                <li className="nav-item p-1">
                  <NavLink to="/cart" className="nav-link fw-bold fs-5" onClick={closeNavbar}>MyCart({cartlength})</NavLink>
                </li>
                <li className="nav-item dropdown p-1 fw-bold fs-5">
                  <a className="nav-link " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.picture ?
                      <img src={user.picture} style={{ height: "35px", width: "35px", borderRadius: "50%", marginLeft: "4px" }} />
                      : <img src="/default_avatar.jpg" style={{ height: "35px", width: "35px", borderRadius: "50%", marginLeft: "4px" }} />
                    }
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-link" style={{color:"#000"}}>Hi, {user.name}</li>
                    <li><hr className="dropdown-divider" /></li>
                     <li><NavLink to="/profile" className="nav-link" onClick={closeNavbar}>My Profile</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><NavLink to="/whislist" className="nav-link" onClick={closeNavbar}>Wishlist</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><NavLink to="/myorders" className="nav-link" onClick={closeNavbar}>MyOrders({myorders.length})</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><p className='nav-link' onClick={handleLogout}>Logout</p></li>
                  </ul>
                </li>
                <li className="nav-item p-1">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
