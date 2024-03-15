import React, { useEffect, useState } from "react";
import items from "../../items";
import Homecard from "../../components/Homecard";
import axios from "axios";
import ImageDecoder from "../imageDecoder";

const DecoreH = () => {
  // const homeDecorCategory = items[0].categories.find(category => category.name === "Home Decor");

  // const homeDecorProducts = homeDecorCategory ? homeDecorCategory.products : [];

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("isFavorite updated:", categoryFilter);
  }, [categoryFilter]);
  useEffect(() => {
    axios
      .get("http://localhost:4001/category")
      .then((res) => {
        setCategoryFilter(res.data.data[0].name);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4001/filterByCategory", {
        categoryFilter: categoryFilter,
      })
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // }
  }, [categoryFilter]);

  return (
    <div style={{ marginBottom: "6vw" }}>
      <div style={styles.header}>
        <p style={styles.headerText}>DECORE YOUR HOME</p>
        <div style={styles.subHeaderTextContainer}>
          <p style={styles.subHeaderText}>ELEVATE YOUR SPACE WITH ELEGANCE </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((product) => (
          <Homecard
            key={product._id}
            id={product._id}
            imageUrl={product.image_url[0]}
            title={product.title}
            price={`$${product.price.toFixed(2)}`}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: "center",
    padding: "1vw 2vw",
  },
  headerText: {
    fontWeight: "700",
    lineHeight: "0.5",
    fontSize: "2.1vw",
    color: "#49372B",
  },
  subHeaderTextContainer: {
    margin: "auto",
    paddingBottom: "0.2vw",
    width: "33vw",
  },
  subHeaderText: {
    fontWeight: "300",
    fontSize: "1.1vw",
    lineHeight: "1.3vw",
    color: "#49372B",
  },
};

export default DecoreH;
