import React from "react";
import editButtonImage from "../../images/pencil.png";
import deleteButtonImage from "../../images/bin.png";

function ProductDataCard({ image, title, price, stock, onEdit, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
        width: "1000px", // Fixed width for the card
      }}
    >
      <img
        src={`http://localhost:4001/images/${image}`}
        alt={title}
        style={{ width: "100px", height: "100px", marginRight: "20px" }}
      />
      <div style={{ flex: 1, marginRight: "20px" }}>
        {" "}
        {/* Adjusted to ensure text doesn't overflow to buttons */}
        <h3 style={{ margin: 0 }}>{title}</h3>{" "}
        {/* Removed default margins for consistency */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginRight: "60px",
        }}
      >
        <p
          style={{ margin: "0 0 5px 0", fontSize: "24px", fontWeight: "bold" }}
        >
          ${price}
        </p>{" "}
        {/* Consistent spacing between price and stock */}
        <p style={{ margin: 0 }}>{stock} in stock</p>
      </div>
      <button
        onClick={onEdit}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        <img
          src={editButtonImage}
          alt="Edit"
          style={{ width: "24px", height: "24px" }}
        />
      </button>
      <button
        onClick={onDelete}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <img
          src={deleteButtonImage}
          alt="Delete"
          style={{ width: "24px", height: "24px" }}
        />
      </button>
    </div>
  );
}

export default ProductDataCard;
