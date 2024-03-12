import React from 'react';
import { useDropzone } from 'react-dropzone';
import altimg from '../../../images/imageupload.png'

              
const ImageUpload = ({ index, image, onDrop, onDelete }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const imageContainerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    marginRight: '10px',
    marginBottom: '10px',
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
  };

  const deleteButtonStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
  };

  return (
    <div {...getRootProps()} style={{
      border: '2px dashed rgba(110,89,75,0.5)',
      padding: '20px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10px',
    }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <div style={imageContainerStyle}>
          {image.imageURL ? (
            <>
              <img src={image.imageURL} alt="preview" style={imageStyle} />
              <button type="button" onClick={(event) => {
                event.stopPropagation();
                onDelete();
              }} style={deleteButtonStyle}>X</button>
            </>
          ) : (
            <>
              <img src={altimg} alt="upload placeholder" style={{ width: '50px', height: '50px' ,marginBottom:'2vw'}} />
              <p style={{position: 'absolute', marginTop: '60px'}}>Upload image</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
