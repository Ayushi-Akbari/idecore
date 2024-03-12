import React from 'react'
import support from "../../images/support.png";
import delivery from "../../images/delivery.png";
import ret from "../../images/return.png";
const Service = () => {
  return (
    <div>
       <div style={styles.iconSection}>
        <div style={styles.iconContainer}>
          <img src={ret} alt="Return Policy" style={styles.iconImage} />
          <div>
            <span style={styles.iconspanbig}>30 DAYS RETURN</span>
          </div>
          <div>
            <span style={styles.iconspansmall}>
              Simply return it within 30 days for an exchange.
            </span>
          </div>
        </div>

        <div style={styles.iconContainer}>
          <img src={delivery} alt="Free Delivery" style={styles.iconImage} />
          <div>
            <span style={styles.iconspanbig}>SPEEDY DELIVERY</span>
          </div>
          <div>
            <span style={styles.iconspansmall}>
              Fast, Reliable, and Right to Your Doorstep
            </span>
          </div>
        </div>

        <div style={styles.iconContainer}>
          <img src={support} alt="Support" style={styles.iconImage} />
          <div>
            <span style={styles.iconspanbig}>Support 24/7</span>
          </div>
          <div>
            <span style={styles.iconspansmall}>
              Contact us 24 hours a day, 7 days a week
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
const styles = {

    iconSection: {
        display: "flex",
        flexDirection: "row",
        spanAlign: "center",
        justifyContent: "space-between",
        padding: "3vw 5vw",
        textAlign:'center'
      },
    
      iconContainer: {
        width: "16vw",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
    
      iconImage: {
        height: "2.6vw", // Reduced from 2.5vw to make the icons smaller
        width: "auto",
        margin: "0.25vw", // Reduced margin for tighter layout
        resize: "contain",
      },
    
      iconspanbig: {
        fontSize: "1.3vw",
        fontWeight: "800",
        spanAlign: "center",
        color: "#524339",
        marginBottom: "0.5vw",
      },
      iconspansmall: {
        fontSize: "1vw",
        fontWeight: "400",
        spanAlign: "center",
        color: "#524339",
      },

}
export default Service
