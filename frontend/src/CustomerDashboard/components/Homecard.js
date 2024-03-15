import React from "react";
import Rating from "../components/Rating";
import { useNavigate } from "react-router-dom";

const Homecard = ({ id, imageUrl, title, price, rating }) => {
  const navigate = useNavigate();

  const openProductDetails = () => navigate(`/CustomerDashboard/product/${id}`);

  return (
    <div style={styles.card} onClick={openProductDetails}>
      <img
        src={`http://localhost:4001/images/${imageUrl}`}
        alt="Product"
        style={styles.image}
      />
      <div style={styles.content}>
        <div style={styles.text}>
          <span style={styles.title}>{title}</span>
          <span style={styles.price}>{price}</span>
        </div>
        <Rating rating={rating} />
      </div>
    </div>
  );
};

const styles = {
  card: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    width: "17vw", // Adjust based on your layout needs
    padding: "0.5vw",
    border: "1px solid rgba(110,89,75,0.4)",
    borderRadius: "1vw",
    "@media (max-width: 768px)": {
      width: "50vw", // Adjust for tablets
      height: "60vw", // Adjust for tablets
    },
    "@media (max-width: 480px)": {
      width: "80vw", // Adjust for mobile
      height: "120vw", // Adjust for mobile
    },
  },
  image: {
    width: "100%",
    height: "60%",
    objectFit: "cover",
    borderRadius: "1vw",

    "@media (max-width: 768px)": {
      height: "auto", // Adjust for tablets
    },
  },
  content: {
    marginTop: "2vw",
    marginBottom: "0",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    border: "none",
    outline: "none",
    background: "none",
    "@media (max-width: 768px)": {
      flexDirection: "column", // Stack content vertically on tablets
      height: "auto", // Adjust for flexible content area
    },
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: "1vw", // Adjust the gap for visual spacing between label and price
    "@media (max-width: 768px)": {
      gap: "2vw", // Increase gap for better visibility on tablets
    },
    "@media (max-width: 480px)": {
      gap: "4vw", // Increase gap for better visibility on mobile
    },
  },
  title: {
    height: "2.7vw",
    fontSize: "1.1vw", // Adjust font size as needed
    fontWeight: "400", // Adjust font weight as needed
    justifyContent: "flex-start",
    "@media (max-width: 768px)": {
      fontSize: "2.2vw", // Adjust font size for tablets
    },
    "@media (max-width: 480px)": {
      fontSize: "4.4vw", // Adjust font size for mobile
    },
  },
  price: {
    alignItems: "flex-end",
    fontSize: "1vw", // Adjust font size as needed
    fontWeight: "400", // Adjust font weight as needed
    "@media (max-width: 768px)": {
      fontSize: "2vw", // Adjust font size for tablets
    },
    "@media (max-width: 480px)": {
      fontSize: "4vw", // Adjust font size for mobile
    },
  },
};

export default Homecard;
