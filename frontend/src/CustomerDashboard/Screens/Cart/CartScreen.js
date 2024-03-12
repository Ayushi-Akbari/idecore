import { React, useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard";
import backgroundImage from "../../images/CART.gif";
import bag from "../../images/bag.png";
import back from "../../images/back.png";
import axios from "axios";

const CartScreen = () => {
  const {
    cartItems,
    calculateTotal,
    removeFromCart,
    // updateItemQuantity,
    // clearCart,
  } = useCart();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const styles = {
    cartContainer: {
      display: "flex",
    },
    itemsContainer: {
      width: "70%",
      marginRight: "20px",
      padding: "2vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      textAlign: "center",
      padding: "0vw 2vw",
      justifyContent: "center",
    },
    headerText: {
      fontWeight: "700",
      lineHeight: "0.5",
      fontSize: "2.1vw",
      color: "#49372B",
      margin: "1vw 0vw",
    },
    subHeaderTextContainer: {
      margin: "1vw 0vw",
    },
    subHeaderText: {
      fontWeight: "300",
      fontSize: "1.1vw",
      lineHeight: "1.3vw",
      color: "#49372B",
    },
    columnLabels: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      paddingBottom: "10px",
      borderBottom: "2px solid rgba(110,89,75,0.2)",
      fontWeight: "bold",
    },
    label: {
      textAlign: "left",
      width: "20%",
    },
    emptyCartContainer: {
      width: "30%",
      height: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
    summaryContainer: {
      width: "30%",
      minHeight: "90vh",
      backgroundColor: "rgba(246,231,220,0.5)",
      borderRadius: "5px",
      padding: "20px",
    },
    summaryHeading: {
      marginTop: "5vh",
      fontWeight: "700",
      lineHeight: "0.5",
      fontSize: "2vw",
      color: "#49372B",
    },
    summaryTotal: {
      fontWeight: "300",
      fontSize: "1.1vw",
      lineHeight: "1vw",
      color: "#49372B",
    },
    buttonStyle: {
      width: "100%",
      marginBottom: "1vh",
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#49372B",
      color: "#F6E7DC",
    },
    headerContainer: {
      display: "flex",
      alignItems: "center", // Keep items vertically centered
      justifyContent: "center", // Horizontally center the content
      textAlign: "center",
      padding: "0", // Minimize padding to reduce space
      gap: "1vw", // Adjust the gap to ensure elements are not too spaced out,
      marginBottom: "8vh",
    },
    bagImage: {
      width: "4vw",
      height: "4vw", // Maintain aspect ratio
      // marginRight has been removed as it's no longer necessary with gap in place
    },
    headerText: {
      fontWeight: "700",
      lineHeight: "0.5",
      fontSize: "2.1vw",
      color: "#49372B",
      margin: "0", // Ensure there's no extra margin pushing the elements apart
    },
    subHeaderTextContainer: {
      marginTop: "1.5vh", // Minimize margin to reduce space
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Center-align the text for consistency
    },
    subHeaderText: {
      fontWeight: "300",
      fontSize: "1.1vw",
      lineHeight: "1.3vw",
      color: "#49372B",
      textAlign: "center", // Ensure text is centered
      margin: "0", // Remove extra margin
    },
  };

  const [updateCart, setUpdateCart] = useState([]);

  const token = localStorage.getItem("token");
  console.log(token);

  // const queryParams = new URLSearchParams(token).toString();

  const [data, setData] = useState({ total: 0, items: [] });

  useEffect(() => {
    axios
      .get(`http://localhost:4001/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`, //
        },
      })
      .then((res) => {
        console.log(res.data.data[0]);
        setData({
          total: res.data.data[0].total,
          items: res.data.data[0].items,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  console.log("data :", data);

  const updateItemQuantity = (id, quantity) => {
    console.log("id : ", id);
    console.log("quantity : ", quantity);

    axios
      .post("http://localhost:4001/cart", {
        items: [
          {
            product: "phone",
            quantity: 8,
          },
        ],
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const clearCart = async () => {
    try {
      const res1 = await axios.delete("http://localhost:4001/cart/", {
        headers: {
          Authorization: `Bearer ${token}`, //
        },
      });

      const res = await axios.get(`http://localhost:4001/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`, //
        },
      });
      setData({
        total: res.data.data[0].total,
        items: res.data.data[0].items,
      });
    } catch (e) {
      console.error("Error:", e);
    }
  };

  // const [data, setData] = useState([]);

  const deleteData = async (id) => {
    console.log("hii");
    console.log("id : ", id);

    const token = localStorage.getItem("token");
    console.log(token);

    await axios.delete(`http://localhost:4001/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, //
      },
    });

    const res = await axios.get(`http://localhost:4001/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`, //
      },
    });
    setData({
      total: res.data.data[0].total,
      items: res.data.data[0].items,
    });
    console.log("data : ", data);
  };

  const renderCartItemsHeader = () => (
    <div style={styles.columnLabels}>
      <span style={{ ...styles.label, width: "40%" }}></span>
      <span style={styles.label}>Price</span>
      <span style={styles.label}>Quantity</span>
      <span style={styles.label}>Total Price</span>
      <span style={{ ...styles.label, width: "10%" }}></span>
    </div>
  );

  const renderCartItems = () => (
    <>
      <div style={styles.headerContainer}>
        <img src={bag} alt="Bag" style={styles.bagImage} />
        <div style={{ justifyContent: "space-between", gap: "1vh" }}>
          <div style={styles.headerText}>CART ITEMS</div>
          <div style={styles.subHeaderTextContainer}>
            <p style={styles.subHeaderText}>CHECK OUT YOUR CART</p>
          </div>
        </div>
      </div>
      {renderCartItemsHeader()}
      {data.items.map((item) => (
        <CartCard
          key={item._id}
          id={item._id}
          item={item}
          image_url={item.image_url}
          title={item.product}
          price={item.price}
          subTotal={item.subTotal}
          quantity={item.quantity}
          onDelete={deleteData}
          onUpdateQuantity={updateItemQuantity}
        />
      ))}
    </>
  );

  console.log("data.total : ", data.total);

  return (
    <div style={styles.cartContainer}>
      <img
        src={back}
        alt="Back"
        style={{
          cursor: "pointer",
          margin: "0vw 2vw",
          width: "20px",
          height: "20px",
          marginTop: "1vw",
        }}
        onClick={handleBackClick}
      />
      <div style={styles.itemsContainer}>
        {data.items.length > 0 ? (
          renderCartItems()
        ) : (
          <>
            <div style={styles.emptyCartContainer}></div>
            <p>Your cart is empty.</p>
          </>
        )}
      </div>
      <div style={styles.summaryContainer}>
        <h2 style={styles.summaryHeading}>Cart Total</h2>
        <div style={{ margin: "4vh 0" }}>
          <h3
            style={{
              ...styles.summaryTotal,
              fontWeight: "500",
              marginBottom: "2vh",
            }}
          >
            Total Cart Value:
          </h3>
          <h3 style={styles.summaryTotal}> ${data.total}</h3>
        </div>
        <div>
          <button
            onClick={clearCart}
            style={{ ...styles.buttonStyle, marginBottom: "10px" }}
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert("Proceed to Checkout")}
            style={styles.buttonStyle}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
