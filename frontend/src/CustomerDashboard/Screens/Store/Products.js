import React, { useState, useEffect } from "react";
import items from "../../items";
import ProductFilters from "./ProductFilter";
import ProductList from "./ProductList";
import axios from "axios";

const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [data, setData] = useState([]);
  const [fCategory, setFCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4001/product/")
      .then((res) => {
        console.log(res.data.data);
        console.log(`data:image/jpeg;base64,${res.data.data[0].image_url}`);
        setAllProducts(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4001/filterByCategory/", {
        categoryFilter: categoryFilter,
      })
      .then((res) => {
        // console.log("allProductsddss", res.data);
        setAllProducts(res.data.data);
        // console.log("allProducts : ", allProducts);
      })
      .catch((err) => {});
  }, [categoryFilter]);

  useEffect(() => {
    axios
      .post("http://localhost:4001/filterByRating/", {
        ratingFilter: ratingFilter,
      })
      .then((res) => {
        console.log("ratingFilter ", res.data);
        setAllProducts(res.data.data);
        // console.log("allProducts : ", allProducts);
      })
      .catch((err) => {});
  }, [ratingFilter]);

  // console.log("sortPrice : ", sortPrice);

  useEffect(() => {
    axios
      .post("http://localhost:4001/filterByPrice/", {
        sortPrice: sortPrice,
      })
      .then((res) => {
        // console.log("ratingFilter ", res.data);

        setAllProducts(res.data.data);
        // console.log("allProducts : ", allProducts);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, [sortPrice]);

  if (!allProducts) {
    return <p>No products available</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <ProductFilters
        uniqueCategories={uniqueCategories}
        setCategoryFilter={setCategoryFilter}
        setSortPrice={setSortPrice}
        setRatingFilter={setRatingFilter}
      />
      <ProductList products={allProducts} />
    </div>
  );
};

export default Products;
