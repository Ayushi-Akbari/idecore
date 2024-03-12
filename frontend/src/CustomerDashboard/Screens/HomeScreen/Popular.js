import React, { useState } from "react";
import home from "../../images/Homedecore.png";
import bed from "../../images/Bedroom.png";
import kitchen from "../../images/Kitchen.png";
import { useNavigate } from 'react-router-dom';


const Card = ({ imageURI, title, onButtonClick }) => (
  <div style={styles.card}>
    <div style={styles.imgcon}>
      <img src={imageURI} alt={title} style={styles.cardimg} />
    </div>
    <div style={styles.titlecon}>
      <div style={styles.cardtitle}>{title}</div>
    </div>
   
  </div>
);

const Popular = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const categories = [
    { id: 1, image: home, title: "HOME", link: "/CustomerDashboard/Homedecore" },
    { id: 2, image: bed, title: "BED ROOM", link: "/CustomerDashboard/Bedroom" },
    { id: 3, image: kitchen, title: "KITCHEN", link: "/CustomerDashboard/Kitchen" },
  ];

  const navigate = useNavigate(); 

  const handleNavigation = (link) => {
    navigate(link); 
  };

  return (
    <div style={{ marginBottom: "6vw", padding: "2vw", backgroundColor: "#F6EFEA" }}>
     <div style={styles.header}>
        <p style={styles.headerText}>
        POPULAR CATEGORIES
        </p>
        <div style={styles.subHeaderTextContainer}>
          <p style={styles.subHeaderText}>
          ESSENTIAL FURNISHINGS 



          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {categories.map((category, index) => (
          <div
            key={category.id}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{ position: "relative" }}
          >
            <Card imageURI={category.image} title={category.title} />
            {hoverIndex === index && (
              <div style={styles.overlay}>
                <button 
                  style={styles.button}
                  onClick={() => handleNavigation(category.link)} 
                >
                  VISIT {category.title}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
const styles = {
  title: {
    fontSize: "2.3vw",
    fontWeight: "600",
    textAlign: "center",
    color: "#49372B",
    marginBottom: "2vw",
  },header: {
    textAlign: 'center',
    padding:'1vw 2vw',
  },
  headerText: {
    fontWeight: '700',
    lineHeight:'0.5',
    fontSize: '2.1vw',
    color: '#49372B',

  },
  subHeaderTextContainer: {
    margin: 'auto',
    paddingBottom:'0.2vw',
    width:'33vw',
    
  },
  subHeaderText: {
    fontWeight: '300',
    fontSize:'1.1vw',
    lineHeight:'1.3vw',
    color: '#49372B',

  },
  card:{
    width:'25vw',
    height:'20vw',
    overflow:'hidden'
  },
  imgcon:{
    width:'100%',
    height:'85%',
    display:'flex'
  },
  cardimg:{
    resize:'contain',

  },
  titlecon:{
    width:'100%',
    height:'15%',
    display:'flex',
    backgroundColor:"#49372B",
    textAlign:'center',
    justifyContent:'center',
    alignItems:"center",

  },
  cardtitle:{
    fontSize: "2vw",
    fontWeight: "400",
    textAlign: "center",
    color: "#E8DDD5",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
  },
};

export default Popular;
