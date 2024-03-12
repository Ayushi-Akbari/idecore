import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../CustomerDashboard/images/logo.png';

export default function Navbar() {
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ padding: "0" }}>
        <div className="container-fluid" style={{ backgroundColor: 'rgba(73,47,29,1)', width: '100vw' }}>
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" style={{ height: '4vw', width: '4vw', resize: "contain", borderRadius: '7px', border: '2px solid #49372B' }} />
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav navbar-dark">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/MainDashboard/home') ? 'active' : ''}`} aria-current="page" to="/MainDashboard/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/MainDashboard/AboutUs') ? 'active' : ''}`} to="/MainDashboard/AboutUs">About</Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive('/MainDashboard/Contactus') ? 'active' : ''}`} to="/MainDashboard/Contactus">ContactUs</Link>
              </li>
    
             
         </ul>
         </div>
        </div>
      </nav>
    </div>
  );
}
const styles = {
  dropdownItem: {
    color: '#000', 
    padding: '8px 12px',
    textDecoration: 'none',
    display: 'block',
    backgroundColor: 'transparent', 
  },
  activeDropdownItem: {
    color: '#E8DDD5',
  },
  hoverDropdownItem: {
    backgroundColor: 'rgba(73,47,29,0.4)',
    color: '#fff',
  },
};