import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "./FavouriteContext";
import items from "../../items";
import FavCard from "./FavCard";
import back from "../../images/back.png";
import axios from "axios";

const FavScreen = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const token = localStorage.getItem("token");
  const { favorites, removeFavorite } = useFavorites();
  const findProductById = (id) => {
    for (let item of items) {
      for (let category of item.categories) {
        const product = category.products.find(
          (product) => product.id.toString() === id
        );
        if (product) return product;
      }
    }
    return null;
  };

  // Assuming removeFavorite is a method in your context to remove a favorite
  const handleRemove = async (id) => {
    // removeFavorite(id); // Update context state
    console.log(id);

    await axios.delete(`http://localhost:4001/fav/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await axios.get("http://localhost:4001/fav/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.data);
    setData(res.data.data);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4001/fav/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "2rem",
          marginBottom: "6vw",
          padding: "1vw 2vw",
          backgroundColor: "rgba((230,222,213,0.4)",
        }}
      >
        {data.map((product) => {
          {
            /* const product = findProductById(id); */
          }
          if (!product) return null;
          return (
            <FavCard
              key={product._id}
              id={product._id}
              imageUrl={product.image_url[0]}
              title={product.title}
              description={product.description}
              price={`${product.price.toFixed(2)}`}
              onRemove={() => handleRemove(product._id)} // Pass handleRemove as a prop
            />
          );
        })}
      </div>
    </>
  );
};

export default FavScreen;
