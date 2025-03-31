import React, {useEffect, useState} from 'react';
import Navbar from './NavbarIn';
import Navbar2 from "./Navbar2";
import Footer from './Footer';
import "../layouts/DataDonation.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DataDonation() {
  useEffect(() => {
      window.scrollTo(0, 0); 
      setUserProperties();
  }, []);

  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedConsume, setSelectedConsume] = useState("");

  const [donationContract, setDonationContract] = useState(null);
  const [upload, setUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const userId = localStorage.getItem('user_id');

  function setUserProperties () {
    if (!userId) return console.error("No User retrieved");
    axios.get(`http://localhost:3001/UserManager/properties/${userId}`)
        .then((response) => {
            setProperties(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving User Property data:", error);
        });
  };

  function selectionProperty (propertyId) {
    if (selectedProperty === propertyId) return "property-card selected";
    else return "property-card";
  }

  function selectionConsume (consume) {
    if (selectedConsume === consume) return "property-card selected";
    else return "property-card";
  }

  function UploadFile() {
    if (!uploadedFile || !selectedProperty || !selectedConsume) {
      console.error("Missing file, property, or consume type.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("userId", userId);
    formData.append("property_id", selectedProperty);
    formData.append("consume_type", selectedConsume);
  
    axios.post("http://localhost:3001/UserManager/uploadFile", formData)
      .then((res) => {
        console.log("Upload success", res.data);
        setUpload(false);
        setDonationContract(res.data.contract);
      })
      .catch((err) => {
        console.error("Upload error", err);
      });
  }
  

  function donationManagement() {
    if (!selectedProperty) return null;
    if (!selectedConsume) return null;
  
    if (donationContract) {
      return (
        <div className="donation-info-box">
          <h3>{selectedConsume}</h3>
          {/*<p><strong>Contract:</strong> {donationContract.contract}</p>
          <p><strong>Data Provided:</strong> {donationContract.data}</p>
          <p><strong>Security Policy:</strong> {donationContract.security}</p>*/}
          <button onClick={modifyConsume}>Modify</button>
          {/*<button onClick={downloadFile}>Download</button>*/}
        </div>
      );
    } 
  
    if (upload) {
      return (
        <div className="upload-button">
          <p>Upload your file of consumption data:</p>
          <input
            type="file"
            onChange={(e) => setUploadedFile(e.target.files[0])}
          />
          <button onClick={UploadFile}>Submit</button>
          <button onClick={() => setUpload(false)}>Cancel</button>
        </div>
      );
    }
  
    return (
      <div className="no-donation">
        <p>No donation yet for this property and data type.</p>
        <button className="add" onClick={() => setUpload(true)}> Add</button>
      </div>
    );
  }
  
  function modifyConsume() {
    localStorage.setItem("consume", selectedConsume);
    localStorage.setItem("property_id", selectedProperty);
    navigate("/modifyconsent");
  } 

  return (
    <div>
      <Navbar />
      <Navbar2 />
      <h2>Select a Property to Donate Data</h2>
      <div className="property-list">
        {properties.map((property) => (
          <button key={property.property_id} className={selectionProperty(property.property_id)}
            onClick={() => setSelectedProperty(property.property_id)}>
            {property.propertyName}
          </button>
        ))}
      </div>

      {selectedProperty && (
        <div className="data-type-toggle">
          {['Water', 'Electric', 'Gas'].map(consume => (
          <button key={consume} className={selectionConsume(consume)}
            onClick={() => setSelectedConsume(consume)}>
            {consume}
          </button>
        ))}
      </div>
      )}

      {donationManagement()}

      <Footer/>
    </div>
  )
    
}

export default DataDonation;