import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from './Rating';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

export default function Feedback() {
  const [width] = useWindowSize();

  const feedbackData = [
    { 
        rating: 5, 
        feedback: "Absolutely stunning dining table!", 
        desc: "The craftsmanship is top-notch and it became an instant centerpiece in our home. The wood finish brings a warm, inviting feel to our meals. Highly recommend!"
    },
    { 
        rating: 4, 
        feedback: "Comfortable and stylish office chair", 
        desc: "Been using it for a month now, and my back thanks me every day. The adjustable features and lumbar support are great. Only wish there were more color options."
    },
    { 
        rating: 3, 
        feedback: "Decent couch, but the fabric fades", 
        desc: "Loved the couch when it arrived, and it's as comfy as can be. However, the fabric started to fade sooner than expected. Good for the price, but keep this in mind."
    },
    { 
        rating: 5, 
        feedback: "Elegant and functional nightstand", 
        desc: "Perfect size for my bedroom, and the drawers slide smoothly. The finish is durable and has maintained its look despite daily use. A great find!"
    },
    { 
        rating: 4, 
        feedback: "Modern bookshelf with ample space", 
        desc: "A sleek addition to my living room that fits my book collection and some decorative items. Assembly was straightforward, though it took a bit of time."
    },
    { 
        rating: 2, 
        feedback: "Outdoor patio set could be better", 
        desc: "Looks good and the price was right, but the material doesn't seem like it will hold up over time. Cushions are also thinner than expected."
    }]

  const itemsPerSlide = width > 1024 ? 3 : width > 768 ? 2 : 1;

  const chunkedFeedbackData = feedbackData.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemsPerSlide);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; 
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <>
      <div style={{marginBottom:'6vw'
}}>

<div style={styles.header}>
        <p style={styles.headerText}>
        CUSTOMER FEEDBACK
        </p>
        <div style={styles.subHeaderTextContainer}>
          <p style={styles.subHeaderText}>
          LET CUSTOMERS SPEAK FOR US
          </p>
        </div>
      </div>

       
        <Carousel 
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          style={styles.carousel}
        >
          {chunkedFeedbackData.map((feedbackGroup, index) => (
            <div key={index} style={styles.slide}>
              {feedbackGroup.map((feedback, feedbackIndex) => (
                <div key={feedbackIndex} style={styles.card}>
                  <div style={styles.contentWrapper}>
                    <Rating rating={feedback.rating.toString()}/>
                    <div style={styles.feedback}>{feedback.feedback}</div>
                    <div style={styles.desc}>{feedback.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

const styles = {
  carousel: {
    height: 'auto',
    padding: '0 2vw',
  },
  slide: {
    paddingBottom:'1vw',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    padding:'1vw 2vw',
    paddingBottom:'0vw'
  },
  headerText: {
    fontWeight: '700',
    lineHeight:'0.5',
    fontSize: '2.1vw',
    color: '#49372B',

  },
  subHeaderTextContainer: {
    margin: 'auto',
    paddingBottom:'0.2vw',
    width:'33vw',
    
  },
  subHeaderText: {
    fontWeight: '300',
    fontSize:'1.1vw',
    lineHeight:'1.3vw',
    color: '#49372B',

  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '30%', 
    marginBottom:'2vw',
  },
  contentWrapper: {
    padding: '2vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  feedback: {
    textAlign: 'center', 
    padding: '2vw', 
    fontWeight: '700', 
    fontSize: '1.3vw',
  },
  desc: {
    textAlign: 'center', 
    color: 'rgba(100, 98, 98, 1)',
    fontWeight: '400', 
    fontSize: '1.1vw',
  },
};
