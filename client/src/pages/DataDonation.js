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

      if (!userId) return console.error("No User retrieved");
      axios.get(`http://localhost:3001/UserManager/properties/${userId}`)
          .then((response) => {
              setProperties(response.data);
          })
          .catch((error) => {
              console.error("Error retrieving User Property data:", error);
          });
  }, []);

  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedConsume, setSelectedConsume] = useState("");

  const [upload, setUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedInfo, setUploadedInfo] = useState(null); 

  const userId = localStorage.getItem('user_id');

  function selectionProperty (propertyId) {
    if (selectedProperty === propertyId) return "property-card selected";
    else return "property-card";
  }

  function selectionConsume (consume) {
    if (selectedConsume === consume) return "property-card selected";
    else return "property-card";
  }

  useEffect(() => {
    if (userId && selectedProperty && selectedConsume) {
      axios.get("http://localhost:3001/UserManager/donations/" + userId + "/" + selectedProperty + "/" + selectedConsume)
        .then((response) => {
          setUploadedInfo(response.data);
        })
        .catch(() => {
          setUploadedInfo(null);
        });
    }
  }, [selectedProperty, selectedConsume]);

  function UploadFile() {
    if (!uploadedFile || !selectedProperty || !selectedConsume) {
      return alert("Select file, property, and consumption type first");
    }
  
    const formData = new FormData();
    formData.append("file", uploadedFile);
  
    axios.post(`http://localhost:3001/UserManager/donation/${userId}/${selectedProperty}/${selectedConsume}`, formData)
      .then((response) => {
        setUploadedInfo(response.data); //Show info
        setUpload(false); //Close upload
        setUploadedFile(null); //Clear after upload
      })
      .catch((error) => {
        console.error("Upload error:", error);
      });
  }

  function donationManagement() {
    if (upload) {
      return (
        <div className="upload-button">
          <p>Upload your file of consumption data:</p>
          <input
            type="file"
            onChange={(e) => setUploadedFile(e.target.files[0])}
          />
          <button onClick={UploadFile}>Submit</button>
          <button onClick={() => {setUpload(false); setUploadedFile(null)}}>Cancel</button>
        </div>
      );
    }

    if (uploadedInfo) {
      return (
        <div className="no-donation">
          <p><strong>Uploaded file</strong>: {uploadedInfo.filename}</p>
          <button className="add" onClick={() => setUpload(true)}>Add</button>
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

      {selectedConsume && donationManagement()}

      <Footer/>
    </div>
  )
    
}

export default DataDonation;