import React, { useState } from 'react';
import SellerRegisterForm from './Register';
import SellerLoginForm from './Login';
import bg from '../../images/logo.png'

export default function SellerMainLogin() {
    const [isLoginActive, setIsLoginActive] = useState(true);

    const toggleForm = () => {
        setIsLoginActive(!isLoginActive);
    };

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80vh', 
        width: '45vw', 
        overflow: 'auto', 
        margin: '20px auto',
        border: "1px solid rgba(110,89,75,0.4)",
        borderRadius: '1vw',        
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        backgroundColor: '#D8CBC4',
        padding:'2vw',
        zIndex: 4,
        

    };

    return (
       <div style={styles.maincontainer}>
                   <div style={styles.overlay}></div>

         <div style={containerStyles}>
            <div style={styles.toggleButtons}>
                <div style={styles.buttonContainer}>
                    <button
                        onClick={() => setIsLoginActive(true)}
                        style={isLoginActive ? styles.activeButton : styles.inactiveButton}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLoginActive(false)}
                        style={!isLoginActive ? styles.activeButton : styles.inactiveButton}
                    >
                        Register
                    </button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                {isLoginActive ? <SellerLoginForm onToggleForm={toggleForm}/> : <SellerRegisterForm onToggleForm={toggleForm}/>}
            </div>
        </div>
       </div>
    );
};
  

const styles = {
  maincontainer:{ display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', 
  width: '100vw', 
  backgroundImage: `url(${bg})`, 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
},
overlay: {
  position: 'absolute',
  top:'10vh',
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(250, 250, 250, 0)', 
  zIndex: 1, 
},
    toggleButtons: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1vh 0',
        backgroundColor: '#D8CBC4',
        marginBottom:'2vh',
        borderRadius: '1.5vh',

    },
    buttonContainer: {
        width: '100%', 
        display: 'flex',
        backgroundColor: 'rgba(73,47,29,0.4)',
        borderRadius: '1.5vh',
    },
    activeButton: {
        flex: 1, 
        backgroundColor: 'rgba(73,47,29,1)',
        border: 'none',
        padding: '1vh 2vw',
        cursor: 'pointer',
        color: '#D8CBC4',
        borderRadius: '1.5vh',
        fontSize: '3vh',
        outline: 'none',
        
    },
    inactiveButton: {
        flex: 1,
        backgroundColor: ' rgba(110,89,75,0)',
        border: 'none',
        padding: '1vw 2vw',
        cursor: 'pointer',
        color:'#49372B',
        borderRadius: '1.5vh',
        fontSize: '3vh',
        outline: 'none',
    }
};
