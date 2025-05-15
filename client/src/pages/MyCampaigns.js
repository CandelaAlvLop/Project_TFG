import { useEffect, useState } from 'react';
import Footer from './Footer';
import NavbarIn2 from './NavbarIn2';
import Navbar3 from "./Navbar3";
import "../layouts/MyCampaigns.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAddCircle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function MyCampaigns() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
        setUserCampaigns();
        //eslint-disable-next-line
    }, []);

    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");

    const [campaigns, setCampaigns] = useState([]);

    function setUserCampaigns() {
        if (!userId) return console.error("No User retrieved");
        axios.get(`http://localhost:3001/CampaignManager/campaigns/${userId}`)
            .then((response) => {
                setCampaigns(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving User Campaigns:", error);
            });
    };

    //Delete campiagn
    function deleteCampaign(campaignId) {
        axios.delete(`http://localhost:3001/CampaignManager/campaigns/${campaignId}`)
            .then(() => {
                setCampaigns(campaigns.filter(campaign => campaign.campaign_id !== campaignId));
            })
            .catch((error) => {
                console.error("Unexpected error deleting Campaign", error);
            });
    };

    return (
        <div>
            <NavbarIn2 />
            <Navbar3 />
            <div className="campaigns-data">
                <h1>My Campaigns</h1>
                <div className="campaigns">
                    {campaigns.length > 0 && campaigns.map((campaign) => (
                        <div key={campaigns.campaigns_id} className="campaign-input">
                            <div className="campaign-name">{campaign.campaignName}</div>
                            <div className="campaign-information">
                                <p>{campaign.description}</p>
                                <p><strong>{campaign.dates}</strong> </p>
                                <p><strong>Ends:</strong> {campaign.endDate}</p>
                            </div>
                            <div className="campaign-buttons">
                                <button type="button" className="edit"
                                    onClick={() => {
                                        localStorage.setItem("campaign_id", campaign.campaign_id);
                                        navigate('/editcampaign');
                                    }
                                    }><FaEdit />Edit</button>
                                <button type="button" className="delete" onClick={() => deleteCampaign(campaign.campaign_id)}><RiDeleteBin5Fill /> Delete</button>
                            </div>
                        </div>
                    ))}
                    {campaigns.length === 0 && <p className="no-campaigns">No campaigns launched</p>}
                </div>

                <button className="add-campaign-button" onClick={() => navigate('/addcampaign')}><MdAddCircle /> Add New Campaign</button>
            </div>

            <Footer />
        </div>
    );
}

export default MyCampaigns;
