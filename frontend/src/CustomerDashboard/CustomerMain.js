import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './routes/routes';

const CustomerMain = () => {
  return (
   
    <>
       <div >
       <Navbar />
       </div>
        <div style={{  paddingTop:'10vh'}}>
        <MainRoute />
     </div>
    </>
     


  );
  
};

export default CustomerMain;
