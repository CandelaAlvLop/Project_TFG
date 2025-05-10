import { useEffect, useState } from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";
import "../layouts/WaterMyConsume.css";
import axios from 'axios';
import {Doughnut, Bar} from "react-chartjs-2";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {IoMdArrowRoundBack} from "react-icons/io";
import {IoWaterOutline} from "react-icons/io5";
import {FaFire} from "react-icons/fa6";
import {FaRegLightbulb} from "react-icons/fa";

import SmartIrrigation from "../images/SmartIrrigation.png";
import EfficientUseOfAppliances from "../images/EfficientUseOfAppliances.png";
import WaterReuse from "../images/WaterReuse.png";
import InstallationofFlowReducers from "../images/InstallationofFlowReducers.png";


function WaterMyConsume() {

    const [waterTotalConsume, setWaterTotalConsume] = useState(0);
    const [electricTotalConsume, setElectricTotalConsume] = useState(0);
    const [gasTotalConsume, setGasTotalConsume] = useState(0);
    const [waterMonthConsume, setWaterMonthConsume] = useState([]);
    const [waterDayConsume, setWaterDayConsume] = useState([]);
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
      
        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Water`)
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
                setWaterMonthConsume(monthConsumes);
            })
    }, [propertyId]);
      
    //Day Graphic Representation
    useEffect(() => {
        axios.get(`http://localhost:3001/DataDonationManager/consume/${propertyId}/Water`)
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
                setWaterDayConsume(months);
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

    const barMonthWater = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Water Month Consume (l)",
            data: waterMonthConsume,
            backgroundColor: "rgb(143, 216, 226)"
        }]
    }

    const waterDayConsume_ = waterDayConsume[selectMonth] || [];
    const barDayWater = {
        labels: waterDayConsume_.map((value, index) => (index + 1).toString()),
        datasets: [{
            label: "Water Daily Consume (l)",
            data: waterDayConsume_,
            backgroundColor: "rgb(143, 216, 226)"
        }]
    }

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <button type="button" className="back-button" onClick={() => navigate('/MyConsume')}><IoMdArrowRoundBack /> Back</button>
            <h1 className="consume-title">My Water Consume</h1>
            <div className="consume-data">
                <div className = "consume-year">
                    <h2><IoWaterOutline /> Water</h2>
                    <h3>Year Consume</h3>
                    <div style={{width: 300}}>
                        <Doughnut data={dataWater} options={{plugins: {tooltip: {enabled: false}}}}/>
                        <p><strong>{waterTotalConsume} l</strong></p>
                    </div>
                </div>
                <div className="consume-month"> 
                    <h3>Month Consume</h3>
                    <Bar data={barMonthWater}/>
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
                    <Bar data={barDayWater}/>
                </div>
            </div>
            
            <h2 className="advices-title">How can I optimize my consume?</h2>
            <div className="advice-group">
                <div className="advice">
                    <img src={SmartIrrigation} alt="Smart Irrigation"/>
                    <div className="advice-text-blue">
                        <h4>Smart Irrigation</h4>
                        <p>Water during the early morning hours or late in the evening to minimize evaporation, or use drip irrigation systems that apply water directly to the base of the plants where it is most needed.</p>
                    </div>
                </div>
                <div className="advice">
                    <img src={EfficientUseOfAppliances} alt="Efficient Use of Appliances"/>
                    <div className="advice-text-blue">
                        <h4>Efficient Use of Appliances</h4>
                        <p>Remember to use washing machines and dishwashers only when they are fully loaded. This reduces the number of cycles and saves energy.</p>
                    </div>
                </div>
                <div className="advice">
                    <img src={WaterReuse} alt="Water Reuse"/>
                    <div className="advice-text-blue">
                        <h4>Water Reuse</h4>
                        <p>For example, rinse water from fruits and vegetables can be used to water indoor plants or the garden.</p>
                    </div>
                </div>
                <div className="advice">
                    <img src={InstallationofFlowReducers} alt="Installation of Flow Reducers"/>
                    <div className="advice-text-blue">
                        <h4>Installation of Flow Reducers</h4>
                        <p>Install low-flow devices on faucets and showers. These reducers can significantly cut water usage without affecting to the user experience quality.</p>
                    </div>
                </div>
            </div>

            <div className="consume-data2">
                <div className="consume-year2" onClick={() => {if ((electricTotalConsume) > 0) {navigate(`/ElectricMyConsume/${propertyId}`)}}}>
                    <h2><FaRegLightbulb /> Electric</h2>
                    <h3>Year Consume</h3>
                    <div style={{width: 220}}>
                        <Doughnut data={dataElectric} options={{plugins: {tooltip: {enabled: false}}}}/>
                        <p><strong>{electricTotalConsume} kWh</strong></p>
                    </div>
                </div>
                <div className="consume-year2" onClick={() => {if ((gasTotalConsume) > 0) {navigate(`/GasMyConsume/${propertyId}`)}}}>
                    <h2><FaFire />  Gas</h2>
                    <h3>Year Consume</h3>
                    <div style={{width: 220}}>
                        <Doughnut data={dataGas} options={{plugins: {tooltip: {enabled: false}}}}/>
                        <p><strong>{gasTotalConsume} m³</strong></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default WaterMyConsume;