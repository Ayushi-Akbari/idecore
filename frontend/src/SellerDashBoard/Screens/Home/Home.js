// import React from 'react'
import React, { useEffect, useState } from "react";

const Home = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        // Fetch the image blob
        const response = await fetch(
          "blob:http://localhost:3001/e95a1730-6ce3-4694-9e64-da8fa72ad990"
        );
        const blob = await response.blob();

        // Convert blob to URL
        const url = URL.createObjectURL(blob);

        // Set the URL in state
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();

    // Clean up URL object when component unmounts
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  return <div>{imageUrl && <img src={imageUrl} alt="Image" />}</div>;
};

// return (
//   <div>
//     HOME
//   </div>
// )

export default Home;
