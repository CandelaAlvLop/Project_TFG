import React, { useState } from 'react';
import axios from 'axios';

function ProvideData({ type }) {
    const [consumption, setConsumption] = useState('');
    const userId = localStorage.getItem("user_id");

    const submitData = async () => {
        if (!consumption) return alert("Please enter valid consumption data.");
        try {
            await axios.post('http://localhost:3001/UserManager/consumption', {
                userId,
                type,
                consumption
            });
            alert("Data submitted successfully!");
            setConsumption('');
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="provide-data">
            <h2>Provide {type.charAt(0).toUpperCase() + type.slice(1)} Consumption Data</h2>
            <input 
                type="number" 
                placeholder={`Enter ${type} consumption`} 
                value={consumption} 
                onChange={e => setConsumption(e.target.value)} 
            />
            <button onClick={submitData}>Submit</button>
        </div>
    );
}

export default ProvideData;
