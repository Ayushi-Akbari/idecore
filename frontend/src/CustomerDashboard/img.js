import React, { useEffect, useState } from "react";

const Img = () => {
  const [imageDataUrl, setImageDataUrl] = useState(null);

  useEffect(() => {
    // Function to fetch and decode the blob URL
    async function fetchAndDecodeBlob(blobUrl) {
      console.log("hoo");
      const response = await fetch(blobUrl);
      console.log("grt");
      console.log(response);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    // Example Blob URL
    const blobUrl =
      "blob:http://localhost:3001/e95a1730-6ce3-4694-9e64-da8fa72ad990";

    // Fetch and decode the blob URL
    fetchAndDecodeBlob(blobUrl)
      .then((dataUrl) => {
        // Set the data URL in state
        console.log("hiiii");
        console.log(dataUrl);
        setImageDataUrl(dataUrl);
      })
      .catch((error) => {
        console.error("Error fetching or decoding blob:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>{imageDataUrl && <img src={imageDataUrl} alt="decoded image" />}</div>
  );
};

export default Img;
