import React, { useState } from "react";
import pwd from "../../images/pwd.png";
import pwdh from "../../images/pwdh.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  formSide: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    alignSelf: "flex-start",
    marginBottom: "8px",
    color: "#49372B",
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: "1rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "0.5rem",
    padding: "0.7rem",
    border: "1px solid rgba(110,89,75,0.4)",
    borderRadius: "0.5vw",
    backgroundColor: "rgba(250,250,250,0.8)",
  },
  toggleButton: {
    alignSelf: "flex-end",
    marginTop: "-40px",
    marginRight: "10px",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
  },
  loginButton: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "rgba(73,47,29,1)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "5vh",
  },
  forgetPassword: {
    alignSelf: "flex-start",
    margin: "1rem 0",
    color: "rgba(73,47,29,1)",
    cursor: "pointer",
  },
  footerText: {
    marginTop: "1rem",
    display: "flex", // Changed to display inline elements
    alignItems: "center", // Align items vertically in the center
  },
  registerLink: {
    color: "rgba(73,47,29,1)",
    cursor: "pointer",
    marginLeft: "5px", // Add a little space between the texts
  },
};

const SellerLoginForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username: username, password: password };
    console.log(data);

    axios
      .post("http://localhost:4001/seller_login", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("Login Success");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          Navigate("/SellerDashboard/*");
        } else if (res.data.code === 404) {
          if (res.data.message === "Enter valid user") {
            alert("Enter valid user");
          } else if (res.data.message === "Enter valid password") {
            alert("Enter valid password");
          } else {
            alert("Login failed: " + res.data.message);
          }
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div>
      <div style={styles.formSide}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={styles.toggleButton}
            onClick={togglePasswordVisibility}
          >
            <img
              src={isPasswordVisible ? pwdh : pwd}
              alt="Toggle Password Visibility"
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        </div>
        <div style={styles.forgetPassword} onClick={() => {}}>
          Forget Password?
        </div>
        <button style={styles.loginButton} onClick={handleSubmit}>
          Login
        </button>
        <div style={styles.footerText}>
          Don't have an account?
          <div style={styles.registerLink} onClick={onToggleForm}>
            REGISTER
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLoginForm;
