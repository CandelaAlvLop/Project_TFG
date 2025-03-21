import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DonationContract({ type }) {
    const [contract, setContract] = useState(null);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        fetchContract();
    }, [type]);

    const fetchContract = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/UserManager/contract/${userId}/${type}`);
            setContract(response.data);
        } catch (error) {
            console.error("Error fetching contract", error);
        }
    };

    const downloadContract = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(contract, null, 2)], { type: "application/json" });
        element.href = URL.createObjectURL(file);
        element.download = `${type}_contract.json`;
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="donation-contract">
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Contract</h2>
            {contract ? (
                <div>
                    <p><strong>Start Date:</strong> {contract.startDate}</p>
                    <p><strong>Collection Frequency:</strong> {contract.frequency}</p>
                    <p><strong>Last Update:</strong> {contract.lastUpdate}</p>
                    <button onClick={downloadContract}>Download Contract</button>
                </div>
            ) : (
                <p>No contract found.</p>
            )}
        </div>
    );
}

export default DonationContract;