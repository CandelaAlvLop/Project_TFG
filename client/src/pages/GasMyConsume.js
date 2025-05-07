import React, {useEffect, useState} from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";
import "../layouts/WaterMyConsume.css";
import axios from 'axios';
import {Doughnut, Bar} from "react-chartjs-2";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {IoMdArrowRoundBack} from "react-icons/io";


function GasMyConsume() {

    const [waterTotalConsume, setWaterTotalConsume] = useState(0);
    const [electricTotalConsume, setElectricTotalConsume] = useState(0);
    const [gasTotalConsume, setGasTotalConsume] = useState(0);
    const [gasMonthConsume, setGasMonthConsume] = useState([]);
    const [gasDayConsume, setGasDayConsume] = useState([]);
    const [selectMonth, setSelectMonth] = useState(1);
    const {propertyId} = useParams();
    const navigate = useNavigate();

    //Year Graphic Representation
    useEffect(() => {
        window.scrollTo(0, 0); 
        if (!propertyId) return console.error("No Property retrieved");
        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Water`)
            .then((response) => {
                if (response.data.length === 0){setWaterTotalConsume(0); return}
                setWaterTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(2)); 
        })

        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Electric`)
            .then((response) => {
                if (response.data.length === 0){setElectricTotalConsume(0); return}
                setElectricTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(2)); 
        })

        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Gas`)
            .then((response) => {
                if (response.data.length === 0){setGasTotalConsume(0); return}
                setGasTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(2)); 
        })
    }, [propertyId]);

    //Month Graphic Representation
    useEffect(() => {
        if (!propertyId) return;
      
        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Gas`)
            .then((response) => {
                const monthConsumes = [];
                let previousMonth = response.data[0].timer_month; //Number of the previous month
                let previousMonthReading = 0; //Reading of the previous month
                let lastReading = parseFloat(response.data[0].meter_reading); //Last Reading of the month

                for (let i = 0; i < response.data.length; i++) {
                    const readings = parseFloat(response.data[i].meter_reading);

                    if (response.data[i].timer_month !== previousMonth) { //Month Change
                        monthConsumes.push(parseFloat(lastReading - previousMonthReading)); //Substract difference to obtain the actual month consume
                        previousMonth = response.data[i].timer_month; //New Month
                        previousMonthReading = lastReading; 
                        lastReading = readings; //Update Reading
                    } else {
                        lastReading = readings;
                    }
                }
                //December push
                monthConsumes.push(parseFloat((lastReading - previousMonthReading)));
                setGasMonthConsume(monthConsumes);
            })
    }, [propertyId]);
      
    //Day Graphic Representation
    useEffect(() => {
        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Gas`)
            .then((response) => {
                let dayConsumes = [];
                let previousMonth = response.data[0].timer_month; 
                let previousDay = response.data[0].timer_day; 
                let previousDayReading = 0; 
                let lastReading = parseFloat(response.data[0].meter_reading);
                let months = {};

                    for (let i = 0; i < response.data.length; i++) {
                        const readings = parseFloat(response.data[i].meter_reading);
    
                        if (response.data[i].timer_month !== previousMonth) {
                            dayConsumes.push(parseFloat(lastReading - previousDayReading)); 
                            months[previousMonth] = dayConsumes; //Store Day Consume into its Month
                            //Update Month and Day
                            previousMonth = response.data[i].timer_month;
                            previousDay = response.data[i].timer_day;
                            previousDayReading = lastReading; //Update last Reading
                            dayConsumes = []; //Reset for the new month
                        } else if (response.data[i].timer_day !== previousDay) { 
                            dayConsumes.push(parseFloat(lastReading - previousDayReading)); 
                            previousDay = response.data[i].timer_day;
                            previousDayReading = lastReading;
                        }
                        lastReading = readings;
                    }
                dayConsumes.push(parseFloat(lastReading - previousDayReading)); 
                months[previousMonth] = dayConsumes;
                setGasDayConsume(months);
            })
    }, [propertyId, selectMonth]);

    function selectionMonth (month) {
        if (selectMonth === month) return "month-select selected";
        else return "month-select";
    }

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

    const barMonthGas = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Gas Month Consume (l)",
            data: gasMonthConsume,
            backgroundColor: "rgb(248, 121, 121)"
        }]
    }

    const gasDayConsume_ = gasDayConsume[selectMonth] || [];
    const barDayGas = {
        labels: gasDayConsume_.map((value, index) => (index + 1).toString()),
        datasets: [{
            label: "Gas Daily Consume (l)",
            data: gasDayConsume_,
            backgroundColor: "rgb(248, 121, 121)"
        }]
    }

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <button type="button" className="back-button" onClick={() => navigate('/MyConsume')}><IoMdArrowRoundBack /> Back</button>
            <h1 className="consume-title">My Gas Consume</h1>
            <div className="consume-data">
                <div className = "consume-year">
                    <h2>Gas</h2>
                    <h3>Year Consume</h3>
                    <div style={{width: 300}}>
                        <Doughnut data={dataGas} options={{plugins: {tooltip: {enabled: false}}}}/>
                        <p><strong>{gasTotalConsume} m³</strong></p>
                    </div>
                </div>
                <div className="consume-month"> 
                    <h3>Month Consume</h3>
                    <Bar data={barMonthGas}/>
                </div>
            </div>

            <div className="consume-data">
                <div className="consume-month-selection"> 
                    <button onClick={() => setSelectMonth(1)} className={selectionMonth(1)}>Jan</button>
                    <button onClick={() => setSelectMonth(2)} className={selectionMonth(2)}>Feb</button>
                    <button onClick={() => setSelectMonth(3)} className={selectionMonth(3)}>Mar</button>
                    <button onClick={() => setSelectMonth(4)} className={selectionMonth(4)}>Apr</button>
                    <button onClick={() => setSelectMonth(5)} className={selectionMonth(5)}>May</button>
                    <button onClick={() => setSelectMonth(6)} className={selectionMonth(6)}>Jun</button>
                    <button onClick={() => setSelectMonth(7)} className={selectionMonth(7)}>Jul</button>
                    <button onClick={() => setSelectMonth(8)} className={selectionMonth(8)}>Aug</button>
                    <button onClick={() => setSelectMonth(9)} className={selectionMonth(9)}>Sep</button>
                    <button onClick={() => setSelectMonth(10)} className={selectionMonth(10)}>Oct</button>
                    <button onClick={() => setSelectMonth(11)} className={selectionMonth(11)}>Nov</button>
                    <button onClick={() => setSelectMonth(12)} className={selectionMonth(12)}>Dec</button>
                </div>
                <div className="consume-day"> 
                    <h3>Daily Consume</h3>
                    <Bar data={barDayGas}/>
                </div>
            </div>

           <div className="consume-data2">
                <div className = "consume-year2" onClick={() => {if ((waterTotalConsume) > 0) {navigate(`/WaterMyConsume/${propertyId}`)}}}>
                    <h2>Water</h2>
                    <h3>Year Consume</h3>
                    <div style={{width: 220}}>
                        <Doughnut data={dataWater} options={{plugins: {tooltip: {enabled: false}}}}/>
                        <p><strong>{waterTotalConsume} l</strong></p>
                    </div>
                </div>

                <div className = "consume-year2" onClick={() => {if ((electricTotalConsume) > 0) {navigate(`/ElectricMyConsume/${propertyId}`)}}}>
                    <h2>Electric</h2>
                    <h3>Year Consume</h3>
                    <div style={{width: 220}}>
                        <Doughnut data={dataElectric} options={{plugins: {tooltip: {enabled: false}}}}/>
                        <p><strong>{electricTotalConsume} kWh</strong></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default GasMyConsume;