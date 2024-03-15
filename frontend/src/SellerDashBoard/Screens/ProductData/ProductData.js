import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ProductDataCard from "./ProductDataCard";
import items from "../../../CustomerDashboard/items";
import EditForm from "./EditForm";
import axios from "axios";

Modal.setAppElement("#root");

const ProductData = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    imageFile: null,
  });

  const getAllProducts = (items) => {
    let allProducts = [];
    items.forEach((item) => {
      item.categories.forEach((category) => {
        allProducts = [...allProducts, ...category.products];
      });
    });
    return allProducts;
  };

  const Products = getAllProducts(items);

  const token = localStorage.getItem("seller_token");
  console.log(token);

  useEffect(() => {
    axios
      .get("http://localhost:4001/seller_product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        console.log(data);
      });
  }, []);

  const handleEdit = async (product) => {
    setModalIsOpen(true);

    const res = await axios.get(
      `http://localhost:4001/category/${product.categoryId}`
    );
    console.log("res.data category : ", res.data.data.name);
    // await setCategory(res.data.data.name);
    const category1 = res.data.data.name;
    console.log("category : ", category1);

    const initialData = {
      id: product._id,
      title: product.title,
      category: category1, // Adjust according to your data structure
      price: product.price,
      description: product.description, // Assuming you have this data
      stocks: product.stocks, // Assuming you have this data
      images: product.image_url.map((url) => url), // Adjust this if your structure is different
    };

    console.log("initialData : ", initialData);
    setEditedProduct(initialData);
  };
  const handleDelete = async (product) => {
    console.log("Delete product", product);
    const res = await axios.delete(
      `http://localhost:4001/product/${product._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);

    const res1 = await axios.get("http://localhost:4001/seller_product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("res.data.data : ", res1.data.data);
    setData(res1.data.data);
    console.log("data : ", data);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{ alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "6vw",
          width: "80vw",
          padding: "2vw 2vw",
          alignItems: "center",
        }}
      >
        {data.map((product) => (
          <ProductDataCard
            key={product._id}
            image={product.image_url[0]}
            title={product.title}
            price={product.price}
            stock={product.stocks}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product)}
          />
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Product Modal"
      >
        <EditForm initialData={editedProduct} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default ProductData;
