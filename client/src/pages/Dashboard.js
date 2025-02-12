import React from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../layouts/Dashboard.css";
import Footer from "./Footer";
import Navbar from "./NavbarIn";


function Dashboard() {

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Electricity Consumption (kWh)",
        data: [120, 150, 130, 170, 160, 180],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <div>
      <Navbar />
        <div >
            <nav className="navbar-dashboard">
              <Link to="/personaldata" className="personaldata">Personal Data</Link>
              <Link to="/myconsume" className="myconsume">My Consume</Link>
              <Link to="/datadonation" className="datadonation">Data Donation</Link>
            </nav>
          </div>

          <div className="main-dashboard">
            <h1>Welcome to your dashboard</h1>
            <p>Check your activity and energy consume</p>
          </div>
 
          <div className="graph-dashboard">
            <h2>Energy Consume History</h2>
            <Line data={data} />
          </div>
    <Footer/>
    </div>

  );
}

export default Dashboard;
