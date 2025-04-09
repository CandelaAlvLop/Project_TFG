import React, {useEffect, useState} from 'react';
import Navbar from './NavbarIn';
import Navbar2 from "./Navbar2";
import Footer from './Footer';
import "../layouts/DataDonation.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAddCircle, MdCancel } from "react-icons/md";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb, FaEdit, FaFileUpload } from "react-icons/fa";

function DataDonation() {
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
  }, []);

  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedConsume, setSelectedConsume] = useState("");
  const [upload, setUpload] = useState(false); //Upload form
  const [uploadedFile, setUploadedFile] = useState(null); //Before upload
  const [uploadedInfos, setUploadedInfos] = useState([]); //After upload
  const [firstUpload, setFirstUpload] = useState(null);
  const [lastUpload, setLastUpload] = useState(null);
  const [showFiles, setShowFiles] = useState(false);
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
  const [showAnswer4, setShowAnswer4] = useState(false);
  const [showAnswer5, setShowAnswer5] = useState(false);
  const [showAnswer6, setShowAnswer6] = useState(false);
  const [error, setError] = useState("");

  const consumeIcons = [{icon:<IoWaterOutline />, consume:'Water'},{icon:<FaRegLightbulb />, consume:'Electric'},{icon:<FaFire />, consume:'Gas'}];
  
  const userId = localStorage.getItem('user_id');

  function selectionProperty (propertyId) {
    if (selectedProperty === propertyId) return "property-select selected";
    else return "property-select";
  }

  function selectionConsume (consume) {
    if (selectedConsume === consume) return "property-consume-select selected";
    else return "property-consume-select";
  }

  useEffect(() => {
    if (userId && selectedProperty && selectedConsume) {
      axios.get(`http://localhost:3001/DataDonationManager/donations/${userId}/${selectedProperty}/${selectedConsume}`)
        .then((response) => {
          setUploadedInfos(response.data.files);
          setFirstUpload(response.data.firstUpload);
          setLastUpload(response.data.lastUpload);
          setShowFiles(false);
          setShowAnswer1(false);
          setShowAnswer2(false);
          setShowAnswer3(false);
          setShowAnswer4(false);
          setShowAnswer5(false);
          setShowAnswer6(false);
          setUpload(false);
          setUploadedFile(null);
          setError("");
        })
        .catch(() => {
          setUploadedInfos([]);
          setUpload(false);
          setUploadedFile(null);
          setShowFiles(false);
          setShowAnswer1(false);
          setShowAnswer2(false);
          setShowAnswer3(false);
          setShowAnswer4(false);
          setShowAnswer5(false);
          setShowAnswer6(false);
          setError("");
        });
    }
  }, [selectedProperty, selectedConsume]);

  

  function UploadFile() {
    if (!uploadedFile || !selectedProperty || !selectedConsume) {
      setError("Select file, property, and consumption type before submitting");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", uploadedFile);
  
    axios.post(`http://localhost:3001/DataDonationManager/donation/${userId}/${selectedProperty}/${selectedConsume}`, formData)
      .then(() => {
        setUpload(false); //Close upload
        setUploadedFile(null); //Clear after upload
        return axios.get(`http://localhost:3001/DataDonationManager/donations/${userId}/${selectedProperty}/${selectedConsume}`);
      })
      .then((response) => {
        setUploadedInfos(response.data.files);
      })
      .catch((error) => {
        console.error("Upload error:", error);
      });
  }

  function modifyConsume() {
    localStorage.setItem("consume", selectedConsume);
    localStorage.setItem("property_id", selectedProperty);
    navigate("/modifyconsent");
  } 

  function donationManagement() {
    if (upload) {
      return (
        <div className="upload-data">
          <p>Upload your file of consumption data:</p>
          <div><input type="file" onChange={(e) => {setUploadedFile(e.target.files[0]); setError("");}}/></div>
          <button onClick={UploadFile}><FaFileUpload /> Upload</button>
          <button onClick={() => {setUpload(false); setUploadedFile(null); setError("");}}><MdCancel /> Cancel</button>
          {error && (<div className="error-upload-file">{error}</div>)}
        </div>
      );
    }

    if (uploadedInfos.length > 0) {
      return (
        <div className="donation">
          <p className="donation-txt">Thank for letting us help you through your data to improve your habits and raise awareness about a better use of resources.</p>

          <h2>Provided Data</h2>
          {firstUpload && lastUpload && (
            <><p><strong>First uploaded data:</strong> {new Date(firstUpload.upload_time).toLocaleDateString()}</p>
            <p><strong>Last updated data:</strong> {new Date(lastUpload.upload_time).toLocaleDateString()}</p></>
          )}
          
          <strong className="show-hide-files-uploaded" onClick={() => setShowFiles(!showFiles)}>
            {showFiles ? "▼ Hide Files Uploaded" : "▶ Show Files Uploaded"}
          </strong>
          {showFiles && (
            <ul>
              {uploadedInfos.map((file, i) => (
                <li key={i}>{file.filename} – Uploaded on: <strong>{new Date(file.upload_time).toLocaleDateString()}</strong></li>
              ))}
            </ul>
          )}          

          <h2>Security policies</h2>
          <p className="security-policies-txt">Confidentiality and security are core values of DATALOG, and as such, we are committed to ensure the User’s privacy at all times and to not collect unnecessary information. Below, we provide all the necessary information regarding our Privacy Policy in relation to the personal data we collect, explaining:</p>
          
          <p><strong className="show-hide-answer" onClick={() => setShowAnswer1(!showAnswer1)}>
            {showAnswer1 ? "▼ Who is responsible for the processing of your data" : "▶ Who is responsible for the processing of your data"}
          </strong></p>
          {showAnswer1 && <p>Answer 1</p>}

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer2(!showAnswer2)}>
            {showAnswer2 ? "▼ For what purposes we collect the data we request" : "▶ For what purposes we collect the data we request"}
          </strong></p>
          {showAnswer2 && <p>Answer 2</p>}

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer3(!showAnswer3)}>
            {showAnswer3 ? "▼ What is the legal basis for its processing" : "▶ What is the legal basis for its processing"}
          </strong></p>
          {showAnswer3 && <p>Answer 3</p>}

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer4(!showAnswer4)}>
            {showAnswer4 ? "▼ How long we retain your data" : "▶ How long we retain your data"}
          </strong></p>
          {showAnswer4 && <p>Answer 4</p>}

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer5(!showAnswer5)}>
            {showAnswer5 ? "▼ To whom your data is disclosed" : "▶ To whom your data is disclosed"}
          </strong></p>
          {showAnswer5 && <p>Answer 5</p>}

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer6(!showAnswer6)}>
            {showAnswer6 ? "▼ What your rights are" : "▶ What your rights are"}
          </strong></p>
          {showAnswer6 && <p>Answer 6</p>}

          <button className="add-data" onClick={() => {window.scrollTo(0, 0); setUpload(true)}}><MdAddCircle /> Add</button>
          <button className="modify-data" onClick={() => {window.scrollTo(0, 0); modifyConsume()}}><FaEdit /> Modify</button>
        </div>
      );
    }
  
    return (
      <div className="donation">
        <p>No donation yet for this property. Provide it below.</p>
        <button className="add" onClick={() => setUpload(true)}><MdAddCircle /> Add</button>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <Navbar2 />

      <h1 className="property-title">Select a Property to Donate Data</h1>
      
      <div className="property-data">
        {properties.map((property) => (
          <button key={property.property_id} className={selectionProperty(property.property_id)}
            onClick={() => setSelectedProperty(property.property_id)}>
            {property.propertyName}
          </button>
        ))}
      </div>

      {selectedProperty && ( <div className="property-consume-type">
        {consumeIcons.map(({icon, consume}) => (
          <button key={consume} className={selectionConsume(consume)}
            onClick={() => setSelectedConsume(consume)}>
            <span className="icon"> {icon}</span>
            <span className="consume"> {consume}</span>
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