import { useEffect, useState } from 'react';
import "../layouts/Navbar2.css";
import "../layouts/Dashboard.css";
import Footer from "./Footer";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";
import axios from 'axios';
import "chart.js/auto";
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

        let waterTotalSum = 0;
        let gasTotalSum = 0;
        let electricTotalSum = 0;

        axios.get(`http://localhost:3001/DataDonationManager/properties/${userId}`)
            .then((response) => {
                response.data.forEach((property) => {
                    axios.get(`http://localhost:3001/DataDonationManager/consume/${property.property_id}/Water`)
                        .then((responseWater) => {
                            if (responseWater.data.length !== 0) {
                                waterTotalSum += parseFloat(responseWater.data[responseWater.data.length - 1].meter_reading); //Last reading is the accumulated consume of the year
                                setWaterTotalConsume(waterTotalSum.toFixed(2));
                            }
                        })
                        .catch((error) => {
                            console.error("Error retrieving Water Consume data:", error);
                        });

                    axios.get(`http://localhost:3001/DataDonationManager/consume/${property.property_id}/Electric`)
                        .then((responseElectric) => {
                            if (responseElectric.data.length !== 0) {
                                electricTotalSum += parseFloat(responseElectric.data[responseElectric.data.length - 1].meter_reading);
                                setElectricTotalConsume(electricTotalSum.toFixed(2));
                            }
                        })
                        .catch((error) => {
                            console.error("Error retrieving Electric Consume data:", error);
                        });

                    axios.get(`http://localhost:3001/DataDonationManager/consume/${property.property_id}/Gas`)
                        .then((responseGas) => {
                            if (responseGas.data.length !== 0) {
                                gasTotalSum += parseFloat(responseGas.data[responseGas.data.length - 1].meter_reading);
                                setGasTotalConsume(gasTotalSum.toFixed(4));
                            }
                        })
                        .catch((error) => {
                            console.error("Error retrieving Gas Consume data:", error);
                        });
                })
            })
            .catch((error) => {
                console.error("Error retrieving User Property data:", error);
            });
    }, [userId]);


    const waterConsumeMax = 1500000;
    const dataWater = {
        datasets: [{
            data: [waterTotalConsume, waterConsumeMax - waterTotalConsume],
            backgroundColor: ["rgb(143, 216, 226)", "rgba(143, 216, 226, 0.12)"],
            cutout: '65%',
            borderWidth: 0,
        }]
    }

    const electricConsumeMax = 65000;
    const dataElectric = {
        datasets: [{
            data: [electricTotalConsume, electricConsumeMax - electricTotalConsume],
            backgroundColor: ["rgb(152, 240, 149)", "rgba(146, 226, 143, 0.12)"],
            cutout: '65%',
            borderWidth: 0,
        }]
    }

    const gasConsumeMax = 50;
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
                    <h3>Information</h3>
                    <a href="/faqinside">Frequently Asked Questions</a>
                    <h3>Upload Data</h3>
                    <a href="/datadonation"> Upload your utility consumption data</a>
                    <h3>View Your Data</h3>
                    <a href="/myconsume">View your utility consumption data</a>
                    <h3>Access your Personal Data</h3>
                    <a href="/personaldata">View and edit your personal data</a>
                    <h3>Add Property</h3>
                    <a href="/addproperty">Start registering your properties</a>
                </div>

                {/* Main Section */}
                <div className="main-dashboard">
                    <div className="graphic-main">
                        <div className="graphic-input">
                            <h2><IoWaterOutline /> Water</h2>
                            <div style={{ width: 220 }}>
                                <Doughnut data={dataWater} options={{ plugins: { tooltip: { enabled: false } } }} />
                                <p><strong>{waterTotalConsume} l</strong></p>
                            </div>
                        </div>

                        <div className="graphic-input">
                            <h2><FaRegLightbulb /> Electric</h2>
                            <div style={{ width: 220 }}>
                                <Doughnut data={dataElectric} options={{ plugins: { tooltip: { enabled: false } } }} />
                                <p><strong>{electricTotalConsume} kWh</strong></p>
                            </div>
                        </div>

                        <div className="graphic-input">
                            <h2><FaFire /> Gas</h2>
                            <div style={{ width: 220 }}>
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

