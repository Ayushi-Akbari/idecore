import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import fav from "../images/navfav.png";
import favfilled from "../images/navfavfilled.png";
import profile from "../images/profile.png";
import cart from "../images/cart.png";
import cartfilled from "../images/cartfilled.png";
import axios from "axios";
import Searchbar from "./Searchbar";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoverItem, setHoverItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFavClicked, setIsFavClicked] = useState(
    location.pathname === "/CustomerDashboard/FavScreen"
  );
  const [isCartClicked, setIsCartClicked] = useState(
    location.pathname === "/CustomerDashboard/CartScreen"
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsFavClicked(location.pathname === "/CustomerDashboard/FavScreen");
  }, [location.pathname]);

  useEffect(() => {
    setIsCartClicked(location.pathname === "/CustomerDashboard/CartScreen");
  }, [location.pathname]);

  const handleFavClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("First Login");
      navigate("/CustomerDashboard/LoginScreen");
    } else if (location.pathname !== "/CustomerDashboard/FavScreen") {
      navigate("/CustomerDashboard/FavScreen");
    } else {
      navigate(-1);
    }
  };

  const handleCartClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("First Login");
      navigate("/CustomerDashboard/LoginScreen");
    } else if (location.pathname !== "/CustomerDashboard/CartScreen") {
      navigate("/CustomerDashboard/CartScreen");
    } else {
      navigate(-1);
    }
  };

  const isActive = (pathname) => location.pathname === pathname;
  // const categories = [
  //   { path: "/CustomerDashboard/Homedecore", label: "Home Decor" },
  //   { path: "/CustomerDashboard/BedRoom", label: "Bedroom" },
  //   { path: "/CustomerDashboard/Kitchen", label: "Kitchen" },
  //   { path: "/CustomerDashboard/Storage", label: "Storage" },
  //   { path: "/CustomerDashboard/Organizers", label: "Organizers" },
  //   { path: "/CustomerDashboard/Kids", label: "Kids Furniture" },
  // ];

  // const currentCategoryLabel =
  //   categories.find((category) => category.path === location.pathname)?.label ||
  //   "";

  const getDropdownItemStyle = (path) => {
    const isActive = location.pathname === path;
    const isHovered = hoverItem === path;
    if (isActive) {
      return { ...styles.dropdownItem, ...styles.activeDropdownItem };
    } else if (isHovered) {
      return { ...styles.dropdownItem, ...styles.hoverDropdownItem };
    }
    return styles.dropdownItem;
  };
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    const handleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [isDropdownOpen]);

  // const getDropdownItemStyle = (path) => {
  //   const isActive = location.pathname === path;
  //   const isHovered = hoverItem === path;
  //   if (isActive) {
  //     return { ...styles.dropdownItem, ...styles.activeDropdownItem };
  //   } else if (isHovered) {
  //     return { ...styles.dropdownItem, ...styles.hoverDropdownItem };
  //   }
  //   return styles.dropdownItem;
  // };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setIsDropdownOpen(false);
  };

  // const categories = data || [];
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
                    isActive("/CustomerDashboard") ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/CustomerDashboard"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/CustomerDashboard/AboutUs") ? "active" : ""
                  }`}
                  to="/CustomerDashboard/AboutUs"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/CustomerDashboard/Store") ? "active" : ""
                  }`}
                  to="/CustomerDashboard/Store"
                >
                  Store
                </Link>
              </li>
            </ul>
          </div>
          <Searchbar />
          <button
            className="nav-link"
            style={{ background: "none", border: "none", outline: "none" }}
            onClick={handleCartClick}
          >
            <img
              src={isCartClicked ? cartfilled : cart}
              alt="Cart"
              style={{ height: "3.5vh", width: "auto", resize: "contain" }}
            />
          </button>
          <button
            className="nav-link"
            style={{ background: "none", border: "none", outline: "none" }}
            onClick={handleFavClick}
          >
            <img
              src={isFavClicked ? favfilled : fav}
              alt="Favorites"
              style={{
                height: "3.5vh",
                width: "auto",
                resize: "contain",
                margin: "0 2vw",
              }}
            />
          </button>
          <button
            className="nav-link"
            style={{ background: "none", border: "none", outline: "none" }}
            onClick={() => {
              navigate("/CustomerDashboard/LoginScreen");
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

{
  /* <a
                  className={`nav-link dropdown-toggle btn ${
                  currentCategoryLabel ? "active" : ""
                  }`}
                  href="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <a className="nav-link " href="/">
                  {currentCategoryLabel || ""}
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {data.map((category) => (
                    <li
                    key={category.path}
                    onMouseEnter={() => setHoverItem(category.path)}
                    onMouseLeave={() => setHoverItem(null)}
                    >
                      <Link
                      to={category.path}
                      style={getDropdownItemStyle(category.path)}
                      onClick={() => setSelectedCategory(category.label)}
                      >
                        {data.name}
                      </Link>
                    </li>
                  ))}
                </ul> */
}
