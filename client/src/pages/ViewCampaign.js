import { useEffect, useState } from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";
import NavbarIn2 from './NavbarIn2';
import Navbar3 from "./Navbar3";
import "../layouts/ViewCampaign.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import Objective1 from "../images/Objective1.png";
import Objective2 from "../images/Objective2.png";
import Objective3 from "../images/Objective3.png";
import Objective4 from "../images/Objective4.png";
import ViewCampaignIcon from "../images/ViewCampaignIcon.png";


function ViewCampaigns() {

    const [campaign, setCampaign] = useState([]);

    const campaignId = localStorage.getItem("campaign_id");
    const userType = localStorage.getItem("type");

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!campaignId) return console.error("No Campaign retrieved");
        axios.get(`http://localhost:3001/CampaignManager/campaignsUpdate/${campaignId}`)
            .then((response) => {
                setCampaign(response.data);
                console.log("Fetched campaign ID from localStorage:", campaignId);

            }).catch((error) => {
                console.error("Error retrieving Camapign data:", error);
            });
    }, []);

    function navbars() {
        if (userType === "Donor") return (<> <Navbar /> <Navbar2 /></>);
        else return (<> <NavbarIn2 /> <Navbar3 /></>);
    }

    return (
        <div>
            {navbars()}
            <div key={campaign.campaign_id}>
                <div className="header-campaign">
                    <button type="button" className="button-back" onClick={() => navigate('/campaigns')}><IoMdArrowRoundBack /> Back</button>
                    {(() => {
                        let typeIcons = [];
                        if (campaign.type) {
                            const types = campaign.type.split(",");
                            if (types.includes("Water")) typeIcons.push(<IoWaterOutline />);
                            if (types.includes("Electric")) typeIcons.push(<FaRegLightbulb />);
                            if (types.includes("Gas")) typeIcons.push(<FaFire />);
                        }
                        return <div className="campaign-icon-2">{typeIcons}</div>
                    })()}

                    <h1>{campaign.campaignName}</h1>
                    <h2>Help transform our community with your data</h2>
                    <button className="join-campaign-button" type="submit"><MdAddCircle /> Join Campaign</button>
                </div>

                <div className="campaign-content">

                    <p className="campaign-description">{campaign.description}</p>

                    <div className="campaign-input-date">
                        <p><strong>{campaign.dates}</strong> </p>
                        <p><strong>Ends:</strong> {campaign.endDate}</p>
                        <p><strong>Data retained until:</strong> {campaign.retainDate}</p>
                    </div>

                    <h2>Objectives of our Campaign</h2>
                    <div className="campaign-objectives">
                        <div className="objective">
                            <img src={Objective1} alt="Objective 1" />
                            <h3>{campaign.titleObjective1} </h3> <p>{campaign.descriptionObjective1}</p>
                        </div>
                        <div className="objective">
                            <img src={Objective2} alt="Objective 2" />
                            <h3>{campaign.titleObjective2}</h3> <p>{campaign.descriptionObjective2}</p>
                        </div>
                        <div className="objective">
                            <img src={Objective3} alt="Objective 3" />
                            <h3>{campaign.titleObjective3} </h3> <p>{campaign.descriptionObjective3}</p>
                        </div>
                        <div className="objective">
                            <img src={Objective4} alt="Objective 4" />
                            <h3>{campaign.titleObjective4}</h3> <p>{campaign.descriptionObjective4}</p>
                        </div>
                    </div>

                    <h2>How does the campaign work</h2>
                    <div className="campaign-steps">
                        <div className="step"> <h3>Step 1</h3>  <p>{campaign.step1}</p> </div>
                        <div className="step"> <h3>Step 2</h3> <p>{campaign.step2}</p> </div>
                        <div className="step"> <h3>Step 3</h3> <p>{campaign.step3}</p> </div>
                    </div>

                    <h2>Transfer of data to campaigns</h2>
                    <div className="campaign-data-transfer">
                        <div className="data-transfer"> <h3>1</h3><p>Your data collected in Datalog will be donate to this Campaign</p> </div>
                        <div className="data-transfer"> <h3>2</h3><p>Privacy and security of data will still be protected as it is with us</p> </div>
                        <div className="data-transfer"> <h3>3</h3><p>You will be able to stay up to date with the advances of the campaign in the section My Campaigns</p> </div>
                        <div className="data-transfer"> <h3>4</h3><p>Once the campaign ends, you will be notified and your data will stop being shared automatically with the campaign</p> </div>
                    </div>

                    <div className="campaign-section">
                        <div className="campaign-section-text">
                            <h2>Why Join the Campaign?</h2> <p>{campaign.whyJoin}</p>
                            <h2>More Information</h2> <p>{campaign.moreInfo}</p>
                        </div>
                        <img src={ViewCampaignIcon} alt="Icon" />
                    </div>

                    <div className="campaign-conclusion"> <h3>{campaign.conclusionSentence} </h3> </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default ViewCampaigns;