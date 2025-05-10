import { useEffect, useState } from 'react';
import Navbar from './NavbarIn';
import Navbar2 from "./Navbar2";
import Footer from './Footer';
import "../layouts/DataDonation.css";
import axios from 'axios';
import { MdAddCircle, MdCancel } from "react-icons/md";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb, FaEdit, FaFileUpload } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


function DataDonation() {

  const userId = localStorage.getItem('user_id');
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
  }, [userId]);

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

  const [donationId, setDonationId] = useState(null);
  const [consent, setConsent] = useState(false); //Display Consent section
  const [selectedConsents, setSelectedConsents] = useState([]); 
  const [savedConsent, setSavedConsent] = useState(false);
  const [editingConsent, setEditingConsent] = useState(null); //Consents being edited (ID)
  const [confirmDeleteConsent, setConfirmDeleteConsent] = useState(false); //Confirm Delete

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ConsentList = ["General usage trends", "Campaign Contact", "Research Campaigns", "Government Campaigns", "Education Campaigns", "Transport Campaigns", "Business Campaigns", "Compare with Metadata"]

  const consumeIcons = [{icon:<IoWaterOutline />, consume:'Water'},{icon:<FaRegLightbulb />, consume:'Electric'},{icon:<FaFire />, consume:'Gas'}];

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
  }, [selectedProperty, selectedConsume, userId]);


  function UploadFile() {
    if (!uploadedFile || !selectedProperty || !selectedConsume) {
      setError("Select a valid file before saving");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", uploadedFile);
  
    axios.post(`http://localhost:3001/DataDonationManager/donation/${userId}/${selectedProperty}/${selectedConsume}`, formData)
      .then((response) => {
        setDonationId(response.data.donationId);
        setUpload(false); //Close upload
        setUploadedFile(null); //Clear after upload
        setConsent(true);
        setEditingConsent(null);
        return axios.get(`http://localhost:3001/DataDonationManager/donations/${userId}/${selectedProperty}/${selectedConsume}`);
      })
      .then((response) => {
        setUploadedInfos(response.data.files);
        setFirstUpload(response.data.firstUpload);
        setLastUpload(response.data.lastUpload);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Unexpected error during File Upload");
        }
      });
  }

  function editConsent(donationId) {
    axios.get(`http://localhost:3001/DataDonationManager/consent/${donationId}`)
    .then((response) => {
      setSelectedConsents(response.data.consents);
      setEditingConsent(donationId);
      setConsent(true);
    })
    .catch((err) => {
      console.error("Error loading existing consents:", err);
    });
  } 

  function consentSelection(value) {
    if (selectedConsents.includes(value)) {setSelectedConsents(selectedConsents.filter(consent => consent !== value));} //Remove element from the new array
    else {setSelectedConsents([...selectedConsents, value]);} //Add element to the new array
  }

  function consentSelectionAll() {
    if (selectedConsents.length === ConsentList.length) {
      setSelectedConsents([]); //Unselect when already selected
    } else {
      setSelectedConsents(ConsentList);
    }
  }

  function saveConsent() {
    setSavedConsent(true);    
    if (selectedConsents.length === 0) return;
    axios.post("http://localhost:3001/DataDonationManager/consent", {
      donationId: editingConsent || donationId,
      consents: selectedConsents.join(",")
    })
    .then(() => {
      setConsent(false);
      setSavedConsent(false);
      setSelectedConsents([]);
    })
    .catch((err) => {
      console.error("Error storing consents:", err);
    });
  }

  function deleteDonation(donationId) { 
    axios.delete(`http://localhost:3001/DataDonationManager/donationDelete/${donationId}`)
      .then(() => {
        setConsent(false); 
        setSelectedConsents([]); 
        setEditingConsent(null);
        return axios.get(`http://localhost:3001/DataDonationManager/donations/${userId}/${selectedProperty}/${selectedConsume}`);
      })
      .then((response) => {
        setUploadedInfos(response.data.files);
        setFirstUpload(response.data.firstUpload);
        setLastUpload(response.data.lastUpload);
      })
      .catch((err) => {
        console.error("Error deleting donation:", err);
      });
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
                <li key={i}>{file.filename} – Uploaded on: <strong>{new Date(file.upload_time).toLocaleDateString()} </strong> <button className="edit-consent" onClick={() => { editConsent(file.donation_id)}}><FaEdit /> Edit Consent</button> </li>
              ))}
            </ul>
          )}          

          <h2>Security policies</h2>
          <p className="security-policies-txt">Confidentiality and security are core values of DATALOG, and as such, we are committed to ensure the User’s privacy at all times and to not collect unnecessary information. Below, we provide all the necessary information regarding our Privacy Policy in relation to the personal data we collect, explaining:</p>
          
          <p><strong className="show-hide-answer" onClick={() => setShowAnswer1(!showAnswer1)}>
            {showAnswer1 ? "▼ Who is responsible for the processing of your data" : "▶ Who is responsible for the processing of your data"}
          </strong></p>
          {showAnswer1 && <p className="answer">DATALOG is responsible for the processing of your data once you have signed the data transfer agreement. Its in charge of protecting and managing your information.</p>}

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer2(!showAnswer2)}>
            {showAnswer2 ? "▼ For what purposes we collect the data we request" : "▶ For what purposes we collect the data we request"}
          </strong></p>
          {showAnswer2 && 
            <div className="answer">
              <p>Your consumption data is collected to allow you to:</p>
              <ul>
                <li>Access and understand your consumption data.</li>
                <li>Reuse it for personal insights.</li>
                <li>Authorize reuse for the common good.</li>
                <li>Participate in research or citizen science campaigns.</li>
              </ul>
            </div>
          }

          <p ><strong className="show-hide-answer" onClick={() => setShowAnswer3(!showAnswer3)}>
            {showAnswer3 ? "▼ What is the legal basis for its processing" : "▶ What is the legal basis for its processing"}
          </strong></p>
          {showAnswer3 && <p className="answer">The legal basis is your explicit consent given through the data transfer agreement, where you authorize DATALOG to request, process, and optionally anonymize your data for specific uses.</p>}

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer4(!showAnswer4)}>
            {showAnswer4 ? "▼ How long we retain your data" : "▶ How long we retain your data"}
          </strong></p>
          {showAnswer4 && 
            <div className="answer">
              <p>The data is retained until:</p>
              <ul>
                <li>You revoke consent.</li>
                <li>You request deletion.</li>
                <li>Or DATALOG no longer needs the data for the agreed purposes.</li>
              </ul>
            </div>
          }

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer5(!showAnswer5)}>
            {showAnswer5 ? "▼ To whom your data is disclosed" : "▶ To whom your data is disclosed"}
          </strong></p>
          {showAnswer5 && <p className="answer">Your data is not shared without your consent. If you want it to be shared with a third party, you must request it and DATALOG will anonymize and transfer the data as you specify.</p>}

          <p><strong className="show-hide-answer" onClick={() => setShowAnswer6(!showAnswer6)}>
            {showAnswer6 ? "▼ What your rights are" : "▶ What your rights are"}
          </strong></p>
          {showAnswer6 && 
            <div className="answer">
              <p>You have the right to:</p>
              <ul>
                <li>Access your data.</li>
                <li>Revoke consent.</li>
                <li>Request deletion of your data.</li>
                <li>Decide how it is reused.</li>
              </ul>
            </div>
          }

          <button className="add-data" onClick={() => {window.scrollTo(0, 0); setUpload(true)}}><MdAddCircle /> Add</button>
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
      {properties.length > 0 && (
        <div className="property-data">
          {properties.map((property) => (
            <button key={property.property_id} className={selectionProperty(property.property_id)}
              onClick={() => setSelectedProperty(property.property_id)}>
              {property.propertyName}
            </button>
          ))}
        </div>
      )}
      {properties.length === 0 && (
        <div className="no-properties">
          No properties added
          <button className="add-property-button" onClick={() => navigate('/addproperty')}><MdAddCircle /> Add New Property</button>   
        </div>
      )}

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

      {consent && (
        <div className="consent-popup">
          <div className="consent-popup-content">
            {editingConsent && <button className="delete-consent" onClick={() => {window.scrollTo(0, 0); setConfirmDeleteConsent(true)}}><RiDeleteBin5Fill /> Delete</button>}
            <h2>Consent Selection</h2>
            <div className="checkboxes-content">
              <div className="select-all">
                <label> <input type="checkbox" checked={selectedConsents.length === ConsentList.length} onChange={() => consentSelectionAll()}/>
                  Select All.
                </label>
              </div>
              <label><input type="checkbox" checked={selectedConsents.includes("General usage trends")} onChange={() => consentSelection("General usage trends")}/>
                I consent to the analysis of my compsumtion data for general purposes and usage trends.
              </label>
              <label><input type="checkbox" checked={selectedConsents.includes("Campaign Contact")} onChange={() => consentSelection("Campaign Contact")}/>
                I consent campaigns to contact me for further investigations.
              </label>
              <label><input type="checkbox" checked={selectedConsents.includes("Research Campaigns")} onChange={() => consentSelection("Research Campaigns")}/>
                I allow my consumption data to be used for research oriented campaigns (e.g., academic, social and economic impact).
              </label>
              <label><input type="checkbox" checked={selectedConsents.includes("Government Campaigns")} onChange={() => consentSelection("Government Campaigns")}/>
                I allow my consumption data to be used for goverment driven campaigns (e.g., energy regulations monitorization, investment planning).
              </label>
              <label> <input type="checkbox" checked={selectedConsents.includes("Education Campaigns")} onChange={() => consentSelection("Education Campaigns")}/>
                I allow my consumption data to be used in educational initiatives (e.g., school programs, awareness).
              </label>
              <label><input type="checkbox" checked={selectedConsents.includes("Transport Campaigns")} onChange={() => consentSelection("Transport Campaigns")}/>
                I allow my consumption data to be used for transport oriented campaigns (e.g., infraestructure optimization, energy usage analysis).
              </label>
              <label> <input type="checkbox" checked={selectedConsents.includes("Business Campaigns")} onChange={() => consentSelection("Business Campaigns")}/>
                I allow my consumption data to be used for business driven campaigns (e.g., energy saving solutions, services optimization).
              </label>
              <label> <input type="checkbox" checked={selectedConsents.includes("Compare with Metadata")} onChange={() => consentSelection("Compare with Metadata")}/>
                I consent to the analysis of my consumption data with metadata (e.g., climate, mobility, tourism).
              </label>
  
              {savedConsent && selectedConsents.length === 0 && (
                <div className="error-consent">Please select at least one consent option.</div>
              )}
            </div>

          <button className="save-consent" onClick={saveConsent}><MdAddCircle /> Save</button>
          {editingConsent && <button className="cancel-consent" onClick={() => {setConsent(false); setSelectedConsents([]); setEditingConsent(null)}}><MdCancel /> Cancel</button>}
          </div>
        </div>
      )}

      {confirmDeleteConsent && (
        <div className="delete-confirm-popup">
          <div className="delete-confirm-popup-content">
            <p>Are you sure you want to delete this data donation?</p>
            <div className="delete-confirm-popup-buttons">
              <button onClick={() => {deleteDonation(editingConsent); setConfirmDeleteConsent(false)}}>Yes</button>
              <button onClick={() => {setConfirmDeleteConsent(false)}}>No</button>
            </div>
          </div>
        </div>
      )}

    <Footer/>
  </div>
  ) 
}

export default DataDonation;