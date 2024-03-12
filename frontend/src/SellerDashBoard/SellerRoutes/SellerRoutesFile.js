import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Screens/Home/Home";
import SellerMainLogin from "../Screens/LoginRegister/MainLogin";
import AddProduct from "../Screens/AddProduct/AddProduct";
const SellerRoutesFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/AddProduct" element={<AddProduct />} />
      <Route path="/SellerMainLogin" element={<SellerMainLogin />} />
      {/* If SellerMain is a route you want to use, you need to add it here */}
    </Routes>
  );
};

export default SellerRoutesFile;
