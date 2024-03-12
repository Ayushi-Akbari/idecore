import React from 'react';
import emptyStar from '../images/Star.png';
import filledStar from '../images/Star_f.png';

const Rating = ({ rating }) => {
  return (
    <div style={{ display: 'flex' }}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <img
            key={index}
            src={index <= rating ? filledStar : emptyStar}
            alt="star"
            style={{ width: '1.4vw', height: '1.4vw' }} 
          />
        );
      })}
    </div>
  );
};

export default Rating;
