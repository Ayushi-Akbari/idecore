import React, { useEffect, useState } from "react";

const ImageDecoder = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    

    if (imageUrl) {
      loadImage();
    }

    return () => {
      // Clean up the object URL when the component is unmounted
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageUrl, imageSrc]);

  // return (
  //   <div>
  //     {imageSrc ? (
  //       <img
  //         src={imageSrc}
  //         alt="Decoded Image"
  //         style={{ maxWidth: "100%", maxHeight: "100%" }}
  //       />
  //     ) : (
  //       <p>Loading image...</p>
  //     )}
  //   </div>
  // );
};

export default ImageDecoder;
