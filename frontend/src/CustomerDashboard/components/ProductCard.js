import React from 'react';
import Rating from '../components/Rating';
import { useNavigate } from 'react-router-dom'; 

const ProductCard = ({ id, imageUrl, title, description, price, rating }) => {
  const navigate = useNavigate(); 

  const openProductDetails = () => navigate(`/CustomerDashboard/product/${id}`);

  return (
    <div style={styles.card} onClick={openProductDetails}>
      <div style={styles.imageContainer}>
        <img src={imageUrl} alt={title} style={styles.image} />
      </div>
      <div style={styles.content}>
        <div style={styles.text}>
          <span style={styles.title}>{title}</span>
          <span style={styles.description}>{description}</span>
        </div>
        <div style={styles.footer}>
          <span style={styles.price}>{price}</span>
          <Rating rating={rating} />
        </div>
      </div>
    </div>
  );
};


const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '17vw',
    cursor: 'pointer', 
    padding: '0.5vw',
    border: "1px solid rgba(110,89,75,0.4)",
    borderRadius: '1vw',
    backgroundColor:'white'
  },
  imageContainer: {
    width: '100%',
    height: '15vw',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '1vw',
  },
  content: {
    marginTop: '1.5vw',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom:'1vw'

  },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '1.1vw',
    fontWeight: '400',
    marginBottom:'0.5vw'

  },
  description: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    fontSize: '1.1vw',
    fontWeight: '200',
    lineHeight: '1.4', 
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: '1vw',
    fontWeight: '400',
  },
};

export default ProductCard;
