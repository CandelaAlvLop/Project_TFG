import { useState, useEffect } from 'react';
import NavbarIn2 from './NavbarIn2';
import Navbar3 from './Navbar3';
import Footer from "./Footer";
import '../layouts/AddCampaign.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";


function EditCampaign() {
    useEffect(() => {
        window.scrollTo(0, 0);
        setUserCampaign();
        //eslint-disable-next-line
    }, []);

    const campaignName_Pattern = /^[A-Z][a-zA-Z0-9\s]{0,39}$/;
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

    const campaignId = localStorage.getItem("campaign_id");
    const userId = localStorage.getItem("user_id");

    function setUserCampaign() {
        if (!campaignId) return console.error("No Campaign retrieved");
        axios.get(`http://localhost:3001/CampaignManager/campaignsUpdate/${campaignId}`)
            .then((response) => {
                setNewCampaignName(response.data.campaignName);
                setNewDescription(response.data.description);
                setNewDates(response.data.dates);
                setNewEndDate(response.data.endDate);
                setNewRetainDate(response.data.retainDate);
                setNewType(response.data.type.split(","));
                setNewTitleObjective1(response.data.titleObjective1);
                setNewDescriptionObjective1(response.data.descriptionObjective1);
                setNewTitleObjective2(response.data.titleObjective2);
                setNewDescriptionObjective2(response.data.descriptionObjective2);
                setNewTitleObjective3(response.data.titleObjective3);
                setNewDescriptionObjective3(response.data.description3);
                setNewTitleObjective4(response.data.titleObjective4);
                setNewDescriptionObjective4(response.data.description4);
                setNewStep1(response.data.step1);
                setNewStep2(response.data.step2);
                setNewStep3(response.data.step3);
                setNewWhyJoin(response.data.whyJoin);
                setNewMoreInfo(response.data.moreInfo);
                setNewConclusionSentence(response.data.conclusionSentence);
            })
            .catch((error) => {
                console.error("Error retrieving Campaign data:", error);
            });
    };

    function editCampaignData(e) {
        e.preventDefault();

        if (NewType.length === 0) {
            setError("You must select at least one utility (Water, Gas, Electric).");
            return;
        }

        axios.put(`http://localhost:3001/CampaignManager/campaignsUpdate/${campaignId}`, {
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
        }).then((response) => {
            console.log("Campaign ID updated:", response.data.campaignId);
            setUserCampaign();
            navigate('/mycampaigns');
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error during Campaign data update");
            }
        });
    };

    function cancelEditCampaignData() {
        localStorage.removeItem("campaign_id");
        navigate('/mycampaigns');
    }

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
            <div className="add-campaign">
                <h1>Campaign Information</h1>
                <form onSubmit={editCampaignData}>
                    <h2>General Information</h2>
                    <div className="section">
                        <h3>Name of the Campaign</h3>
                        <input type="text" id="campaignName" name="campaignName" value={NewCampaignName} placeholder="Name of the campaign" required
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
                        <h3>Campaign Description</h3>
                        <input type="text" id="description" name="description" value={NewDescription} placeholder="Small description of the campaign" required
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <h3>Dates data must be from</h3>
                        <input type="text" id="dates" name="dates" value={NewDates} placeholder="Date range of data (e.g. Data beetween 2020 and 2023)" required
                            onChange={(e) => setNewDates(e.target.value)}
                        />
                        <h3>End Date</h3>
                        <input type="text" id="endDate" name="endDate" value={NewEndDate} placeholder="Last day to join the campaign" required
                            onChange={(e) => setNewEndDate(e.target.value)}
                        />
                        <h3>Date of end of data retain</h3>
                        <input type="text" id="retainDate" name="retainDate" value={NewRetainDate} placeholder="Until when is data retained" required
                            onChange={(e) => setNewRetainDate(e.target.value)}
                        />
                        <div className="icon-filter-mycampaigns">
                            <h3>Utilities requested</h3>
                            <span onClick={() => typeSelection("Water")} className={typeSelectionCSS("Water")}><IoWaterOutline /></span>
                            <span onClick={() => typeSelection("Gas")} className={typeSelectionCSS("Gas")}><FaFire /></span>
                            <span onClick={() => typeSelection("Electric")} className={typeSelectionCSS("Electric")}><FaRegLightbulb /></span>
                        </div>
                    </div>

                    <h2>Objectives</h2>
                    <div className="section">
                        <div className="objective">
                            <h3>Objective Title</h3>
                            <input type="text" id="titleObjective1" name="titleOjective1" value={NewTitleObjective1} placeholder="Objective Title" required
                                onChange={(e) => setNewTitleObjective1(e.target.value)}
                            />
                            <h3>Objective Description</h3>
                            <input type="text" id="descriptionObjective1" name="descriptionOjective1" value={NewDescriptionObjective1} placeholder="Objective Description" required
                                onChange={(e) => setNewDescriptionObjective1(e.target.value)}
                            />
                        </div>
                        <div className="objective">
                            <h3>Objective Title</h3>
                            <input type="text" id="titleObjective2" name="titleOjective2" value={NewTitleObjective2} placeholder="Objective Title" required
                                onChange={(e) => setNewTitleObjective2(e.target.value)}
                            />
                            <h3>Objective Description</h3>
                            <input type="text" id="descriptionObjective2" name="descriptionOjective2" value={NewDescriptionObjective2} placeholder="Objective Description" required
                                onChange={(e) => setNewDescriptionObjective2(e.target.value)}
                            />
                        </div>
                        <div className="objective">
                            <h3>Objective Title</h3>
                            <input type="text" id="titleObjective3" name="titleOjective3" value={NewTitleObjective3} placeholder="Objective Title" required
                                onChange={(e) => setNewTitleObjective3(e.target.value)}
                            />
                            <h3>Objective Description</h3>
                            <input type="text" id="descriptionObjective3" name="descriptionOjective3" value={NewDescriptionObjective3} placeholder="Objective Description" required
                                onChange={(e) => setNewDescriptionObjective3(e.target.value)}
                            />
                        </div>
                        <div className="objective">
                            <h3>Objective Title</h3>
                            <input type="text" id="titleObjective4" name="titleOjective4" value={NewTitleObjective4} placeholder="Objective Title" required
                                onChange={(e) => setNewTitleObjective4(e.target.value)}
                            />
                            <h3>Objective Description</h3>
                            <input type="text" id="descriptionObjective4" name="descriptionOjective4" value={NewDescriptionObjective4} placeholder="Objective Description" required
                                onChange={(e) => setNewDescriptionObjective4(e.target.value)}
                            />
                        </div>
                    </div>

                    <h2>How does the Campaign Work</h2>
                    <div className="section">
                        <h3>Step 1</h3>
                        <input type="text" id="step1" name="step1" value={NewStep1} placeholder="Small description about the campaign steps" required
                            onChange={(e) => setNewStep1(e.target.value)}
                        />
                        <h3>Step 2</h3>
                        <input type="text" id="step2" name="step2" value={NewStep2} placeholder="Small description about the campaign steps" required
                            onChange={(e) => setNewStep2(e.target.value)}
                        />
                        <h3>Step 3</h3>
                        <input type="text" id="step3" name="step3" value={NewStep3} placeholder="Small description about the campaign steps" required
                            onChange={(e) => setNewStep3(e.target.value)}
                        />
                    </div>

                    <h2>Additional Information</h2>
                    <div className="section">
                        <h3>Why Join The Campaign?</h3>
                        <input type="text" id="whyJoin" name="whyJoin" value={NewWhyJoin} placeholder="Description about reasons to join the campaign" required
                            onChange={(e) => setNewWhyJoin(e.target.value)}
                        />
                        <h3>More Information</h3>
                        <input type="text" id="moreInfo" name="moreInfo" value={NewMoreInfo} placeholder="More information on the campaign and the organization" required
                            onChange={(e) => setNewMoreInfo(e.target.value)}
                        />
                        <h3>Small final Conclusion Sentence</h3>
                        <input type="text" id="conclusionSentence" name="conclusionSentence" value={NewConclusionSentence} placeholder="Small final conclusion sentence" required
                            onChange={(e) => setNewConclusionSentence(e.target.value)}
                        />
                    </div>

                    {error && <div className="error-campaign-missing">{error}</div>}
                    <div>
                        <button type="submit" className="save"><CiSaveDown2 /> Save</button>
                        <button type="button" className="cancel" onClick={cancelEditCampaignData}><MdCancel /> Cancel</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
export default EditCampaign;
