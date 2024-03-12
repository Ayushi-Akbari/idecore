import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Counter from "../../components/Counter";
import cross from "../../images/cross.png";
import axios from "axios";

const styles = {
  cardContainer: {
    backgroundColor: "rgba(246,231,220,0.3)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(110,89,75,0.4)",
    borderRadius: "1vw",
    padding: "1vw",
    margin: "1vw",
    marginTop: "2vh",
    width: "100%",
  },
  imageContainer: {
    cursor: "pointer",
    display: "flex",
    width: "10vw",
    height: "10vw",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  itemImage: {
    width: "50%",
    height: "80%",
    borderRadius: "0.5vw",
  },
  itemDetail: {
    alignItems: "center",
  },
  itemQuantity: {
    alignItems: "center",
  },
  totalPrice: {
    alignItems: "center",
  },
  removeButton: {
    alignItems: "center",
    // position:'relative',
    // top:'0',
    // justifySelf:'flex-start',
    border: "none",
    background: "transparent",
  },
  removeIcon: {
    width: "20px",
  },
};

const CartCard = ({
  id,
  item,
  image_url,
  title,
  price,
  subTotal,
  quantity,
  onDelete,
  onUpdateQuantity,
}) => {
  // console.log("CartCard props:", id, title, price, quantity, subTotal);
  const navigate = useNavigate();
  const openProductDetails = () => navigate(`/CustomerDashboard/product/${id}`);

  return (
    <div style={styles.cardContainer}>
      <div
        style={{ ...styles.imageContainer, flex: "40%" }}
        onClick={openProductDetails}
      >
        <img src={image_url} alt={title} style={styles.itemImage} />
        <p
          style={{
            marginTop: "1vh",
            fontSize: "1.1vw",
            fontWeight: "200",
            lineHeight: "1.4",
          }}
        >
          {title}
        </p>
      </div>
      <p style={{ ...styles.itemDetail, flex: "20%" }}>${price}</p>
      <div style={{ ...styles.itemQuantity, flex: "20%" }}>
        <Counter
          quantity={quantity}
          setQuantity={(newQuantity) => onUpdateQuantity(id, newQuantity)}
        />
      </div>
      <p style={{ ...styles.totalPrice, flex: "20%" }}>${subTotal}</p>{" "}
      <button
        onClick={() => onDelete(item._id)}
        style={{
          color: "red",
          cursor: "pointer",
          border: "none",
          background: "none",
        }}
      >
        Delete
      </button>
      {/* Total Price */}
      <div></div>
    </div>
  );
};

export default CartCard;
