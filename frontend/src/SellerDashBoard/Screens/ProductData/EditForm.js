import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const EditForm = ({ initialData, closeModal }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stocks, setStocks] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Set form fields from initialData
    setTitle(initialData.title || "");
    setCategory(initialData.category || "");
    setPrice(initialData.price || "");
    setDescription(initialData.description || "");
    setStocks(initialData.stocks || "");
    // Prepare images for display
    const preparedImages =
      initialData.images?.map((image) => ({
        preview: typeof image === "string" ? image : URL.createObjectURL(image),
      })) || [];
    setImages(preparedImages);
    console.log("category : ", category);
  }, [initialData]);

  const [category1, setCategory1] = useState([]);
  const [updatedCategory, setUpdatedCategory] = useState("");

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
      const filesWithPreview = acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      }));
      if (images.length + filesWithPreview.length > 5) {
        alert("Maximum of 5 images can be added.");
        return;
      }
      const newImages = [...images, ...filesWithPreview].slice(0, 5);
      setImages(newImages);
    },
    [images]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDeleteImage = useCallback(
    (index) => () => {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
    },
    [images]
  );

  useEffect(() => {
    return () =>
      images.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: initialData.id,
      title,
      category,
      price,
      description,
      stocks,
      // images,
    };

    // const data = new FormData();
    // // images.forEach((image, index) => {
    // //   data.append(`image_url${index + 1}`, image);
    // // });
    // data.append("title", title);
    // data.append("category", category);
    // data.append("description", description);
    // data.append("price", parseFloat(price));
    // data.append("stocks", parseInt(stocks));
    // console.log("data : ", data);

    // for (let pair of data.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    const token = localStorage.getItem("seller_token");
    console.log(token);

    const res = await axios.put(
      `http://localhost:4001/product/${data.id}`,
      data,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    closeModal(); // Close the modal on successful submission
  };

  const isFormValid = () =>
    title && category && price && description && stocks && images.length > 0;

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
                src={`http://localhost:4001/images/${file.preview}`}
                alt={`preview ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
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
          style={styles.input}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={styles.input}
        >
          {!category ? (
            <option value="">Select a category</option>
          ) : (
            <option value={category}>{category}</option>
          )}
          {category1.map((cat, index) => (
            <option key={index} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          style={styles.input}
          type="number"
          placeholder="Stocks"
          value={stocks}
          onChange={(e) => setStocks(e.target.value)}
        />
        <button
          type="submit"
          disabled={!isFormValid()}
          style={{
            padding: "10px",
            marginTop: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
const styles = {
  formContainer: {
    display: "flex",
    width: "100vw",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "20px",
  },
  imagePickerContainer: {
    width: "40vw",
    height: "auto",
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
    width: "40%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  imageList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "10px",
    width: "100%",
    minHeight: "100px",
    maxHeight: "200px",
  },
  imageItem: {
    width: "100%",
    height: "100px",
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
