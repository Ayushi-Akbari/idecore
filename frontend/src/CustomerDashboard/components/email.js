import React, { useState, useEffect } from 'react';
import emailIcon from "../images/email.png";

function Email() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleValidation = () => {
        const valid = validateEmail(email);
        setIsValid(valid);
        if (valid) {
            alert("Email is valid!");
        } else {
            alert("Email is invalid.");
        }
    };

    const inputButtonHeight = '30px'; // Adjust this as needed

    // Responsive styles
    const styles = {
        container: {
           
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: windowWidth < 600 ? 'column' : 'row',
            padding: windowWidth < 600 ? '20px' : ' 0px 0px',
            border: '1px solid #504238',
            borderRadius: '0.7vw',
            backgroundColor: '#FAF4F4',
            gap: windowWidth < 600 ? '10px' : '0',
            overflow: 'hidden', 
            paddingLeft:"1vw"
        },
        icon: {
            width: '2vw',
            height: 'auto',
            margin: '1vw',
            
            
        },
        input: {
            flexGrow: 1,
            border: '0px solid #FAF4F4',
            outline: 'none',
            marginRight: windowWidth < 600 ? '0' : '10px',
            padding: '10px',
            backgroundColor: '#FAF4F4',
             
        },
        validation: {
            marginLeft: '10px',
            color: isValid ? 'green' : 'red',
        },
        button: {
          height:parseInt(inputButtonHeight, 10) * 2 + 'px',// Results in '80px'
            backgroundColor: '#504238',
            color: 'white',
            fontWeight: '300',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            padding: ' 0  30px', 
            borderRadius: '5px',
        }
    };

    return (
        <div style={styles.container}>
            <img src={emailIcon} alt="Email" style={styles.icon} />
            <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            {isValid !== null && (
                <span style={styles.validation}>
                    {isValid ? 'Valid Email' : 'Invalid Email'}
                </span>
            )}
            <button onClick={handleValidation} style={styles.button}>
                Subscribe
            </button>
        </div>
    );
}

export default Email;
