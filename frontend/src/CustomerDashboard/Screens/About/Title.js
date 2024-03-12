import React from 'react';
import backgroundImage from '../../images/aboutus.png'; 

const Title = () => {
  return (
    <div style={styles.mainScreen}>
      <div  style={styles.content}>
        <div style={styles.text}>ABOUT-US</div>
        <div style={styles.heading}>FURNITURE</div>
        <div style={styles.subheading}>Make your home look elegant</div>
      </div>
    </div>
  )
}

export default Title
const styles = {
    mainScreen: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '90vh',
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-start', 
      paddingLeft: '10vw', 
      marginBottom: '6vw',
    },
    
    content: {
      padding: '5vh 5vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(73,47,29,0.2)',
      borderRadius: '2vw',
      zIndex: 1, // Ensures content is above the overlay
      textAlign: 'left', // Ensure text aligns to the left
    },
    text: {
      fontSize: "4.3vw",
      lineHeight: '4.5vw',
      fontWeight: "900",
      textAlign: 'center', // Keep the main title centered or change to 'left' based on preference
      color: '#7D665B',
    },
    heading: {
      fontSize: "2.2vw",
      fontWeight: "600",
      textAlign: 'left',
      color: '#967666',
    },
    subheading: {
      fontSize: "1.1vw",
      lineHeight: '1.3vw',
      fontWeight: "300",
      textAlign: 'left',
      color: '#967666',
    },
  };
  