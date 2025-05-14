import { useEffect, useState } from 'react';
import "chart.js/auto";
import "../layouts/Navbar2.css";
import "../layouts/Dashboard.css";
import Footer from "./Footer";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";
import axios from 'axios';
import { Doughnut } from "react-chartjs-2";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";


function Dashboard() {

    const [waterTotalConsume, setWaterTotalConsume] = useState(0);
    const [gasTotalConsume, setGasTotalConsume] = useState(0);
    const [electricTotalConsume, setElectricTotalConsume] = useState(0);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!userId) return console.error("No User retrieved");

    }, []);

    const waterConsumeMax = 450000;
    const dataWater = {
        datasets: [{
            data: [waterTotalConsume, waterConsumeMax - waterTotalConsume],
            backgroundColor: ["rgb(143, 216, 226)", "rgba(143, 216, 226, 0.12)"],
            cutout: '65%',
            borderWidth: 0,
        }]
    }

    const electricConsumeMax = 28000;
    const dataElectric = {
        datasets: [{
            data: [electricTotalConsume, electricConsumeMax - electricTotalConsume],
            backgroundColor: ["rgb(152, 240, 149)", "rgba(146, 226, 143, 0.12)"],
            cutout: '65%',
            borderWidth: 0,
        }]
    }

    const gasConsumeMax = 20;
    const dataGas = {
        datasets: [{
            data: [gasTotalConsume, gasConsumeMax - gasTotalConsume],
            backgroundColor: ["rgb(248, 121, 121)", "rgba(196, 139, 139, 0.12)"],
            cutout: '65%',
            borderWidth: 0,
        }]
    }


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
                    <div className="consume-data-main">
                        <div className="consume-input">
                            <h2><IoWaterOutline /> Water</h2>
                            <h3>Year Consume</h3>
                            <div style={{ width: 300 }}>
                                <Doughnut data={dataWater} options={{ plugins: { tooltip: { enabled: false } } }} />
                                <p><strong>{waterTotalConsume} l</strong></p>
                            </div>
                        </div>

                        <div className="consume-input">
                            <h2><FaRegLightbulb /> Electric</h2>
                            <h3>Year Consume</h3>
                            <div style={{ width: 300 }}>
                                <Doughnut data={dataElectric} options={{ plugins: { tooltip: { enabled: false } } }} />
                                <p><strong>{electricTotalConsume} kWh</strong></p>
                            </div>
                        </div>

                        <div className="consume-input">
                            <h2><FaFire /> Gas</h2>
                            <h3>Year Consume</h3>
                            <div style={{ width: 300 }}>
                                <Doughnut data={dataGas} options={{ plugins: { tooltip: { enabled: false } } }} />
                                <p><strong>{gasTotalConsume} m³</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;

