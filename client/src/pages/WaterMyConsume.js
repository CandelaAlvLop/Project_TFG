import React, {useEffect, useState} from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";
import "../layouts/MyConsume.css";
import axios from 'axios';
import {Doughnut, Bar} from "react-chartjs-2";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';


function WaterMyConsume() {
    
    const [waterTotalConsume, setWaterTotalConsume] = useState(0);
    const [waterMonthConsume, setWaterMonthConsume] = useState([]);
    const {propertyId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!propertyId) return console.error("No Property retrieved");
        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Water`)
            .then((response) => {
                if (response.data.length === 0){setWaterTotalConsume(0); return}
                setWaterTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(2)); 
        })
    }, [propertyId]);

    useEffect(() => {
        if (!propertyId) return;
      
        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Water`)
            .then((response) => {
                const monthConsumes = [];
                let previousMonth = response.data[0].timer_month; //Number of the previous month
                let previousMonthReading = 0; //Reading of the previous month
                let lastReading = parseFloat(response.data[0].meter_reading); //Last Reading of the month

                for (let i = 0; i < response.data.length; i++) {
                    const readings = parseFloat(response.data[i].meter_reading);

                    if (response.data[i].timer_month != previousMonth) { //Month Change
                        const substract = lastReading - previousMonthReading; //Substract difference to obtain the actual month consume
                        monthConsumes.push(parseFloat(substract));
                        previousMonth = response.data[i].timer_month; //New Month
                        previousMonthReading = lastReading; 
                        lastReading = readings; //Update Reading
                    } else {
                        lastReading = readings;
                    }
                }
                //December push
                monthConsumes.push(parseFloat((lastReading - previousMonthReading)));
                setWaterMonthConsume(monthConsumes);
            })
      }, [propertyId]);

    const waterConsumeMax = 450000;
    const dataWater = {
        datasets: [{
            data: [waterTotalConsume, waterConsumeMax - waterTotalConsume],
            backgroundColor: ["rgb(143, 216, 226)", "rgba(143, 216, 226, 0.12)"],
            cutout: '65%',
            borderWidth: 0,
        }]
    }

    const barWater = {
        labels: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Water Consume (l)",
            data: waterMonthConsume,
            backgroundColor: "rgb(143, 216, 226)"
        }]
    }

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <button type="button" className="back" onClick={() => navigate('/MyConsume')}>Back</button>
            <h1 className="property-title">My Water Consume</h1>
            <div className="consume-data">
                <div className = "consume-input">
                    <h2>Water</h2>
                    <h3>Year Consume</h3>
                    <div style={{width: 300}}>
                        <Doughnut data={dataWater} options={{plugins: {tooltip: {enabled: false}}}}/>
                        <p><strong>{waterTotalConsume} l</strong></p>
                    </div>
                </div>
            </div>
            <Bar data={barWater} />
            <Footer />
        </div>
    );
}

export default WaterMyConsume;