import {useEffect, useState} from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";
import "../layouts/Campaigns.css";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";


function Campaigns() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    const [selectedIcons, setSelectedIcons] = useState([]);

    const campaigns = [
        { title: "Awareness on Water Usage", text: "Participating in this campaign, you will not only have access to personalized tools that will help you to optimize your energy consumption, reducing your bills, but you will also contribute to a bigger effort to improve the sustainability of our community.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 3 of December 2024", color: "rgb(240, 232, 255)", icons: [IoWaterOutline] },

        { title: "For the Optimization of Energy Consumption", text: "Participating in this campaign, you will not only have access to personalized tools that will help you to optimize your energy consumption, reducing your bills, but you will also contribute to a bigger effort to improve the sustainability of our community.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 3 of December 2024",  color: "rgb(240, 232, 255)", icons: [FaRegLightbulb] },

        { title: "Efficient Gas Usage", text: "Participating in this campaign, you will be able to share your gas consumption data to receive advice and tools that will help you use gas more efficiently, reducing your costs and supporting environmental sustainability.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 3 of December 2027", color: "rgb(240, 232, 255)", icons: [FaFire] },

        { title: "Water Sustainability", text: "Participating in this campaign, you will be able to donate your water consumption data to access personalized solutions that will help you use water more efficiently, contributing to the conservation of this essential resource.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 4 of April 2025", color: "rgb(200, 172, 253)", icons: [IoWaterOutline, FaRegLightbulb, FaFire] },

        { title: "Responsible Energy Consumption", text: "Participating in this campaign, you will be able to donate your energy consumption data to receive tools and recommendations that will help you consume energy with more responsability and sustainability, optimizing your costs and supporting the reduction of emissions.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 28 of February 2025", color: "rgb(222, 205, 253)", icons: [FaRegLightbulb, FaFire] },

        { title: "Carbon Footprint Reduction", text: "Participating in this campaign, you will not only have access to personalized tools that will help you to optimize your energy consumption, reducing your bills, but you will also contribute to a bigger effort to improve the sustainability of our community.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 30 of March 2026", color: "rgb(200, 172, 253)", icons: [IoWaterOutline, FaFire, FaRegLightbulb] },

        { title: "Home Energy Efficiency", text: "Participating in this campaign, you will be able to donate your energy consumption data to receive analysis and personalized recommendations that will help improving energy efficiency at ypur house, reducing costs and supporting sustainability.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 30 of January 2026", color: "rgb(222, 205, 253)", icons: [IoWaterOutline, FaRegLightbulb] },

        { title: "Optimization of Appliance Use",  text: "Participating in this campaign, you will be able to share yout appliance consumption data to obtain advice and tools that will help you optimize youy energy use, extending their lifespan and reducing energy consumption.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 30 of April 2025", color: "rgb(200, 172, 253)", icons: [IoWaterOutline, FaFire, FaRegLightbulb] },

        { title: "Responsible Water Resource Usage", text: "Participating in this campaign, you will be able to share your water consumption data t0 obtain recommendations and tools that will help you use water more responsibly, promoting conservation and efficiency.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 30 of March 2026", color: "rgb(240, 232, 255)", icons: [IoWaterOutline] },

        { title: "Energy Saving for Electric Mobility", text: "Participating in this campaign, you will be able to donate your consumption data related to electric vehicle charging to receive advice and tools that will help you to optimize the usage of energu in the electrical movility, reducing costs and supporting sustainability.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 30 of January 2026", color: "rgb(240, 232, 255)", icons: [FaRegLightbulb] },

        { title: "Reduction of Energy Consumption During Peak Hours", text: "Participating in this campaign, you will not only have access to personalized tools that will help you to optimize your energy consumption, reducing your bills, but you will also contribute to a bigger effort to improve the sustainability of our community.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 4 of April 2025", color: "rgb(240, 232, 255)", icons: [FaRegLightbulb] },
        
        { title: "Water Consumption Monitoring",  text: "Participating in this campaign, you will be able to donate your water consumption data to access a monitoring platform that will allow you to control and reduce your consume, preserving this essential resource.",
          dates: "Data between 2020 to 2023", endDate: "Ends: 30 of March 2026", color: "rgb(240, 232, 255)", icons: [IoWaterOutline] }
    ]

    function iconSelection(value) {
        if (selectedIcons.includes(value)) {setSelectedIcons(selectedIcons.filter(icons => icons !== value));} //Remove element from the new array
        else {setSelectedIcons([...selectedIcons, value]);} //Add element to the new array
    }

    function iconSelectionCSS (icons) {
        if (selectedIcons.includes(icons)) return "icon-select selected";
        else return "icon-select";
    }

    let filter = [];
    if (selectedIcons.length === 0) filter = campaigns;
    else {
        for (let i = 0; i < campaigns.length; i++) {
            let campaign = campaigns[i];
            for (let j = 0; j < campaign.icons.length; j++) {
                if (selectedIcons.includes(campaign.icons[j])) {
                    filter.push(campaign);
                    break;
                }
            }
        }
    }

    return (
        <div>
            <Navbar />
            <Navbar2 />
                <h1 className="campaigns-data">Campaigns</h1>
                <div className="icon-filter">
                    <span onClick={() => iconSelection(IoWaterOutline)} className={iconSelectionCSS(IoWaterOutline)}><IoWaterOutline /></span>
                    <span onClick={() => iconSelection(FaFire)} className={iconSelectionCSS(FaFire)}><FaFire /></span>
                    <span onClick={() => iconSelection(FaRegLightbulb)} className={iconSelectionCSS(FaRegLightbulb)}><FaRegLightbulb /></span>
                </div>
                <div className="campaigns">
                    {filter.map((campaign, i) => (
                        <div key={i} className="campaigns-input" style={{backgroundColor: campaign.color}}>
                            <div className="campaigns-icons"> {campaign.icons.map((Icon, j) => (<Icon key={j}/>))}</div>
                            <h2>{campaign.title}</h2>
                            <p>{campaign.text}</p>
                            <div className="campaigns-input-date">
                                <p ><strong>{campaign.dates}</strong></p>
                                <p><strong>{campaign.endDate}</strong></p>
                            </div>
                            <div className="campaigns-view-more"> <p>View more</p> </div>
                        </div>
                    ))}
                </div>
            <Footer />
        </div>
    );
}

export default Campaigns;