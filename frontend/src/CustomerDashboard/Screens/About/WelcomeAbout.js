
import React from 'react'
import logo from '../../images/logo.png'
import img from '../../images/about.png'


const WelcomeAbout = () => {
  return (
    <div>
        <div style={styles.header}>
        <p style={styles.headerText}>
        Welcome to IDECORE - Where Your Home Begins
        </p>
        <div style={styles.subHeaderTextContainer}>
          <p style={{fontWeight: '300',
    fontSize: '1.3vw',
    color: '#3D3028',
    width:'80vw'}}>
          At IDECORE, we believe that every home tells a story. Our mission is to help you write yours with our curated collection of elegant, innovative, and timeless furniture. Founded in [2024], IDECORE has grown from a passionate idea into a destination for homeowners and designers seeking pieces that spark joy and inspire living spaces.
</p>
        </div>
        </div>
        
      <div style={{padding: '2vw', backgroundColor: 'white',alignItems:'initial'}}>
       
        <div style={{display: 'flex', flexDirection: 'row-reverse',}}>
          <div style={styles.imagecon}>
            <img src={img} alt="img" style={{ maxWidth: '80%', 
    height: 'auto', }} />
          </div>
          <div style={styles.containerright}>
            <p style={styles.lightheaderTextsm}>
OUR JOURNEY            </p>
            <p style={{fontWeight: '300',
    fontSize: '1.3vw',
    color: '#3D3028',
    width:'50vw'}}> 
            It all started with a simple belief: finding the perfect piece of furniture should be straightforward, enjoyable, and reflect your personal style. Frustrated by the lack of options that combined quality, functionality, and beauty, we set out to create a haven for furniture that met these criteria. Today, IDECORE is more than just a furniture app; it's a community of design enthusiasts, a platform for discovery, and a partner in home transformation.

</p>
            
          </div>
        </div>
      </div>
    



   <div style={{padding: '2vw', backgroundColor: 'rgba(106,88,75,0.7)'}}>
  <div style={styles.header}>
    <p style={styles.lightheaderText}>
      OUR PHILOSOPHY
    </p>
  </div>
  <div style={{display: 'flex', flexDirection: 'row'}}>
    <div style={styles.imagecon}>
      <img src={logo} alt="Logo" style={styles.image} />
    </div>
    <div style={styles.containerright}>
      <p style={styles.lightheaderTextsm}>
      Craftsmanship & Choice:
      </p>
      <p style={styles.lightsubHeaderText}> Select pieces for their exceptional quality and design. Quality over quantity ensures every item can be a home's centerpiece.</p>
     
     
      <p style={styles.lightheaderTextsm}>
      Sustainability      </p>
      <p style={styles.lightsubHeaderText}> Eco-friendly practices are a priority. A beautiful home should also mean a healthy planet.</p>
     
      <p style={styles.lightheaderTextsm}>
      Inclusive Design:
      </p>
      <p style={styles.lightsubHeaderText}> Great design is accessible to all. We cater to every taste and budget, making high-quality design available to everyone.</p>
      
    </div>
  </div>
</div>
    </div>
  )
}

export default WelcomeAbout
const styles = {
  header: {
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    padding: '1vw 2vw',
  },
  headerText: {
    fontWeight: '600',
    fontSize: '2.5vw',
    color: '#3D3028',
  },
  lightheaderText: {
    fontWeight: '600',
    fontSize: '2.7vw',
    color: '#F6EFEA',
  },
  imagecon: {
    flex: 1, 
    padding: '0 2vw',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  subHeaderTextContainer:{
padding:'0 6vw'  ,
marginBottom:'0vw'
},
  image: {
    maxWidth: '75%', 
    height: 'auto', 
  },
  containerright: {
    flex: 2, 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'initial',
    alignItems: 'flex-start', 
    padding: '0 2vw',
    width:'40vw'
  },
  lightheaderTextsm: {
    fontWeight: '600',
    fontSize: '1.5vw',
    color: '#3D3028',
  },
  lightsubHeaderText: {
    fontWeight: '300',
    fontSize: '1.3vw',
    color: '#F6EFEA',
  },
  subHeaderText:{
    fontWeight: '400',
    fontSize: '1.1vw',
    color: '#3D3028',
  }
};
