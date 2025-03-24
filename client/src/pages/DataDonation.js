import React, { useState, useEffect } from 'react';
import Navbar from './NavbarIn';
import Navbar2 from './Navbar2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../layouts/DataDonation.css';

function DataDonation() {
  const [dataType, setDataType] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [donationInfo, setDonationInfo] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/UserManager/properties/${userId}`)
      .then(res => setProperties(res.data))
      .catch(err => console.error('Error fetching properties', err));
  }, []);

  useEffect(() => {
    if (dataType && selectedProperty) {
      axios.get(`http://localhost:3001/UserManager/donation/${userId}/${selectedProperty}/${dataType}`)
        .then(res => setDonationInfo(res.data))
        .catch(() => setDonationInfo(null));
    }
  }, [dataType, selectedProperty]);

  function handleFileUpload() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);
    formData.append("propertyId", selectedProperty);
    formData.append("dataType", dataType);

    axios.post("http://localhost:3001/UserManager/donation/upload", formData)
      .then(() => {
        alert("Donation uploaded");
        setShowUpload(false);
        setSelectedFile(null);

        return axios.get(`http://localhost:3001/UserManager/donation/${userId}/${selectedProperty}/${dataType}`);
      })
      .then(res => setDonationInfo(res.data));
  }

  function goToConsentPage() {
    localStorage.setItem('data_type', dataType);
    localStorage.setItem('property_id', selectedProperty);
    navigate('/modifyconsent');
  }

  return (
    <div>
      <Navbar />
      <Navbar2 />
      <div className="data-donation">
        <h2>Data Donation</h2>

        <div className="data-type-toggle">
          {['Water', 'Electric', 'Gas'].map(type => (
            <button
              key={type}
              className={dataType === type ? 'selected' : ''}
              onClick={() => setDataType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {dataType && (
          <div className="property-list">
            <h4>Select Property</h4>
            {properties.map(prop => (
              <div
                key={prop.property_id}
                className={`property-card ${selectedProperty === prop.property_id ? 'selected' : ''}`}
                onClick={() => setSelectedProperty(prop.property_id)}
              >
                {prop.propertyName}
              </div>
            ))}
          </div>
        )}

        {dataType && selectedProperty && (
          <div className="donation-info-box">
            {donationInfo ? (
              <>
                <h3>{dataType}</h3>
                <p><strong>Contract:</strong> {donationInfo.contract}</p>
                <p><strong>Data Provided:</strong> {donationInfo.data}</p>
                <p><strong>Security Policy:</strong> {donationInfo.security}</p>
                <button onClick={goToConsentPage}>Modify</button>
              </>
            ) : showUpload ? (
              <div className="upload-box">
                <p>Upload your Excel (.xlsx) file of consumption data:</p>
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <button onClick={handleFileUpload}>Submit</button>
                <button onClick={() => setShowUpload(false)}>Cancel</button>
              </div>
            ) : (
              <div className="no-donation">
                <p>No donation yet for this property and data type.</p>
                <button className="add" onClick={() => setShowUpload(true)}>➕ Add</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DataDonation;
