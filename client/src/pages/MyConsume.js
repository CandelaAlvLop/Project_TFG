import { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import "../layouts/MyConsume.css";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";


function MyConsume() {

    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState("");
    const [waterTotalConsume, setWaterTotalConsume] = useState(0);
    const [gasTotalConsume, setGasTotalConsume] = useState(0);
    const [electricTotalConsume, setElectricTotalConsume] = useState(0);

    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");

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
    }, [userId]);

    //CSS for property selection and deselection
    function selectionProperty(propertyId) {
        if (selectedProperty === propertyId) return "property-select selected";
        else return "property-select";
    }

    useEffect(() => {
        if (!selectedProperty) return console.error("No Property retrieved");
        //Get total consume for the property and utility selected
        axios.get(`http://localhost:3001/DataDonationManager/consume/${selectedProperty}/Water`)
            .then((response) => {
                if (response.data.length === 0) { setWaterTotalConsume(0); return }
                setWaterTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(2)); //Last reading is the accumulated consume of the year
            })
            .catch((error) => {
                console.error("Error retrieving Water Consume data:", error);
            });

        axios.get(`http://localhost:3001/DataDonationManager/consume/${selectedProperty}/Electric`)
            .then((response) => {
                if (response.data.length === 0) { setElectricTotalConsume(0); return }
                setElectricTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(2));
            })
            .catch((error) => {
                console.error("Error retrieving Electric Consume data:", error);
            });

        axios.get(`http://localhost:3001/DataDonationManager/consume/${selectedProperty}/Gas`)
            .then((response) => {
                if (response.data.length === 0) { setGasTotalConsume(0); return }
                setGasTotalConsume(parseFloat(response.data[response.data.length - 1].meter_reading).toFixed(4));
            })
            .catch((error) => {
                console.error("Error retrieving Gas Consume data:", error);
            });
    }, [selectedProperty]);

    //Doughnut chart visualisation
    const waterConsumeMax = 450000;
    const dataWater = {
        datasets: [{
            data: [waterTotalConsume, waterConsumeMax - waterTotalConsume],
            backgroundColor: ["rgb(143, 216, 226)", "rgba(143, 216, 226, 0.12)"],
            cutout: "65%",
            borderWidth: 0,
        }]
    }

    const electricConsumeMax = 28000;
    const dataElectric = {
        datasets: [{
            data: [electricTotalConsume, electricConsumeMax - electricTotalConsume],
            backgroundColor: ["rgb(152, 240, 149)", "rgba(146, 226, 143, 0.12)"],
            cutout: "65%",
            borderWidth: 0,
        }]
    }

    const gasConsumeMax = 20;
    const dataGas = {
        datasets: [{
            data: [gasTotalConsume, gasConsumeMax - gasTotalConsume],
            backgroundColor: ["rgb(248, 121, 121)", "rgba(196, 139, 139, 0.12)"],
            cutout: "65%",
            borderWidth: 0,
        }]
    }

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <h1 className="property-title">Select a Property to view its Consume</h1>
            {/*Property selection*/}
            {properties.length > 0 && (
                <div className="property-data">
                    {properties.map((property) => (
                        <button key={property.property_id} className={selectionProperty(property.property_id)}
                            onClick={() => setSelectedProperty(property.property_id)}>
                            {property.propertyName}
                        </button>
                    ))}
                </div>
            )}
            {properties.length === 0 && (
                <div className="no-properties">
                    No properties added
                    <button className="add-property-button" onClick={() => navigate("/addproperty")}><MdAddCircle /> Add New Property</button>
                </div>
            )}

            {/*Doughnut chart for each utility total consume of the property selected*/}
            {selectedProperty && (
                <div className="consume-data-main">
                    <div className="consume-input" onClick={() => { if ((waterTotalConsume) > 0) { navigate(`/WaterMyConsume/${selectedProperty}`) } }}>
                        <h2><IoWaterOutline /> Water</h2>
                        <h3>Year Consume</h3>
                        <div>
                            <Doughnut data={dataWater} options={{ plugins: { tooltip: { enabled: false } } }} />
                            <p><strong>{waterTotalConsume} l</strong></p>
                        </div>
                    </div>

                    <div className="consume-input" onClick={() => { if ((electricTotalConsume) > 0) { navigate(`/ElectricMyConsume/${selectedProperty}`) } }}>
                        <h2><FaRegLightbulb /> Electric</h2>
                        <h3>Year Consume</h3>
                        <div>
                            <Doughnut data={dataElectric} options={{ plugins: { tooltip: { enabled: false } } }} />
                            <p><strong>{electricTotalConsume} kWh</strong></p>
                        </div>
                    </div>

                    <div className="consume-input" onClick={() => { if ((gasTotalConsume) > 0) { navigate(`/GasMyConsume/${selectedProperty}`) } }}>
                        <h2><FaFire /> Gas</h2>
                        <h3>Year Consume</h3>
                        <div>
                            <Doughnut data={dataGas} options={{ plugins: { tooltip: { enabled: false } } }} />
                            <p><strong>{gasTotalConsume} m³</strong></p>
                        </div>
                    </div>
                </div>
            )}
            <button className="datadonation-button" onClick={() => navigate("/datadonation")}><MdAddCircle /> Upload Utility Consumption Data</button>
            <Footer />
        </div>
    );
}

export default MyConsume;