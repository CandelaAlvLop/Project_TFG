import React, {useEffect} from 'react';
import "chart.js/auto";
import "../layouts/Dashboard.css";
import Footer from "./Footer";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";


function Dashboard() {
  //Show top of the page
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);


  return (
    <div>
      <Navbar />
      <Navbar2 />
        <h1>Welcome to your dashboard</h1>
        <p>Check your activity and energy consume</p>
      <Footer/>
    </div>

  );
}

export default Dashboard;
