import React, { useState } from "react";
import mainbg from "../../images/organizer.png";
import { useNavigate } from "react-router-dom";


const Banner = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const buttonStyles = isButtonHovered
    ? { ...styles.button, ...styles.buttonHover }
    : styles.button;

  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <>
      <div style={styles.mainScreen}>
        <div style={styles.content}>
          <div style={styles.welcome}>New Collection Alert </div>
          <div style={styles.heading}>Stylish Organizers for Every Room!</div>
          <div style={styles.subheading}>Unlock Clutter-Free Living</div>
        </div>
        <div style={{ margin: "2vw" }}>
          <button
            className="button-hover-effect"
            style={buttonStyles}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={() => handleNavigation("/CustomerDashboard/Organizers")}
          >
            SHOP NOW
          </button>
        </div>
      </div>
     
    </>
  );
};

const styles = {
  mainScreen: {
    height: "90vh",
    width: "100vw",
    backgroundImage: `url(${mainbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  content: {
    padding: "5vh 5vw",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "rgba(200,188,183,0.6)",
    borderRadius: "2vw",
  },
  welcome: {
    fontSize: "4vw",
    lineHeight: "4.5vw",
    fontWeight: "900",
    spanAlign: "center",
    color: "#524339",
  },
  heading: {
    fontSize: "2vw",
    fontWeight: "600",
    spanAlign: "initial",
    color: "white",
  },
  subheading: {
    fontSize: "1.1vw",
    lineHeight: "1.3vw",
    fontWeight: "300",
    spanAlign: "initial",
    color: "white",
  },
  button: {
    padding: "0.6vw 0.9vw",
    borderRadius: "0.4vw",
    backgroundColor: "#524339",
    color: "white",
    fontSize: "1.3vw",
    outline: "none",
    border: "none",
  },

  buttonHover: {
    outline: "none",
    backgroundColor: "rgba(0,0,0,0)",
    color: "#524339",
    border: "2px solid black",
  },

 
};
export default Banner;
