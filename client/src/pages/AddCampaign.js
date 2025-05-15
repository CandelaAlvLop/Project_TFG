import { useState, useEffect } from 'react';
import NavbarIn2 from './NavbarIn2';
import Navbar3 from './Navbar3';
import Footer from "./Footer";
import '../layouts/AddProperty.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAddCircle } from "react-icons/md";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";


function AddCampaign() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const campaignName_Pattern = /^[A-Z][a-zA-Z0-9\s]{0,39}$/;
    const [setCampaigns] = useState([]);
    const [NewCampaignName, setNewCampaignName] = useState("");
    const [NewDescription, setNewDescription] = useState("");
    const [NewDates, setNewDates] = useState("");
    const [NewEndDate, setNewEndDate] = useState("");
    const [NewRetainDate, setNewRetainDate] = useState("");
    const [NewType, setNewType] = useState([]);
    const [NewTitleObjective1, setNewTitleObjective1] = useState("");
    const [NewDescriptionObjective1, setNewDescriptionObjective1] = useState("");
    const [NewTitleObjective2, setNewTitleObjective2] = useState("");
    const [NewDescriptionObjective2, setNewDescriptionObjective2] = useState("");
    const [NewTitleObjective3, setNewTitleObjective3] = useState("");
    const [NewDescriptionObjective3, setNewDescriptionObjective3] = useState("");
    const [NewTitleObjective4, setNewTitleObjective4] = useState("");
    const [NewDescriptionObjective4, setNewDescriptionObjective4] = useState("");
    const [NewStep1, setNewStep1] = useState("");
    const [NewStep2, setNewStep2] = useState("");
    const [NewStep3, setNewStep3] = useState("");
    const [NewWhyJoin, setNewWhyJoin] = useState("");
    const [NewMoreInfo, setNewMoreInfo] = useState("");
    const [NewConclusionSentence, setNewConclusionSentence] = useState("");


    const [error, setError] = useState("");
    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");

    function setUserCampaign() {
        if (!userId) return console.error("No User retrieved");
        axios.get(`http://localhost:3001/CampaignManager/campaigns/${userId}`)
            .then((response) => {
                setCampaigns(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving Campaigns data:", error);
            });
    };

    //Add Campaign
    function addCampaign(e) {
        e.preventDefault();

        if (NewType.length === 0) {
            setError("You must select at least one utility (Water, Gas, Electric).");
            return;
        }

        axios.post('http://localhost:3001/CampaignManager/campaigns', {
            userId,
            campaignName: NewCampaignName,
            description: NewDescription,
            dates: NewDates,
            endDate: NewEndDate,
            retainDate: NewRetainDate,
            type: NewType.join(","),
            titleObjective1: NewTitleObjective1,
            descriptionObjective1: NewDescriptionObjective1,
            titleObjective2: NewTitleObjective2,
            descriptionObjective2: NewDescriptionObjective2,
            titleObjective3: NewTitleObjective3,
            description3: NewDescriptionObjective3,
            titleObjective4: NewTitleObjective4,
            description4: NewDescriptionObjective4,
            step1: NewStep1,
            step2: NewStep2,
            step3: NewStep3,
            whyJoin: NewWhyJoin,
            moreInfo: NewMoreInfo,
            conclusionSentence: NewConclusionSentence,
        }).then(() => {
            setUserCampaign();
            console.log("Campaign added successfully");
            navigate('/mycampaigns');
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error adding Campaign");
            }
        });
    };

    function typeSelection(value) {
        if (NewType.includes(value)) { setNewType(NewType.filter(type => type !== value)); } //Remove element from the new array
        else { setNewType([...NewType, value]); } //Add element to the new array
    }

    function typeSelectionCSS(types) {
        if (NewType.includes(types)) return "icon-select selected";
        else return "icon-select";
    }

    return (
        <div>
            <NavbarIn2 />
            <Navbar3 />
            <div className="add-property">
                <h1>Campaign Information</h1>
                <form onSubmit={addCampaign}>

                    <h2>General Information</h2>
                    <div className="section">
                        <label htmlFor="propertyName">Name of the Campaign</label>
                        <input type="text" id="propertyName" name="propertyName" value={NewCampaignName} placeholder="Name of the campaign" required
                            //Campaign name must start with a capital letter and be followed by small letters, max 40 letters
                            onInvalid={(e) => e.target.setCustomValidity("Campaign name must start with a capital letter and be followed by small letters, max 40 letters")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!campaignName_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Campaign name must start with a capital letter and be followed by small letters, max 15 letters");
                                }
                            }}
                            onChange={(e) => setNewCampaignName(e.target.value)}
                        />
                        <label htmlFor="description">Campaign Description</label>
                        <input type="text" id="description" name="description" value={NewDescription} placeholder="Small description of the campaign" required
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <label htmlFor="dates">Dates data must be from</label>
                        <input type="text" id="dates" name="dates" value={NewDates} placeholder="Date range of data (e.g. Data beetween 2020 and 2023)" required
                            onChange={(e) => setNewDates(e.target.value)}
                        />
                        <label htmlFor="endDate">End Date</label>
                        <input type="text" id="endDate" name="endDate" value={NewEndDate} placeholder="Last day to join the campaign" required
                            onChange={(e) => setNewEndDate(e.target.value)}
                        />
                        <label htmlFor="retainDate">Date of end of data retain</label>
                        <input type="text" id="retainDate" name="retainDate" value={NewRetainDate} placeholder="Until when is data retained" required
                            onChange={(e) => setNewRetainDate(e.target.value)}
                        />
                        <label htmlFor="type">Utilities requested</label>
                        <div className="icon-filter">
                            <span onClick={() => typeSelection("Water")} className={typeSelectionCSS("Water")}><IoWaterOutline /></span>
                            <span onClick={() => typeSelection("Gas")} className={typeSelectionCSS("Gas")}><FaFire /></span>
                            <span onClick={() => typeSelection("Electric")} className={typeSelectionCSS("Electric")}><FaRegLightbulb /></span>
                        </div>
                    </div>

                    <h2>Objectives</h2>
                    <div className="section">
                        <div className="objective">
                            <label htmlFor="titleObjective1">Objective Title</label>
                            <input type="text" id="titleObjective1" name="titleOjective1" value={NewTitleObjective1} placeholder="Objective Title" required
                                onChange={(e) => setNewTitleObjective1(e.target.value)}
                            />
                            <label htmlFor="descriptionObjective1">Objective Description</label>
                            <input type="text" id="descriptionObjective1" name="descriptionOjective1" value={NewDescriptionObjective1} placeholder="Objective Description" required
                                onChange={(e) => setNewDescriptionObjective1(e.target.value)}
                            />
                        </div>
                        <div className="objective">
                            <label htmlFor="titleObjective2">Objective Title</label>
                            <input type="text" id="titleObjective2" name="titleOjective2" value={NewTitleObjective2} placeholder="Objective Title" required
                                onChange={(e) => setNewTitleObjective2(e.target.value)}
                            />
                            <label htmlFor="descriptionObjective2">Objective Description</label>
                            <input type="text" id="descriptionObjective2" name="descriptionOjective2" value={NewDescriptionObjective2} placeholder="Objective Description" required
                                onChange={(e) => setNewDescriptionObjective2(e.target.value)}
                            />
                        </div>
                        <div className="objective">
                            <label htmlFor="titleObjective3">Objective Title</label>
                            <input type="text" id="titleObjective3" name="titleOjective3" value={NewTitleObjective3} placeholder="Objective Title" required
                                onChange={(e) => setNewTitleObjective3(e.target.value)}
                            />
                            <label htmlFor="descriptionObjective3">Objective Description</label>
                            <input type="text" id="descriptionObjective3" name="descriptionOjective3" value={NewDescriptionObjective3} placeholder="Objective Description" required
                                onChange={(e) => setNewDescriptionObjective3(e.target.value)}
                            />
                        </div>
                        <div className="objective">
                            <label htmlFor="titleObjective4">Objective Title</label>
                            <input type="text" id="titleObjective4" name="titleOjective4" value={NewTitleObjective4} placeholder="Objective Title" required
                                onChange={(e) => setNewTitleObjective4(e.target.value)}
                            />
                            <label htmlFor="descriptionObjective4">Objective Description</label>
                            <input type="text" id="descriptionObjective4" name="descriptionOjective4" value={NewDescriptionObjective4} placeholder="Objective Description" required
                                onChange={(e) => setNewDescriptionObjective4(e.target.value)}
                            />
                        </div>
                    </div>

                    <h2>How does the Campaign Work</h2>
                    <div className="section">
                        <label htmlFor="step1">Step 1</label>
                        <input type="text" id="step1" name="step1" value={NewStep1} placeholder="Small description about the campaign steps" required
                            onChange={(e) => setNewStep1(e.target.value)}
                        />
                        <label htmlFor="step2">Step 2</label>
                        <input type="text" id="step2" name="step2" value={NewStep2} placeholder="Small description about the campaign steps" required
                            onChange={(e) => setNewStep2(e.target.value)}
                        />
                        <label htmlFor="step3">Step 3</label>
                        <input type="text" id="step3" name="step3" value={NewStep3} placeholder="Small description about the campaign steps" required
                            onChange={(e) => setNewStep3(e.target.value)}
                        />
                    </div>

                    <h2>Additional Information</h2>
                    <div className="section">
                        <label htmlFor="whyJoin">Why Join The Campaign?</label>
                        <input type="text" id="whyJoin" name="whyJoin" value={NewWhyJoin} placeholder="Description about reasons to join the campaign" required
                            onChange={(e) => setNewWhyJoin(e.target.value)}
                        />
                        <label htmlFor="moreInfo">More Information</label>
                        <input type="text" id="moreInfo" name="moreInfo" value={NewMoreInfo} placeholder="More information on the campaign and the organization" required
                            onChange={(e) => setNewMoreInfo(e.target.value)}
                        />
                        <label htmlFor="conclusionSentence"> Small final Conclusion Sentence</label>
                        <input type="text" id="conclusionSentence" name="conclusionSentence" value={NewConclusionSentence} placeholder="Small final conclusion sentence" required
                            onChange={(e) => setNewConclusionSentence(e.target.value)}
                        />
                    </div>

                    <button className="add-property-button" type="submit"><MdAddCircle /> Add Campaign</button>
                    {error && <div className="error-property-missing">{error}</div>}
                </form>
            </div>
            <Footer />
        </div>
    );
}
export default AddCampaign;
