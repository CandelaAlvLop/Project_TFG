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

  }
  

  function donationManagement() {
    
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


      <Footer/>
    </div>
  )
    
}

export default DataDonation;