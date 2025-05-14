import { useEffect } from 'react';
import "chart.js/auto";
import "../layouts/Navbar2.css";
import "../layouts/Dashboard.css";
import Footer from "./Footer";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";


function Dashboard() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
      <div>    
        <Navbar />
        <Navbar2 />
        <h1 className="dashboard-title">Data Control Center</h1>
        <h2 className="dashboard-subtitle">Track your resource usage, contribute your data, and engage in sustainability campaigns</h2>

        <div className="maincontent-dashboard">
          {/* Sidebar */}
          <div className="sidebar-dashboard">
            <h3>Add Property</h3>
            <a href="/addproperty">Start registering your properties</a>
            <h3>Access your Personal Data</h3>
            <a href="/personaldata">View and edit your personal data</a>
            <h3>View Your Data</h3>
            <a href="/myconsume">View your utility consumption data</a>
            <h3>Your Campaigns</h3>
            {/*<a href="/campaigns">*/} View and edit your campaign participation {/*</a>*/}
            <h3>Consume Overwiew</h3>
            {/*<a href="/instructions">*/} Check your overall consume{/*</a>*/}
            <h3>Information</h3>
            <a href="/faqinside">Frequently Asked Questions</a>
          </div>

          {/* Main Section */}
          <div className="access-dashboard">
            <h2>Start the process!</h2> 
          </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;

