import React, { useEffect, useState } from 'react';
import mainbg from '../../images/Homemain.png';
import './welcome.css'; 

const Welcome = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.mainScreen}>
      <div className={`${animate ? 'fadeIn' : ''}`} style={styles.content}>
        <div className={`${animate ? ' slideIn slideIn1' : ''}`} style={styles.welcome}>IDECORE</div>
        <div className={`${animate ? 'slideIn slideIn2' : ''}`} style={styles.heading}>FURNITURE</div>
        <div className={`${animate ? 'slideIn slideIn3' : ''}`} style={styles.subheading}>Make your home look elegant</div>
      </div>
    </div>
  );
}

export default Welcome;

const styles = {
  mainScreen: {
    height: '90vh',
    width: '100vw',
    backgroundImage: `url(${mainbg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:'6vw'
  },
  content: {
    padding: '5vh 5vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(73,47,29,0.4)',
    borderRadius: '2vw',
  },
  welcome: {
    fontSize: "4vw",
    lineHeight: '4.5vw',
    fontWeight: "900",
    textAlign: 'center',
    color: '#6E594B',
  },
  heading: {
    fontSize: "2vw",
    fontWeight: "600",
    textAlign: 'initial',
    color: 'white',
  },
  subheading: {
    fontSize: "1.1vw",
    lineHeight: '1.3vw',
    fontWeight: "300",
    textAlign: 'initial',
    color: 'white',
  },
};
