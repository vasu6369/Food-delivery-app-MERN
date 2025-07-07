import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-dark text-white d-none d-md-flex flex-column p-3 vh-100 position-fixed" style={{ width: "250px" }}>
        <h4 className="text-center">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">🏠 Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/userdetails" className="nav-link text-white">👤 User Details</Link>
          </li>
          <li className="nav-item">
            <Link to="/fooddetails" className="nav-link text-white">🍔 Food Details</Link>
          </li>
          <li className="nav-item">
            <Link to="/orderdetails" className="nav-link text-white">📦 Order Details</Link>
          </li>
          <li className="nav-item">
            <Link to="/analytics" className="nav-link text-white">📊 Analytics</Link>
          </li>
        </ul>
      </div>

      <button 
        className="btn btn-dark d-md-none position-fixed top-0 start-0 m-3" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div 
        className={`bg-dark text-white position-fixed vh-100 p-3 ${isOpen ? "w-75" : "w-0"} overflow-hidden transition`} 
        style={{ top: 0, left: 0, zIndex: 1000 }}
      >
        {isOpen && (
          <>
            <h4 className="text-center">Admin Panel</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white" onClick={() => setIsOpen(false)}>🏠 Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/userdetails" className="nav-link text-white" onClick={() => setIsOpen(false)}>👤 User Details</Link>
              </li>
              <li className="nav-item">
                <Link to="/fooddetails" className="nav-link text-white" onClick={() => setIsOpen(false)}>🍔 Food Details</Link>
              </li>
              <li className="nav-item">
                <Link to="/orderdetails" className="nav-link text-white" onClick={() => setIsOpen(false)}>📦 Order Details</Link>
              </li>
              <li className="nav-item">
                <Link to="/analytics" className="nav-link text-white" onClick={() => setIsOpen(false)}>📊 Analytics</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}
