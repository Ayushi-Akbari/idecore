import React from "react";
import insta from "../../images/instagram.png";
import fb from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import Email from "../../components/email";

export default function ContactUs() {
  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <div style={{ marginBottom: "3vw" }}>
          <div>
            <div style={styles.title}> IDECORE </div>
            <div style={{ width: "21vw" }}>
              <div style={styles.para}>
                Thank you for your interest in iDecore! We're thrilled to assist
                you on your journey to creating a home that reflects your unique
                style and preferences.
              </div>

              <div style={styles.para}>
                 Whether you have questions
                about our products, need help with styling advice, or require
                assistance with an order, we're here to help.
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style={styles.title}> CUSTOMER CARE </div>
          <ul style={styles.para}>
            <li>FAQs</li>
            <li>Accessibility Statement</li>
            <li>Terms of service</li>
            <li>Privacy policy</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div>
          <div style={styles.title}> HELP & SUPPORT </div>
          <ul style={styles.para}>
            <li>Help center</li>
            <li>shipping info</li>
            <li>Returns</li>
            <li>How to order</li>
          </ul>
        </div>

        <div
          style={{
            maxWidth: "12vw",
            display: "flex",
            flexDirection: "column",
            gap: "2vw",
          }}
        >
        <div>
        <div>
  <div style={styles.title}> CONTACT US </div>
  <div style={styles.para}>
    <a   
      href="tel:+999-999-9999" 
      style={{ textDecoration: 'none',  color: " #504238" }}>Phone: 999-999-9999</a>
      
  </div>
</div>
        </div>
          <div>
            <div style={styles.title}> FOLLOW US </div>
            <div style={styles.socialIcons}>
              <img src={insta} alt="Instagram" style={styles.socialIcon} />
              <img src={fb} alt="Facebook" style={styles.socialIcon} />
              <img src={twitter} alt="Twitter" style={styles.socialIcon} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ marginBottom: "1.7vw" }}>
          <div style={styles.btitle}>SIGN UP FOR ALL UPDATES</div>
          <div style={styles.smtitle}>
            Get 15% off your first purchase! Plus, be the first to know about
            sales, new product launches and exclusive offers!
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div style={{ width: "68vw" }}>
            <Email />
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  mainContainer: {
    justifyContent: "space-between",
    padding: "2.5vw 9vw",
    backgroundColor: "#F6EFEA",
        alignItems: "center",
  },
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: "3vw",
  },

  title: {
    fontSize: "1.3vw",
    fontWeight: "700",
    textAlign: "left",
    color: "#504238",
    display: "flex",
  },

  para: {
    flexDirection:'column',
    fontSize: "1.1vw",
    fontWeight: "300",
    textAlign: "left",
    color: " #504238",
    marginTop: "1vw",
  },
  btitle: {
    padding: "0.7vw 2vw",
    fontWeight: "700",
    lineHeight: "1",
    fontSize: "2.1vw",
    textAlign: "center",
    color: "#504238",

  },
  smtitle: {
    textAlign: "center",
    color: "#504238",
    fontWeight: "300",
    fontSize: "1.1vw",
    lineHeight: "1.3vw",
    paddingBottom: "0.2vw",
  },
 
  socialIcons: {
    display: "flex",
    justifyContent: "inline-start",
    alignSelf: "inline-start",
    gap: "10px",
  },
  socialIcon: {
    height: "auto",
    width: "1.26vw",
    resize: "contain",
    BorderRadius: "50%",
  },

};
