import React from "react";
import mainbg from "../../images/store.png"

const Banner = () => {
  return (
    <>
      <div style={styles.mainScreen}>
       
      </div>
     
    </>
  );
};

const styles = {
  mainScreen: {
    height: "82vh",
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
 
};
export default Banner;
