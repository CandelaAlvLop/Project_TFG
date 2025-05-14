import { useState, useEffect } from 'react';
import NavbarIn2 from './NavbarIn2';
import Navbar3 from './Navbar3';
import Footer from "./Footer";
import '../layouts/AddProperty.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";


function EditCampaign() {
    useEffect(() => {
        window.scrollTo(0, 0);
        setUserCampaign();
        //eslint-disable-next-line
    }, []);

    const campaignName_Pattern = /^[A-Z][a-zA-Z0-9\s]{0,14}$/;
    const [NewCampaignName, setNewCampaignName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const campaignId = localStorage.getItem("campaign_id");
    const userId = localStorage.getItem("user_id");

    function setUserCampaign() {
        if (!campaignId) return console.error("No Campaign retrieved");
        axios.get(`http://localhost:3001/CampaignManager/campaignsUpdate/${campaignId}`)
            .then((response) => {
                setNewCampaignName(response.data.campaignName);
            })
            .catch((error) => {
                console.error("Error retrieving Campaign data:", error);
            });
    };

    function editCampaignData(e) {
        e.preventDefault();

        axios.put(`http://localhost:3001/CampaignManager/campaignsUpdate/${campaignId}`, {
            userId,
            campaignName: NewCampaignName,
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

    return (
        <div>
            <NavbarIn2 />
            <Navbar3 />
            <div className="add-property">
                <h1>Campaign Information</h1>
                <form onSubmit={editCampaignData}>
                    <h2>Place</h2>
                    <div className="section">
                        <label htmlFor="propertyName">Name of the campaign</label>
                        <input type="text" id="propertyName" name="propertyName" value={NewCampaignName} placeholder="Name of the campaign" required
                            //Campaign name must start with a capital letter and be followed by small letters, max 10 letters
                            onInvalid={(e) => e.target.setCustomValidity("Campaign name must start with a capital letter and be followed by small letters, max 15 letters")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!campaignName_Pattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Campaign name must start with a capital letter and be followed by small letters, max 15 letters");
                                }
                            }}
                            onChange={(e) => setNewCampaignName(e.target.value)}
                        />     
                    </div>

                    {error && <div className="error-property-missing">{error}</div>}
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
