import React, { useState, useEffect } from 'react';
import Navbar from './NavbarIn';
import Navbar2 from './Navbar2';
import Footer from "./Footer";
import '../layouts/AddProperty.css';
import axios from 'axios';

function PersonalData() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const numericalPattern = /^[0-9]*$/;
    
    const [properties, setProperties] = useState([]);
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
        electric: {fridge: false, dishWasher: false, washingMachine: false, dryer: false, microwave: false, tv: false, computer: false, 
                    lamps: false, airConditioning: false, centralHeating: false, heatingRadiators: false, hotWater: false, stove: false, oven: false},
        gas: {centralHeating: false, heatingRadiators: false, hotWater: false, stove: false, oven: false },
        water: {swimmingPool: false, garden: false, bathrooms: false, halfBathrooms: false, terraceWithPlants: false}
    });
    const [NewElectricConsumption, setNewElectricConsumption] = useState();
    const [NewGasConsumption, setNewGasConsumption] = useState();
    const [NewWaterConsumption, setNewWaterConsumption] = useState();
    const [error, setError] = useState("");

    const userId = localStorage.getItem("user_id");

    function setUserProperty () {
        if (!userId) return console.error("No User retrieved");
        axios.get(`http://localhost:3001/UserManager/properties/${userId}`)
            .then((response) => {
                setProperties(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving User Property data:", error);
            });
    };

    //Add Property
    function addProperty (e) {
        e.preventDefault();

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
        if (NewAppliances.electric.centralHeating) propertyAppliances.push("Central Heating");
        if (NewAppliances.electric.heatingRadiators) propertyAppliances.push("Heating Radiators");
        if (NewAppliances.electric.hotWater) propertyAppliances.push("Hot Water");
        if (NewAppliances.electric.stove) propertyAppliances.push("Stove");
        if (NewAppliances.electric.oven) propertyAppliances.push("Oven");

        if (NewAppliances.gas.centralHeating) propertyAppliances.push("Central Heating");
        if (NewAppliances.gas.heatingRadiators) propertyAppliances.push("Heating Radiators");
        if (NewAppliances.gas.hotWater) propertyAppliances.push("Hot Water");
        if (NewAppliances.gas.stove) propertyAppliances.push("Stove");
        if (NewAppliances.gas.oven) propertyAppliances.push("Oven");

        if (NewAppliances.water.swimmingPool) propertyAppliances.push("Swimming Pool");
        if (NewAppliances.water.garden) propertyAppliances.push("Garden");
        if (NewAppliances.water.bathrooms) propertyAppliances.push("Bathrooms");
        if (NewAppliances.water.halfBathrooms) propertyAppliances.push("Half Bathrooms");
        if (NewAppliances.water.terraceWithPlants) propertyAppliances.push("Terrace with Plants");

        const propertyAppliances_string = propertyAppliances.join(',');

        axios.post('http://localhost:3001/UserManager/properties', {
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
        }).then(() => {
            setUserProperty();
            console.log("Property added successfully");
        }).catch((error) => {
            setError("Unexpected error adding Property");
            console.error("Error adding Property:", error);
        });
    };

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="add-property">
                <h1>Property Information</h1>
                <form onSubmit={addProperty}>
                    {/* Place */}
                    <h2>Place</h2>
                    <div className="container">
                    <label htmlFor="propertyName">Name of the Property</label>
                        <input type="text" id="propertyName" name="propertyName" value={NewPropertyName} placeholder="Name of the property"
                            onChange={(e) => setNewPropertyName(e.target.value)}
                        />
                        <label htmlFor="size">Size (m²)</label>
                        <input type="number" id="size" name="size" value={NewSize} placeholder="Square meters of the property"
                            /*onInvalid={(e) => e.target.setCustomValidity("Must insert a numerical value")}
                            onInput={(e) => {
                                 e.target.setCustomValidity("");
                                if (!numericalPattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Must insert a numerical value");
                                }
                            }}*/
                            onChange={(e) => setNewSize(e.target.value)}
                        />
                        <label htmlFor="buildingAge">Building age (years)</label>
                        <input type="number" id="buildingAge" name="buildingAge" value={NewBuildingAge} placeholder="Age of the building in years"
                            onChange={(e) => setNewBuildingAge(e.target.value)}
                        />
                        <label htmlFor="district">District</label>
                        <input type="number" id="district" name="district" value={NewDistrict} placeholder="District code"
                            onChange={(e) => setNewDistrict(e.target.value)}
                        />
                    </div>

                    {/* People */}
                    <h2>People</h2>
                    <div className="container">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" name="quantity" value={NewQuantity} placeholder="Number of people living in the property"
                            onChange={(e) => setNewQuantity(e.target.value)}
                        />
                        <label htmlFor="ages">Ages</label>
                        <div className="checkbox-group">
                            <label><input type="checkbox" value="0-20" onChange={(e) => setNewAges([...NewAges, e.target.value])}/> 0-20</label>
                            <label><input type="checkbox" value="21-35" onChange={(e) => setNewAges([...NewAges, e.target.value])}/> 21-35</label>
                            <label><input type="checkbox" value="36-50" onChange={(e) => setNewAges([...NewAges, e.target.value])}/> 36-50</label>
                            <label><input type="checkbox" value="50-65" onChange={(e) => setNewAges([...NewAges, e.target.value])}/> 50-65</label>
                            <label><input type="checkbox" value="66-80" onChange={(e) => setNewAges([...NewAges, e.target.value])}/> 66-80</label>
                            <label><input type="checkbox" value="80+" onChange={(e) => setNewAges([...NewAges, e.target.value])}/> 80+</label>
                        </div>
                        <label htmlFor="income">Income</label>
                        <input type="number" id="income" name="income" value={NewIncome} placeholder="Approximate total income"
                            onChange={(e) => setNewIncome(e.target.value)}
                        />
                        <label htmlFor="remoteWorkers">Remote Workers</label>
                        <select id="remoteWorkers" name="remoteWorkers" value={NewRemoteWorkers}
                            onChange={(e) => setNewRemoteWorkers(e.target.value)}>
                            <option value="">Select if there are Remote Workers</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>   
                        </select>
                        <label htmlFor="workingSchedule">Working Schedules</label>
                        <div className="checkbox-group">
                            <label><input type="checkbox" value="morning" onChange={(e) => setNewWorkingSchedule([...NewWorkingSchedule, e.target.value])}/> Morning</label>
                            <label><input type="checkbox" value="afternoon" onChange={(e) => setNewWorkingSchedule([...NewWorkingSchedule, e.target.value])}/> Afternoon</label>
                            <label><input type="checkbox" value="fullDay" onChange={(e) => setNewWorkingSchedule([...NewWorkingSchedule, e.target.value])}/> Full Day</label>
                            <label><input type="checkbox" value="night" onChange={(e) => setNewWorkingSchedule([...NewWorkingSchedule, e.target.value])}/> Night</label>
                            <label><input type="checkbox" value="noWork" onChange={(e) => setNewWorkingSchedule([...NewWorkingSchedule, e.target.value])}/> No Work</label>
                        </div>
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" value={NewDescription} placeholder="Extra information about the people living in the property"
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                    </div>

                    {/* Appliances */}
                    <h2>Appliances</h2>

                    <div className="appliance-category">
                        <div className="category-header">Electric</div>
                        <div className="appliance-grid">
                            <label><input type="checkbox" checked={NewAppliances.electric.fridge} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, fridge: !NewAppliances.electric.fridge}})}/> Fridge</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.dishWasher} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, dishWasher: !NewAppliances.electric.dishWasher}})}/> Dish Washer</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.washingMachine} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, washingMachine: !NewAppliances.electric.washingMachine}})}/> Washing Machine</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.dryer} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, dryer: !NewAppliances.electric.dryer}})}/> Dryer</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.microwave} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, microwave: !NewAppliances.electric.microwave}})}/> Microwave</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.tv} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, tv: !NewAppliances.electric.tv}})} /> TV</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.computer} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, computer: !NewAppliances.electric.computer}})}/> Computer</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.lamps} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, lamps: !NewAppliances.electric.lamps}})}/> Lamps</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.airConditioning} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, airConditioning: !NewAppliances.electric.airConditioning}})}/> Air Conditioning</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.centralHeating} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, centralHeating: !NewAppliances.electric.centralHeating}})}/> Central Heating</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.heatingRadiators} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, heatingRadiators: !NewAppliances.electric.heatingRadiators}})}/> Heating Radiators</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.hotWater} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, hotWater: !NewAppliances.electric.hotWater}})}/> Hot Water</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.stove} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, stove: !NewAppliances.electric.stove}})}/> Stove</label>
                            <label><input type="checkbox" checked={NewAppliances.electric.oven} onChange={() => setNewAppliances({...NewAppliances, electric: {...NewAppliances.electric, oven: !NewAppliances.electric.oven}})}/> Oven</label>
                        </div>
                    </div>

                    <div className="appliance-category">
                        <div className="category-header">Gas</div>
                        <div className="appliance-grid">
                            <label><input type="checkbox" checked={NewAppliances.gas.centralHeating} onChange={() => setNewAppliances({...NewAppliances, gas: {...NewAppliances.gas, centralHeating: !NewAppliances.gas.centralHeating}})}/> Central Heating</label>
                            <label><input type="checkbox" checked={NewAppliances.gas.heatingRadiators} onChange={() => setNewAppliances({...NewAppliances, gas: {...NewAppliances.gas, heatingRadiators: !NewAppliances.gas.heatingRadiators}})}/> Heating Radiators</label>
                            <label><input type="checkbox" checked={NewAppliances.gas.hotWater} onChange={() => setNewAppliances({...NewAppliances, gas: {...NewAppliances.gas, hotWater: !NewAppliances.gas.hotWater}})}/> Hot Water</label>
                            <label><input type="checkbox" checked={NewAppliances.gas.stove} onChange={() => setNewAppliances({...NewAppliances, gas: {...NewAppliances.gas, stove: !NewAppliances.gas.stove}})}/> Stove</label>
                            <label><input type="checkbox" checked={NewAppliances.gas.oven} onChange={() => setNewAppliances({...NewAppliances, gas: {...NewAppliances.gas, oven: !NewAppliances.gas.oven}})}/> Oven</label>
                        </div>
                    </div>

                    <div className="appliance-category">
                        <div className="category-header">Water</div>
                        <div className="appliance-grid">
                            <label><input type="checkbox" checked={NewAppliances.water.swimmingPool} onChange={() => setNewAppliances({...NewAppliances, water: {...NewAppliances.water, swimmingPool: !NewAppliances.water.swimmingPool}})}/> Swimming Pool</label>
                            <label><input type="checkbox" checked={NewAppliances.water.garden} onChange={() => setNewAppliances({...NewAppliances, water: {...NewAppliances.water, garden: !NewAppliances.water.garden}})}/> Garden</label>
                            <label><input type="checkbox" checked={NewAppliances.water.bathrooms} onChange={() => setNewAppliances({...NewAppliances, water: {...NewAppliances.water, bathrooms: !NewAppliances.water.bathrooms}})}/> Bathrooms</label>
                            <label><input type="checkbox" checked={NewAppliances.water.halfBathrooms} onChange={() => setNewAppliances({...NewAppliances, water: {...NewAppliances.water, halfBathrooms: !NewAppliances.water.halfBathrooms}})}/> Half Bathrooms</label>
                            <label><input type="checkbox" checked={NewAppliances.water.terraceWithPlants} onChange={() => setNewAppliances({...NewAppliances, water: {...NewAppliances.water, terraceWithPlants: !NewAppliances.water.terraceWithPlants}})}/> Terrace with Plants</label>
                        </div>
                    </div>

                    {/* Energy Consumption */}
                    <h2>Energy Consumption</h2>
                    <div className="container">
                        <label htmlFor="electricConsumption">Electric Consumption</label>
                        <input type="number" id="electricConsumption" name="electricConsumption" value={NewElectricConsumption} placeholder="Estimation of electric consumption"
                            onChange={(e) => setNewElectricConsumption(e.target.value)}
                        />
                        <label htmlFor="gasConsumption">Gas Consumption</label>
                        <input type="number" id="gasConsumption" name="gascConsumption" value={NewGasConsumption} placeholder="Estimation of gas consumption"
                            onChange={(e) => setNewGasConsumption(e.target.value)}
                        />
                        <label htmlFor="waterConsumption">Water Consumption</label>
                        <input type="number" id="waterConsumption" name="waterConsumption" value={NewWaterConsumption} placeholder="Estimation of water consumption"
                            onChange={(e) => setNewWaterConsumption(e.target.value)}
                        />
                    </div>
                
                    <div className="error-addproperty">{error}</div>
                    <button className="button-addproperty" type="submit">Add Property</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}
export default PersonalData;
