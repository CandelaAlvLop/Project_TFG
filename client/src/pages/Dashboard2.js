import { useEffect } from 'react';
import "../layouts/Navbar2.css";
import "../layouts/Dashboard.css";
import Footer from "./Footer";
import NavbarIn2 from "./NavbarIn2";
import Navbar3 from "./Navbar3";
import Drawing from "../images/drawing-mainpage.png";


function Dashboard2() {

    //const userId = localStorage.getItem('user_id');

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <div>
            <NavbarIn2 />
            <Navbar3 />
            <h1 className="dashboard-title">Data Control Center</h1>
            <h2 className="dashboard-subtitle">Launch Campaigns, track consumption usage, learn from data, and engage in sustainability campaigns</h2>

            <div className="maincontent-dashboard">
                {/* Sidebar */}
                <div className="sidebar-dashboard">
                    <h3>Launch Campaign</h3>
                    <a href="/addcampaign">Start creating campaigns</a>
                    <h3>Access your Personal Data</h3>
                    <a href="/personaldata2">View and edit your personal data</a>
                    <h3>Your Campaigns</h3>
                    <a href="/mycampaigns">View your campaigns</a>
                </div>

                {/* Main Section */}
                <div className="main-dashboard2">
                        <h1>Claim Your Data!</h1>
                        <p>Follow the steps and help us build a better city.</p>
                        <p>If you have any questions, you can always email us at info@datalog.com</p>
                        <img src={Drawing} alt="Data Visualization" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard2;

