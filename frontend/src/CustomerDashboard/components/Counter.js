import React, { useState } from 'react';
import addImage from '../images/plus.png';
import subImage from '../images/minus.png';

const Counter = ({ quantity, setQuantity }) => {
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '5px' }}>
      <button onClick={handleDecrement} style={{ background: 'transparent', border: 'none', outline: 'none' }}>
        <img src={subImage} alt="Subtract" style={{ width: '2vw', height: '2vw' }} />
      </button>

      <span style={{ fontSize: '1.1vw', width: '2.1vw', height: '2vw', borderRadius: '5px', textAlign: 'center', border: '1px solid rgba(110,89,75,1)' }}>
        {quantity}
      </span>

      <button onClick={handleIncrement} style={{ background: 'transparent', border: 'none', outline: 'none' }}>
        <img src={addImage} alt="Add" style={{ width: '2vw', height: '2vw' }} />
      </button>
    </div>
  );
};

export default Counter;