import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModifyConsents({ type }) {
    const [consents, setConsents] = useState([]);
    const [justification, setJustification] = useState('');
    const [showJustificationModal, setShowJustificationModal] = useState(false);
    const [selectedConsent, setSelectedConsent] = useState(null);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        fetchConsents();
    }, [type]);

    const fetchConsents = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/UserManager/consents/${userId}/${type}`);
            setConsents(response.data);
        } catch (error) {
            console.error("Error fetching consents", error);
        }
    };

    const handleConsentChange = async (consentType, checked) => {
        if (checked) {
            try {
                await axios.post('http://localhost:3001/UserManager/consents', {
                    userId,
                    type,
                    consentType
                });
                fetchConsents();
            } catch (error) {
                console.error("Error updating consent", error);
            }
        } else {
            setSelectedConsent(consentType);
            setShowJustificationModal(true);
        }
    };

    const handleJustificationSubmit = async () => {
        try {
            await axios.delete(`http://localhost:3001/UserManager/consents/${selectedConsent}`, {
                data: { justification }
            });
            setShowJustificationModal(false);
            setJustification('');
            fetchConsents();
        } catch (error) {
            console.error("Error revoking consent", error);
        }
    };

    return (
        <div className="modify-consents">
            <h2>Modify Your Consents for {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            {['Education', 'Environmental Campaigns', 'Research'].map(consentType => (
                <label key={consentType}>
                    <input 
                        type="checkbox" 
                        checked={consents.includes(consentType)} 
                        onChange={e => handleConsentChange(consentType, e.target.checked)} 
                    /> {consentType}
                </label>
            ))}

            {showJustificationModal && (
                <div className="modal">
                    <h2>Provide Justification</h2>
                    <textarea value={justification} onChange={e => setJustification(e.target.value)} placeholder="Reason for revoking consent..."></textarea>
                    <button onClick={handleJustificationSubmit}>Submit</button>
                    <button onClick={() => setShowJustificationModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default ModifyConsents;