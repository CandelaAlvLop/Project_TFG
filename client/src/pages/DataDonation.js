import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import "../layouts/DataDonation.css";
import { MdAddCircle, MdCancel } from "react-icons/md";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb, FaEdit, FaFileUpload } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


function DataDonation() {

    const userId = localStorage.getItem("user_id");
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
    const [donationId, setDonationId] = useState(null);
    const [error, setError] = useState("");

    const [showAnswer1, setShowAnswer1] = useState(false);
    const [showAnswer2, setShowAnswer2] = useState(false);
    const [showAnswer3, setShowAnswer3] = useState(false);
    const [showAnswer4, setShowAnswer4] = useState(false);
    const [showAnswer5, setShowAnswer5] = useState(false);
    const [showAnswer6, setShowAnswer6] = useState(false);

    const [consent, setConsent] = useState(false); //Display Consent section
    const [selectedConsents, setSelectedConsents] = useState([]);
    const [savedConsent, setSavedConsent] = useState(false);
    const [editingConsent, setEditingConsent] = useState(null); //Consents being edited (ID)

    const [justificationForm, setJustificationForm] = useState(false);
    const [selectedJustifications, setSelectedJustifications] = useState([]);
    const [other, setOther] = useState("");
    const [savedJustifications, setSavedJustifications] = useState(false);
    const [confirmDeleteConsent, setConfirmDeleteConsent] = useState(false); //Confirm Delete

    const navigate = useNavigate();

    const ConsentList = ["General usage trends", "Campaign Contact", "Research Campaigns", "Government Campaigns", "Education Campaigns", "Transport Campaigns", "Business Campaigns", "Compare with Metadata"]
    const consumeIcons = [{ icon: <IoWaterOutline />, consume: "Water" }, { icon: <FaRegLightbulb />, consume: "Electric" }, { icon: <FaFire />, consume: "Gas" }];

    useEffect(() => {
        if (userId && selectedProperty && selectedConsume) {
            //Get files metadata for the consume and property selected for a certain user
            axios.get(`http://localhost:3001/DataDonationManager/donations/${userId}/${selectedProperty}/${selectedConsume}`)
                .then((response) => {
                    setUploadedInfos(response.data.files);
                    setFirstUpload(response.data.firstUpload);
                    setLastUpload(response.data.lastUpload);
                    //Reset State
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

    //CSS for property selection and deselection
    function selectionProperty(propertyId) {
        if (selectedProperty === propertyId) return "property-select selected";
        else return "property-select";
    }
    //CSS for consume selection and deselection
    function selectionConsume(consume) {
        if (selectedConsume === consume) return "property-consume-select selected";
        else return "property-consume-select";
    }

    //Upload a data file
    function UploadFile() {
        if (!uploadedFile || !selectedProperty || !selectedConsume) {
            setError("Select a valid file before saving");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadedFile);

        //Post file for the consume and property selected for a certain user
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

    //Edit Consents
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

    //Consent Selection - Processing for checkbox selection and deselection
    function consentSelection(value) {
        //If the previosuly checked value is deselected, a new array is created filtering that value
        if (selectedConsents.includes(value)) { setSelectedConsents(selectedConsents.filter(consent => consent !== value)); }
        //If the value is selected (is not stored in the array), the value is added to the array
        else { setSelectedConsents([...selectedConsents, value]); } //Add element to the new array
    }

    //Processing for "Select All" checkbox selection and deselction
    function consentSelectionAll() {
        if (selectedConsents.length === ConsentList.length) {
            setSelectedConsents([]); //Unselect when already selected
        } else {
            setSelectedConsents(ConsentList);
        }
    }

    //Save Consent Selection
    function saveConsent() {
        setSavedConsent(true);
        if (selectedConsents.length === 0) return;
        axios.post("http://localhost:3001/DataDonationManager/consent", {
            donationId: editingConsent || donationId,
            consents: selectedConsents.join(",") //Join consents to send to the backend as a single list
        }).then(() => {
            setConsent(false);
            setSavedConsent(false);
            setSelectedConsents([]);
        }).catch((err) => {
            console.error("Error storing consents:", err);
        });
    }

    //Select Justifications - Processing for checkbox selection and deselection
    function justificationSelection(value) {
        if (selectedJustifications.includes(value)) { setSelectedJustifications(selectedJustifications.filter(consent => consent !== value)); }
        else { setSelectedJustifications([...selectedJustifications, value]); }
    }

    //Justification Delete Button
    function deleteJustification() {
        setSavedJustifications(true);
        if (selectedJustifications.length !== 0) {
            if (selectedJustifications.includes("Other Reason") && other !== "") {
                setSelectedJustifications([...selectedJustifications.filter(otherReason => otherReason !== "Other Reason"), other]);
            }
            window.scrollTo(0, 0);
            setConfirmDeleteConsent(true);
            setJustificationForm(false)
        }
    }

    //Delete Donation
    function deleteDonation(donationId) {
        axios.post("http://localhost:3001/DataDonationManager/donationDelete/", {
            userId: userId,
            donationId: donationId,
            justifications: selectedJustifications.join(",") //Join justifications to send to the backend as a single list
        }).then(() => {
            setConsent(false);
            setSelectedConsents([]);
            setEditingConsent(null);
            setSelectedJustifications([]);
            setSavedJustifications(false);
            setOther("");
            setError("");
            return axios.get(`http://localhost:3001/DataDonationManager/donations/${userId}/${selectedProperty}/${selectedConsume}`);
        }).then((response) => {
            setUploadedInfos(response.data.files);
            setFirstUpload(response.data.firstUpload);
            setLastUpload(response.data.lastUpload);
        }).catch((err) => {
            console.error("Error deleting donation:", err);
        });
    }

    function donationManagement() {
        //Upload file section
        if (upload) {
            return (
                <div className="upload-data">
                    <p>Upload your file of consumption data:</p>
                    <div><input type="file" onChange={(e) => { setUploadedFile(e.target.files[0]); setError(""); }} /></div>
                    <button onClick={UploadFile}><FaFileUpload /> Upload</button>
                    <button onClick={() => { setUpload(false); setUploadedFile(null); setError(""); }}><MdCancel /> Cancel</button>
                    {error && (<div className="error-upload-file">{error}</div>)}
                </div>
            );
        }

        //If uploaded file
        if (uploadedInfos.length > 0) {
            return (
                <div className="donation">
                    <p className="donation-txt">Thank for letting us help you through your data to improve your habits and raise awareness about a better use of resources.</p>

                    {/*View files metadata*/}
                    <h2>Provided Data</h2>
                    {firstUpload && lastUpload && (
                        <><p><strong>First uploaded data:</strong> {new Date(firstUpload.upload_time).toLocaleDateString()}</p>
                            <p><strong>Last updated data:</strong> {new Date(lastUpload.upload_time).toLocaleDateString()}</p></>
                    )}
                    <p><strong>Files Uploaded:</strong></p>
                    <ul>
                        {/*Edit consents access*/}
                        {uploadedInfos.map((file, i) => (
                            <li key={i}>{file.filename} – Uploaded on: <strong>{new Date(file.upload_time).toLocaleDateString()} </strong> <button className="edit-consent" onClick={() => { editConsent(file.donation_id) }}><FaEdit /> Edit Consent</button> </li>
                        ))}
                    </ul>

                    {/*Show Security Policies Answers*/}
                    <h2>Security policies</h2>
                    <p className="security-policies-txt">Confidentiality and security are core values of DATALOG, and as such, we are committed to ensure the User’s privacy at all times and to not collect unnecessary information. Below, we provide all the necessary information regarding our Privacy Policy in relation to the personal data we collect, explaining:</p>

                    <p><strong className="show-hide-answer" onClick={() => setShowAnswer1(!showAnswer1)}> {showAnswer1 ? "▼ Who is responsible for the processing of your data" : "▶ Who is responsible for the processing of your data"} </strong></p>
                    {showAnswer1 && <p className="answer">DATALOG is responsible for the processing of your data once you have signed the data transfer agreement. Its in charge of protecting and managing your information.</p>}

                    <p><strong className="show-hide-answer" onClick={() => setShowAnswer2(!showAnswer2)}> {showAnswer2 ? "▼ For what purposes we collect the data we request" : "▶ For what purposes we collect the data we request"} </strong></p>
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

                    <p><strong className="show-hide-answer" onClick={() => setShowAnswer3(!showAnswer3)}> {showAnswer3 ? "▼ What is the legal basis for its processing" : "▶ What is the legal basis for its processing"} </strong></p>
                    {showAnswer3 && <p className="answer">The legal basis is your explicit consent given through the data transfer agreement, where you authorize DATALOG to request, process, and optionally anonymize your data for specific uses.</p>}

                    <p><strong className="show-hide-answer" onClick={() => setShowAnswer4(!showAnswer4)}> {showAnswer4 ? "▼ How long we retain your data" : "▶ How long we retain your data"} </strong></p>
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

                    <p><strong className="show-hide-answer" onClick={() => setShowAnswer5(!showAnswer5)}> {showAnswer5 ? "▼ To whom your data is disclosed" : "▶ To whom your data is disclosed"} </strong></p>
                    {showAnswer5 && <p className="answer">Your data is not shared without your consent. If you want it to be shared with a third party, you must request it and DATALOG will anonymize and transfer the data as you specify.</p>}

                    <p><strong className="show-hide-answer" onClick={() => setShowAnswer6(!showAnswer6)}> {showAnswer6 ? "▼ What your rights are" : "▶ What your rights are"} </strong></p>
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
                    {/*Upload data access*/}
                    <button className="add-data" onClick={() => { window.scrollTo(0, 0); setUpload(true) }}><MdAddCircle /> Add</button>
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
            {/*Show User Properties*/}
            <h1 className="property-title">Select a Property to Upload Data</h1>
            {/*Property selection*/}
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
                    <button className="add-property-button" onClick={() => navigate("/addproperty")}><MdAddCircle /> Add New Property</button>
                </div>
            )}

            {/*Consume type selection*/}
            {selectedProperty && (<div className="property-consume-type">
                {consumeIcons.map(({ icon, consume }) => (
                    <button key={consume} className={selectionConsume(consume)}
                        onClick={() => setSelectedConsume(consume)}>
                        <span className="icon"> {icon}</span>
                        <span className="consume"> {consume}</span>
                    </button>
                ))}
            </div>
            )}

            {selectedConsume && donationManagement()}

            {/*Consent selection*/}
            {consent && (
                <div className="consent-popup">
                    <div className="consent-popup-content">
                        {editingConsent && <button className="delete-consent" onClick={() => { window.scrollTo(0, 0); setJustificationForm(true) }}><RiDeleteBin5Fill /> Delete</button>}

                        {/*Justification selection*/}
                        {justificationForm && (
                            <div className="donation-popup">
                                <div className="donation-popup-content">
                                    <h2>Why do you want to delete your data?</h2>
                                    <div className="checkboxes-donation">
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Incorrect Data")} onChange={() => justificationSelection("Incorrect Data")} />
                                            The uploaded data is incorrect or outdated.
                                        </label>
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Wrong File")} onChange={() => justificationSelection("Wrong File")} />
                                            I uploaded the wrong file.
                                        </label>
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Not interested in sharing data")} onChange={() => justificationSelection("Not interested in sharing data")} />
                                            I am no longer interested in sharing my data for educational, research, government, transport or business purposes.
                                        </label>
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Want full control over data")} onChange={() => justificationSelection("Want full control over data")} />
                                            I want to have full control over my consumption data share.
                                        </label>
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Privacy Concern")} onChange={() => justificationSelection("Privacy Concern")} />
                                            I am concerned about the privacy of my personal data.
                                        </label>
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Security Storage Concern")} onChange={() => justificationSelection("Security Storage Concern")} />
                                            I am concerned about the security of the storage of my personal and consumption data.
                                        </label>
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Data Use Concern")} onChange={() => justificationSelection("Data Use Concern")} />
                                            I am concerned about the use of my personal and consumption data.
                                        </label>
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Temporary removal")} onChange={() => justificationSelection("Temporary removal")} />
                                            I am temporarily removing my contribution.
                                        </label>
                                        <label><input type="checkbox" checked={selectedJustifications.includes("Other Reason")} onChange={() => justificationSelection("Other Reason")} />
                                            Other reason:
                                        </label>
                                        <input className="other" type="text" placeholder="Please specify your reason" value={other} onChange={(e) => setOther(e.target.value)} />

                                        {savedJustifications && selectedJustifications.length === 0 && (
                                            <div className="error-donation">Please select at least one justification option.</div>
                                        )}
                                    </div>

                                    <div className="justification-buttons">
                                        <button className="delete-donation" onClick={() => { deleteJustification() }}><RiDeleteBin5Fill /> Delete</button>
                                        <button className="cancel-donation" onClick={() => { setJustificationForm(false); setSelectedJustifications([]); setSavedJustifications(false); setOther(""); setError("") }}><MdCancel /> Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <h2>Consent Selection</h2>
                        <div className="checkboxes-content">
                            <div className="select-all">
                                <label> <input type="checkbox" checked={selectedConsents.length === ConsentList.length} onChange={() => consentSelectionAll()} />
                                    Select All.
                                </label>
                            </div>
                            <label><input type="checkbox" checked={selectedConsents.includes("General usage trends")} onChange={() => consentSelection("General usage trends")} />
                                I consent to the analysis of my consumption data for general purposes and usage trends.
                            </label>
                            <label><input type="checkbox" checked={selectedConsents.includes("Campaign Contact")} onChange={() => consentSelection("Campaign Contact")} />
                                I consent campaigns to contact me for further investigations.
                            </label>
                            <label><input type="checkbox" checked={selectedConsents.includes("Research Campaigns")} onChange={() => consentSelection("Research Campaigns")} />
                                I allow my consumption data to be used for research oriented campaigns (e.g., academic, social and economic impact).
                            </label>
                            <label><input type="checkbox" checked={selectedConsents.includes("Government Campaigns")} onChange={() => consentSelection("Government Campaigns")} />
                                I allow my consumption data to be used for government driven campaigns (e.g., energy regulations monitoring, investment planning).
                            </label>
                            <label> <input type="checkbox" checked={selectedConsents.includes("Education Campaigns")} onChange={() => consentSelection("Education Campaigns")} />
                                I allow my consumption data to be used in educational initiatives (e.g., school programs, awareness).
                            </label>
                            <label><input type="checkbox" checked={selectedConsents.includes("Transport Campaigns")} onChange={() => consentSelection("Transport Campaigns")} />
                                I allow my consumption data to be used for transport oriented campaigns (e.g., infrastructure optimization, energy usage analysis).
                            </label>
                            <label> <input type="checkbox" checked={selectedConsents.includes("Business Campaigns")} onChange={() => consentSelection("Business Campaigns")} />
                                I allow my consumption data to be used for business driven campaigns (e.g., energy saving solutions, services optimization).
                            </label>
                            <label> <input type="checkbox" checked={selectedConsents.includes("Compare with Metadata")} onChange={() => consentSelection("Compare with Metadata")} />
                                I consent to the analysis of my consumption data with metadata (e.g., climate, mobility, tourism).
                            </label>

                            {savedConsent && selectedConsents.length === 0 && (
                                <div className="error-consent">Please select at least one consent option.</div>
                            )}
                        </div>

                        <button className="save-consent" onClick={saveConsent}><CiSaveDown2 /> Save</button>
                        {editingConsent && <button className="cancel-consent" onClick={() => { setConsent(false); setSelectedConsents([]); setEditingConsent(null) }}><MdCancel /> Cancel</button>}
                    </div>
                </div>
            )}

            {/*Delete Data, Consents and Justifications*/}
            {confirmDeleteConsent && (
                <div className="delete-confirm-popup">
                    <div className="delete-confirm-popup-content">
                        <p>Are you sure you want to delete this data donation?</p>
                        <div className="delete-confirm-popup-buttons">
                            <button onClick={() => { deleteDonation(editingConsent); setConfirmDeleteConsent(false); setOther(""); setError("") }}>Yes</button>
                            <button onClick={() => { setConfirmDeleteConsent(false); setSelectedJustifications([]); setSavedJustifications(false); setOther(""); setError("") }}>No</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default DataDonation;