import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const styles = {
  formContainer: {
    display: "flex",
    width: "100vw",
    alignItems: "center", // Changed to center align the items vertically
    justifyContent: "space-evenly",
    padding: "20px",
  },
  imagePickerContainer: {
    width: "40vw",
    height: "auto", // Changed to auto to adjust according to content
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
    border: "2px solid rgba(110,89,75,1)",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    width: "40%", // Adjusted to 40% for symmetry
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  imageList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gap: "10px",
    marginTop: "10px",
    width: "100%", // Full width of its container
    minHeight: "100px", // Minimum height to ensure container visibility
    maxHeight: "200px", // Maximum height to keep the layout tidy
  },
  imageItem: {
    width: "100%", // Adjusted for grid layout
    height: "100px", // Fixed height for consistency
    position: "relative",
    borderRadius: "4px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
  },
  deleteButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
};

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stocks, setStocks] = useState("");
  const [category1, setCategory1] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/category/")
      .then((res) => {
        console.log(res.data.data);
        setCategory1(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (images.length + acceptedFiles.length > 5) {
        alert("Maximum of 5 images can be added.");
      } else {
        const newImages = [...images, ...acceptedFiles].slice(0, 5);
        setImages(newImages);
        console.log("Added images:", newImages); // Log added images
      }
    },
    [images]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDeleteImage = (index) => () => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    console.log("Remaining images:", updatedImages); // Log remaining images after deletion
  };

  const isFormValid = () => {
    return (
      title && category && price && description && stocks && images.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted with images:", images[0]);

    const data = new FormData();
    images.forEach((image, index) => {
      data.append(`image_url`, image);
    });

    data.append("title", title);
    data.append("category", category);
    data.append("description", description);
    data.append("price", parseFloat(price));
    data.append("stocks", parseInt(stocks));

    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    console.log("data :", data);

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post("http://localhost:4001/product/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      if (res.data.status === 200) {
        alert("Data saved successfully");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      // Handle error
    }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.imagePickerContainer}>
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{
            width: "100%",
            height: "40vh",
            border: "2px dashed #888",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop images here, or click to select images (max 5)</p>
        </div>
        <div style={styles.imageList}>
          {images.map((file, index) => (
            <div key={index} style={styles.imageItem}>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />{" "}
              {/* Adjusted objectFit to 'cover' */}
              <button
                onClick={handleDeleteImage(index)}
                style={styles.deleteButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={styles.input}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select a category</option>
          {category1.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          style={styles.input}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          style={{ ...styles.input, height: "100px" }}
        />
        <input
          type="number"
          value={stocks}
          onChange={(e) => setStocks(e.target.value)}
          placeholder="Stocks"
          required
          style={styles.input}
        />
        <button
          type="submit"
          disabled={!isFormValid()}
          style={{
            ...styles.input,
            backgroundColor: "rgba(110,89,75,1)",
            color: "white",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
