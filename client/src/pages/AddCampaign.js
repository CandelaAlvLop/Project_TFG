import { useState, useEffect } from 'react';
import NavbarIn2 from './NavbarIn2';
import Navbar3 from './Navbar3';
import Footer from "./Footer";
import '../layouts/AddProperty.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAddCircle } from "react-icons/md";


function AddCampaign() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const campaignName_Pattern = /^[A-Z][a-zA-Z0-9\s]{0,14}$/;
    const [setCampaigns] = useState([]);
    const [NewCampaignName, setNewCampaignName] = useState("");
    
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

        axios.post('http://localhost:3001/CampaignManager/campaigns', {
            userId,
            campaignName: NewCampaignName,
        }).then((response) => {
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

    return (
        <div>
            <NavbarIn2 />
            <Navbar3 />
            <div className="add-property">
                <h1>Campaign Information</h1>
                <form onSubmit={addCampaign}>

                    <h2>Information</h2>
                    <div className="section">
                        <label htmlFor="propertyName">Name of the Campaign</label>
                        <input type="text" id="propertyName" name="propertyName" value={NewCampaignName} placeholder="Name of the campaign" required
                            //Property name must start with a capital letter and be followed by small letters, max 10 letters
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
                    <button className="add-property-button" type="submit"><MdAddCircle /> Add Campaign</button>
                    {error && <div className="error-property-missing">{error}</div>}
                </form>
            </div>
            <Footer />
        </div>
    );
}
export default AddCampaign;
