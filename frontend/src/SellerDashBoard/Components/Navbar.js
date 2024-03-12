import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

import profile from "../images/profile.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoverItem, setHoverItem] = useState(null);

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ padding: "0", position: "fixed", zIndex: "1000", flex: 1 }}
      >
        <div
          className="container-fluid"
          style={{ backgroundColor: "rgba(73,47,29,1)", width: "100vw" }}
        >
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "4vw",
                width: "4vw",
                resize: "contain",
                borderRadius: "7px",
                border: "2px solid #49372B",
              }}
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav navbar-dark">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/SellerDashboard/Home") ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/SellerDashboard/Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/SellerDashboard/AddProduct") ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/SellerDashboard/AddProduct"
                >
                  Add Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/SellerDashboard/Home") ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/SellerDashboard/Home"
                >
                  Product
                </Link>
              </li>
            </ul>
          </div>

          <button
            className="nav-link"
            style={{ background: "none", border: "none", outline: "none" }}
            onClick={() => {
              navigate("/SellerDashboard/SellerMainLogin");
            }}
          >
            <img
              src={profile}
              alt="Profile"
              style={{
                height: "3.5vh",
                width: "auto",
                resize: "contain",
                marginRight: "2vw",
              }}
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
const styles = {
  dropdownItem: {
    color: "#000",
    padding: "8px 12px",
    textDecoration: "none",
    display: "block",
    backgroundColor: "transparent",
  },
  activeDropdownItem: {
    color: "#E8DDD5",
  },
  hoverDropdownItem: {
    backgroundColor: "rgba(73,47,29,0.4)",
    color: "#fff",
  },
};
