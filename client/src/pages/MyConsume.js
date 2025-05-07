import React, {useEffect, useState} from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";
import "../layouts/MyConsume.css";
import axios from 'axios';
import {Doughnut} from "react-chartjs-2";
import {useNavigate} from 'react-router-dom';


function MyConsume() {
    
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState("");
    const [waterTotalConsume, setWaterTotalConsume] = useState(0);
    const [gasTotalConsume, setGasTotalConsume] = useState(0);
    const [electricTotalConsume, setElectricTotalConsume] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        window.scrollTo(0, 0); 
        if (!userId) return console.error("No User retrieved");
        axios.get(`http://localhost:3001/DataDonationManager/properties/${userId}`)
            .then((response) => {
                setProperties(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving User Property data:", error);
            });
    }, []);

    function selectionProperty (propertyId) {
        if (selectedProperty === propertyId) return "property-select selected";
        else return "property-select";
    }

    useEffect(() => {
        if (!selectedProperty) return console.error("No Property retrieved");
        axios.get(`http://localhost:3001/DataDonationManager/consume/${selectedProperty}/Water`)
            .then((response) => {
                if (response.data.length === 0){setWaterTotalConsume(0); return}
                setWaterTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(2)); //Last reading is the accumulated consume of the year
        })

        axios.get(`http://localhost:3001/DataDonationManager/consume/${selectedProperty}/Electric`)
            .then((response) => {
                if (response.data.length === 0){setElectricTotalConsume(0); return}
                setElectricTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(2));
        })

        axios.get(`http://localhost:3001/DataDonationManager/consume/${selectedProperty}/Gas`)
            .then((response) => {
                if (response.data.length === 0){setGasTotalConsume(0); return}
                setGasTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(4));
        })
    }, [selectedProperty]);

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
            <h1 className="property-title">Select a Property to view its Consume</h1>
            <div className="property-data">
                {properties.map((property) => (
                <button key={property.property_id} className={selectionProperty(property.property_id)}
                    onClick={() => setSelectedProperty(property.property_id)}>
                    {property.propertyName}
                </button>
                ))}
            </div>
            
            {selectedProperty && (
                <div className="consume-data">
                    <div className = "consume-input" onClick={() => {if ((waterTotalConsume) > 0) {navigate(`/WaterMyConsume/${selectedProperty}`)}}}>
                        <h2>Water</h2>
                        <h3>Year Consume</h3>
                        <div style={{width: 300}}>
                            <Doughnut data={dataWater} options={{plugins: {tooltip: {enabled: false}}}}/>
                            <p><strong>{waterTotalConsume} l</strong></p>
                        </div>
                    </div>
                
                    <div className = "consume-input" onClick={() => navigate(`/ElectricMyConsume/${selectedProperty}`)}>
                        <h2>Electric</h2>
                        <h3>Year Consume</h3>
                        <div style={{width: 300}}>
                            <Doughnut data={dataElectric} options={{plugins: {tooltip: {enabled: false}}}}/>
                            <p><strong>{electricTotalConsume} kWh</strong></p>
                        </div>
                    </div>

                    <div className = "consume-input" onClick={() => navigate(`/GasMyConsume/${selectedProperty}`)}>
                        <h2>Gas</h2>
                        <h3>Year Consume</h3>
                        <div style={{width: 300}}>
                            <Doughnut data={dataGas} options={{plugins: {tooltip: {enabled: false}}}}/>
                            <p><strong>{gasTotalConsume} m³</strong></p>
                        </div>
                    </div>
                </div>  
            )}
            <Footer />
        </div>
    );
}

export default MyConsume;