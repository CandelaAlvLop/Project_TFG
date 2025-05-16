import { useEffect, useState } from 'react';
import Footer from './Footer';
import NavbarIn2 from './NavbarIn2';
import Navbar3 from "./Navbar3";
import "../layouts/ViewCampaign.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoWaterOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";


function ViewCampaigns() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            <NavbarIn2 />
            <Navbar3 />
            <button type="button" className="back-button" onClick={() => navigate('/campaigns')}><IoMdArrowRoundBack /> Back</button>
            <h1>Campaign Visualization</h1>
            <Footer />
        </div>
    );
}

export default ViewCampaigns;