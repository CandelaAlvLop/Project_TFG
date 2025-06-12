import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";
import NavbarIn2 from "./NavbarIn2";
import Navbar3 from "./Navbar3";
import Footer from "./Footer";
import "../layouts/Campaigns.css";
import { useNavigate } from "react-router-dom";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";


function Campaigns() {

    const [selectedIcons, setSelectedIcons] = useState([]);
    const [campaigns, setCampaigns] = useState([]);

    const navigate = useNavigate();

    const userType = localStorage.getItem("type");

    useEffect(() => {
        window.scrollTo(0, 0);
        //Get All Campaigns
        axios.get("http://localhost:3001/CampaignManager/campaignsAll")
            .then((response) => {
                setCampaigns(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving Campaigns:", error);
            });
    }, []);

    function iconSelection(value) {
        //If the previosuly selected icon is deselected, a new array is created filtering that value
        if (selectedIcons.includes(value)) { setSelectedIcons(selectedIcons.filter(icons => icons !== value)); }
        //If the icon is selected (is not stored in the array), the value is added to the array
        else { setSelectedIcons([...selectedIcons, value]); }
    }

    //CSS for icon selection and deselection
    function iconSelectionCSS(icons) {
        if (selectedIcons.includes(icons)) return "icon-select selected";
        else return "icon-select";
    }

    //Filter campaigns by selected utility consumption icons
    let filter = [];
    if (selectedIcons.length !== 0) {
        for (let i = 0; i < campaigns.length; i++) { //Loop All Campaigns
            const types = campaigns[i].type.split(",");
            for (let j = 0; j < types.length; j++) { //Loop Icons of the Campaign
                if (selectedIcons.includes(types[j])) {
                    filter.push(campaigns[i]);
                    break
                }
            }
        }
    } else { filter = campaigns; } //No Icon Selected = Show All Campaigns

    function navbars() {
        if (userType === "Donor") return (<> <Navbar /> <Navbar2 /></>);
        else return (<> <NavbarIn2 /> <Navbar3 /></>);
    }

    return (
        <div>
            {navbars()}
            <h1 className="campaigns-title">Join Campaigns!</h1>
            <div className="icon-filter">
                <span onClick={() => iconSelection("Water")} className={iconSelectionCSS("Water")}><IoWaterOutline /></span>
                <span onClick={() => iconSelection("Electric")} className={iconSelectionCSS("Electric")}><FaRegLightbulb /></span>
                <span onClick={() => iconSelection("Gas")} className={iconSelectionCSS("Gas")}><FaFire /></span>
            </div>

            <div className="campaigns">
                {filter.map((campaign) => (
                    <div key={campaign.campaign_id} className="campaign-input" onClick={() => { localStorage.setItem("campaign_id", campaign.campaign_id); navigate("/viewcampaign") }}> {/*View detailed information for a specific*/}
                        {(() => {
                            let typeIcons = [];
                            //Get campaign utility icons
                            if (campaign.type) {
                                const types = campaign.type.split(",");
                                if (types.includes("Water")) typeIcons.push(<IoWaterOutline />);
                                if (types.includes("Electric")) typeIcons.push(<FaRegLightbulb />);
                                if (types.includes("Gas")) typeIcons.push(<FaFire />);
                            }
                            return <div className="campaign-icon">{typeIcons}</div>
                        })()}
                        <div className="campaign-name">{campaign.campaignName}</div>
                        <div className="campaign-information">
                            <p>{campaign.description}</p>
                            <div className="campaign-input-date">
                                <p><strong>{campaign.dates}</strong> </p>
                                <p><strong>Ends:</strong> {campaign.endDate}</p>
                            </div>
                        </div>
                        <div className="campaigns-view-more"><p>Acces to view more</p></div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Campaigns;