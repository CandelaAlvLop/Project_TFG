import { useState, useEffect } from 'react';
import Navbar from './NavbarIn';
import Navbar2 from './Navbar2';
import Footer from "./Footer";
import '../layouts/AddProperty.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CiSaveDown2 } from "react-icons/ci";


function AddProperty() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const propertyName_Pattern = /^[A-Z][a-zA-Z0-9\s]{0,14}$/;
    const size_Pattern = /^[1-9][0-9]{0,5}$/;
    const buildingAge_Pattern = /^[0-9]{0,4}$/;
    const district_Pattern = /^[0-9]{5}$/;
    const quantity_Pattern = /^[1-9][0-9]{0,2}$/;
    const income_Pattern = /^[1-9][0-9]{0,6}$/;
    const consumption_Pattern = /^[1-9][0-9]{0,4}$/;

    const [setProperties] = useState([]);
    const [NewPropertyName, setNewPropertyName] = useState("");
    const [NewSize, setNewSize] = useState();
    const [NewBuildingAge, setNewBuildingAge] = useState();
    const [NewDistrict, setNewDistrict] = useState();
    const [NewQuantity, setNewQuantity] = useState();
    const [NewAges, setNewAges] = useState([]);
    const [NewIncome, setNewIncome] = useState();
    const [NewRemoteWorkers, setNewRemoteWorkers] = useState("");
    const [NewWorkingSchedule, setNewWorkingSchedule] = useState([]);
    const [NewDescription, setNewDescription] = useState("");
    const [NewAppliances, setNewAppliances] = useState({
        electric: {
            fridge: false, dishWasher: false, washingMachine: false, dryer: false, microwave: false, tv: false, computer: false,
            lamps: false, airConditioning: false, centralHeating: false, heatingRadiators: false, hotWater: false, stove: false, oven: false
        },
        gas: { centralHeating: false, heatingRadiators: false, hotWater: false, stove: false, oven: false },
        water: { swimmingPool: false, garden: false, bathrooms: false, halfBathrooms: false, terraceWithPlants: false }
    });
    const [NewElectricConsumption, setNewElectricConsumption] = useState();
    const [NewGasConsumption, setNewGasConsumption] = useState();
    const [NewWaterConsumption, setNewWaterConsumption] = useState();
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");

    function setUserProperty() {
        if (!userId) return console.error("No User retrieved");
        axios.get(`http://localhost:3001/PropertyManager/properties/${userId}`)
            .then((response) => {
                setProperties(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving User Property data:", error);
            });
    };

    //Add Property
    function addProperty(e) {
        e.preventDefault();
        setSubmitted(true);

        const propertyAppliances = [];

        if (NewAppliances.electric.fridge) propertyAppliances.push("Fridge");
        if (NewAppliances.electric.dishWasher) propertyAppliances.push("Dish Washer");
        if (NewAppliances.electric.washingMachine) propertyAppliances.push("Washing Machine");
        if (NewAppliances.electric.dryer) propertyAppliances.push("Dryer");
        if (NewAppliances.electric.microwave) propertyAppliances.push("Microwave");
        if (NewAppliances.electric.tv) propertyAppliances.push("TV");
        if (NewAppliances.electric.computer) propertyAppliances.push("Computer");
        if (NewAppliances.electric.lamps) propertyAppliances.push("Lamps");
        if (NewAppliances.electric.airConditioning) propertyAppliances.push("Air Conditioning");
        if (NewAppliances.electric.centralHeating) propertyAppliances.push("Electric Central Heating");
        if (NewAppliances.electric.heatingRadiators) propertyAppliances.push("Electric Heating Radiators");
        if (NewAppliances.electric.hotWater) propertyAppliances.push("Electric Hot Water");
        if (NewAppliances.electric.stove) propertyAppliances.push("Electric Stove");
        if (NewAppliances.electric.oven) propertyAppliances.push("Electric Oven");

        if (NewAppliances.gas.centralHeating) propertyAppliances.push("Gas Central Heating");
        if (NewAppliances.gas.heatingRadiators) propertyAppliances.push("Gas Heating Radiators");
        if (NewAppliances.gas.hotWater) propertyAppliances.push("Gas Hot Water");
        if (NewAppliances.gas.stove) propertyAppliances.push("Gas Stove");
        if (NewAppliances.gas.oven) propertyAppliances.push("Gas Oven");

        if (NewAppliances.water.swimmingPool) propertyAppliances.push("Swimming Pool");
        if (NewAppliances.water.garden) propertyAppliances.push("Garden");
        if (NewAppliances.water.bathrooms) propertyAppliances.push("Bathrooms");
        if (NewAppliances.water.halfBathrooms) propertyAppliances.push("Half Bathrooms");
        if (NewAppliances.water.terraceWithPlants) propertyAppliances.push("Terrace with Plants");

        const propertyAppliances_string = propertyAppliances.join(',');

        axios.post('http://localhost:3001/PropertyManager/properties', {
            userId,
            propertyName: NewPropertyName,
            size: NewSize,
            buildingAge: NewBuildingAge,
            district: NewDistrict,
            quantity: NewQuantity,
            ages: NewAges.join(','),
            income: NewIncome,
            remoteWorkers: NewRemoteWorkers,
            workingSchedules: NewWorkingSchedule.join(','),
            description: NewDescription,
            appliances: propertyAppliances_string,
            electricConsumption: NewElectricConsumption,
            gasConsumption: NewGasConsumption,
            waterConsumption: NewWaterConsumption
        }).then((response) => {
            setUserProperty();
            console.log("Property added successfully");
            navigate('/personaldata');
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error adding Property");
            }
        });
    };

    function ageUpdate(value) {
        if (NewAges.includes(value)) { setNewAges(NewAges.filter(age => age !== value)); }
        else { setNewAges([...NewAges, value]); }
    }

    function workingScheduleUpdate(value) {
        if (NewWorkingSchedule.includes(value)) { setNewWorkingSchedule(NewWorkingSchedule.filter(age => age !== value)); }
        else { setNewWorkingSchedule([...NewWorkingSchedule, value]); }
    }

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="add-property">
                <h1>Property Information</h1>
                <form onSubmit={addProperty}>

                    <h2>Place</h2>
                    <div className="section-property">
                        <label htmlFor="propertyName">Name of the Property</label>
                        <input type="text" id="propertyName" name="propertyName" value={NewPropertyName} placeholder="Name of the property (e.g. My Home, Beach House, Madrid Flat)" required
                            //Property name must start with a capital letter and be followed by small letters, max 15 letters
                            onInvalid={(e) => e.target.setCustomValidity("Property name must start with a capital letter and be followed by small letters, max 15 letters")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!propertyName_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Property name must start with a capital letter and be followed by small letters, max 15 letters");
                                }
                            }}
                            onChange={(e) => setNewPropertyName(e.target.value)}
                        />
                        <label htmlFor="size">Size (m²)</label>
                        <input type="number" id="size" name="size" value={NewSize} placeholder="Square meters of the property" required
                            //Size must not start with a 0, no decimals, and up to 6 digits
                            onInvalid={(e) => e.target.setCustomValidity("Size must not start by zero, cannot contain decimals and it must be up to 6 digits")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!size_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Size must not start by zero, cannot contain decimals and it must be up to 6 digits");
                                }
                            }}
                            onChange={(e) => setNewSize(e.target.value)}
                        />
                        <label htmlFor="buildingAge">Building age (years)</label>
                        <input type="number" id="buildingAge" name="buildingAge" value={NewBuildingAge} placeholder="Age of the building in years" required
                            //Age of the Building no decimals, and up to 4 digits
                            onInvalid={(e) => e.target.setCustomValidity("The age cannot contain decimals and it must be up to 4 digits")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!buildingAge_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("The age cannot contain decimals and it must be up to 4 digits");
                                }
                            }}
                            onChange={(e) => setNewBuildingAge(e.target.value)}
                        />
                        <label htmlFor="district">District (Postal Code)</label>
                        <input type="text" id="district" name="district" value={NewDistrict} placeholder="District code" required
                            //District (Postal code) follows Spanish regulations, that is a 5 digit number, where the first two digits are the province and the last three are specific to the district
                            onInvalid={(e) => e.target.setCustomValidity("District (Postal code) is 5 digits")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!district_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("District (Postal code) is 5 digits");
                                }
                            }}
                            onChange={(e) => setNewDistrict(e.target.value)}
                        />
                    </div>

                    <h2>People</h2>
                    <div className="section-property">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" name="quantity" value={NewQuantity} placeholder="Number of people living in the property" required
                            //Quantity must not start with a 0, no decimals, and up to 3 digits
                            onInvalid={(e) => e.target.setCustomValidity("Quantity must not start by zero, cannot contain decimals and it must be up to 3 digits")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!quantity_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Quantity must not start by zero, cannot contain decimals and it must be up to 3 digits");
                                }
                            }}
                            onChange={(e) => setNewQuantity(e.target.value)}
                        />
                        <label htmlFor="ages">Ages</label>
                        <div className="checkboxes">
                            <label><input type="checkbox" value="0-20" onChange={() => ageUpdate("0-20")} />0-20</label>
                            <label><input type="checkbox" value="21-35" onChange={() => ageUpdate("21-25")} /> 21-35</label>
                            <label><input type="checkbox" value="36-50" onChange={() => ageUpdate("36-50")} /> 36-50</label>
                            <label><input type="checkbox" value="50-65" onChange={() => ageUpdate("50-65")} /> 50-65</label>
                            <label><input type="checkbox" value="66-80" onChange={() => ageUpdate("66-80")} /> 66-80</label>
                            <label><input type="checkbox" value="80+" onChange={() => ageUpdate("80+")} /> 80+</label>
                            {submitted && !NewAges.length && <div className="error-property"> "Please select at least one Age Range"</div>}
                        </div>

                        <label htmlFor="income">Income</label>
                        <input type="number" id="income" name="income" value={NewIncome} placeholder="Approximate monthly income of all the household (€)" required
                            //Income must not start with a 0, no decimals, and up to 7 digits
                            onInvalid={(e) => e.target.setCustomValidity("Income must not start by zero, cannot contain decimals and it must be up to 7 digits")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!income_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Income must not start by zero, cannot contain decimals and it must be up to 7 digits");
                                }
                            }}
                            onChange={(e) => setNewIncome(e.target.value)}
                        />
                        <label htmlFor="remoteWorkers">Remote Workers</label>
                        <select id="remoteWorkers" name="remoteWorkers" value={NewRemoteWorkers} required
                            onInvalid={(e) => e.target.setCustomValidity("Select if there are or not Remote Workers")}
                            onInput={(e) => e.target.setCustomValidity("")}
                            onChange={(e) => setNewRemoteWorkers(e.target.value)}>
                            <option value="">Select if there are Remote Workers</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label htmlFor="workingSchedule">Working Schedules</label>
                        <div className="checkboxes" required>
                            <label><input type="checkbox" value="Morning" onChange={(e) => workingScheduleUpdate("Morning")} /> Morning</label>
                            <label><input type="checkbox" value="Afternoon" onChange={(e) => workingScheduleUpdate("Afternoon")} /> Afternoon</label>
                            <label><input type="checkbox" value="Full Day" onChange={(e) => workingScheduleUpdate("Full Day")} /> Full Day</label>
                            <label><input type="checkbox" value="Night" onChange={(e) => workingScheduleUpdate("Night")} /> Night</label>
                            <label><input type="checkbox" value="No Work" onChange={(e) => workingScheduleUpdate("No Work")} /> No Work</label>
                            {submitted && !NewWorkingSchedule.length && <div className="error-property"> "Please select at least one Working Schedule"</div>}
                        </div>
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" value={NewDescription} placeholder="Small description (e.g. Three students living temporarily)"
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                    </div>

                    <h2>Appliances</h2>
                    <div className="appliances">
                        <div className="appliance-type">Electric</div>
                        <div className="appliance-checkboxes">
                            <label><input type="checkbox" checked={NewAppliances.electric.fridge} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, fridge: !NewAppliances.electric.fridge } })} /> Fridge</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.dishWasher} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, dishWasher: !NewAppliances.electric.dishWasher } })} /> Dish Washer</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.washingMachine} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, washingMachine: !NewAppliances.electric.washingMachine } })} /> Washing Machine</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.dryer} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, dryer: !NewAppliances.electric.dryer } })} /> Dryer</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.microwave} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, microwave: !NewAppliances.electric.microwave } })} /> Microwave</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.tv} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, tv: !NewAppliances.electric.tv } })} /> TV</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.computer} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, computer: !NewAppliances.electric.computer } })} /> Computer</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.lamps} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, lamps: !NewAppliances.electric.lamps } })} /> Lamps</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.airConditioning} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, airConditioning: !NewAppliances.electric.airConditioning } })} /> Air Conditioning</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.centralHeating} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, centralHeating: !NewAppliances.electric.centralHeating } })} /> Central Heating</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.heatingRadiators} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, heatingRadiators: !NewAppliances.electric.heatingRadiators } })} /> Heating Radiators</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.hotWater} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, hotWater: !NewAppliances.electric.hotWater } })} /> Hot Water</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.stove} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, stove: !NewAppliances.electric.stove } })} /> Stove</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.oven} onChange={() => setNewAppliances({ ...NewAppliances, electric: { ...NewAppliances.electric, oven: !NewAppliances.electric.oven } })} /> Oven</label>
                        </div>
                    </div>

                    <div className="appliances">
                        <div className="appliance-type">Gas</div>
                        <div className="appliance-checkboxes">
                            <label><input type="checkbox" checked={NewAppliances.gas.centralHeating} onChange={() => setNewAppliances({ ...NewAppliances, gas: { ...NewAppliances.gas, centralHeating: !NewAppliances.gas.centralHeating } })} /> Central Heating</label>
                            <label><input type="checkbox" checked={NewAppliances.gas.heatingRadiators} onChange={() => setNewAppliances({ ...NewAppliances, gas: { ...NewAppliances.gas, heatingRadiators: !NewAppliances.gas.heatingRadiators } })} /> Heating Radiators</label>
                            <label><input type="checkbox" checked={NewAppliances.gas.hotWater} onChange={() => setNewAppliances({ ...NewAppliances, gas: { ...NewAppliances.gas, hotWater: !NewAppliances.gas.hotWater } })} /> Hot Water</label>
                            <label><input type="checkbox" checked={NewAppliances.gas.stove} onChange={() => setNewAppliances({ ...NewAppliances, gas: { ...NewAppliances.gas, stove: !NewAppliances.gas.stove } })} /> Stove</label>
                            <label><input type="checkbox" checked={NewAppliances.gas.oven} onChange={() => setNewAppliances({ ...NewAppliances, gas: { ...NewAppliances.gas, oven: !NewAppliances.gas.oven } })} /> Oven</label>
                        </div>
                    </div>

                    <div className="appliances">
                        <div className="appliance-type">Water</div>
                        <div className="appliance-checkboxes">
                            <label><input type="checkbox" checked={NewAppliances.water.swimmingPool} onChange={() => setNewAppliances({ ...NewAppliances, water: { ...NewAppliances.water, swimmingPool: !NewAppliances.water.swimmingPool } })} /> Swimming Pool</label>
                            <label><input type="checkbox" checked={NewAppliances.water.garden} onChange={() => setNewAppliances({ ...NewAppliances, water: { ...NewAppliances.water, garden: !NewAppliances.water.garden } })} /> Garden</label>
                            <label><input type="checkbox" checked={NewAppliances.water.bathrooms} onChange={() => setNewAppliances({ ...NewAppliances, water: { ...NewAppliances.water, bathrooms: !NewAppliances.water.bathrooms } })} /> Bathrooms</label>
                            <label><input type="checkbox" checked={NewAppliances.water.halfBathrooms} onChange={() => setNewAppliances({ ...NewAppliances, water: { ...NewAppliances.water, halfBathrooms: !NewAppliances.water.halfBathrooms } })} /> Half Bathrooms (Only toilet)</label>
                            <label><input type="checkbox" checked={NewAppliances.water.terraceWithPlants} onChange={() => setNewAppliances({ ...NewAppliances, water: { ...NewAppliances.water, terraceWithPlants: !NewAppliances.water.terraceWithPlants } })} /> Terrace with Plants</label>
                        </div>
                    </div>

                    <h2>Energy Consumption</h2>
                    <div className="section-property">
                        <label htmlFor="electricConsumption">Electric Consumption (kWh)</label>
                        <input type="number" id="electricConsumption" name="electricConsumption" value={NewElectricConsumption} placeholder="Estimation of monthly electric consumption" required
                            //Electric Consumption must not start with a 0, no decimals, and up to 5 digits
                            onInvalid={(e) => e.target.setCustomValidity("Electrical Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!consumption_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Electrical Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits");
                                }
                            }}
                            onChange={(e) => setNewElectricConsumption(e.target.value)}
                        />
                        <label htmlFor="gasConsumption">Gas Consumption (m³)</label>
                        <input type="number" id="gasConsumption" name="gascConsumption" value={NewGasConsumption} placeholder="Estimation of monthly gas consumption" required
                            //Gas Consumption must not start with a 0, no decimals, and up to 5 digits
                            onInvalid={(e) => e.target.setCustomValidity("Gas Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!consumption_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Gas Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits");
                                }
                            }}
                            onChange={(e) => setNewGasConsumption(e.target.value)}
                        />
                        <label htmlFor="waterConsumption">Water Consumption (l)</label>
                        <input type="number" id="waterConsumption" name="waterConsumption" value={NewWaterConsumption} placeholder="Estimation of monthly water consumption" required
                            //Water Consumption must not start with a 0, no decimals, and up to 5 digits
                            onInvalid={(e) => e.target.setCustomValidity("Water Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!consumption_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Water Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits");
                                }
                            }}
                            onChange={(e) => setNewWaterConsumption(e.target.value)}
                        />
                    </div>

                    <button className="add-property-button" type="submit"><CiSaveDown2 /> Save Property</button>
                    {error && <div className="error-property-missing">{error}</div>}
                </form>
            </div>
            <Footer />
        </div>
    );
}
export default AddProperty;
