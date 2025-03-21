/*import React, {useEffect} from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";

function DataDonation() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <h1>Data Donation</h1>
            <Footer />
        </div>
    );
}

export default DataDonation;*/
import React, { useState } from 'react';
import Navbar from './NavbarIn';
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import DonationContract from './DonationContract';
import ModifyConsents from './ModifyConsents';
import ProvideData from './ProvideData';
import '../layouts/DataDonation.css';

function DataDonation() {
    const [selectedType, setSelectedType] = useState("water");
    const [view, setView] = useState("contract");

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="data-donation">
                <h1>Data Donation Management</h1>
                
                <div className="donation-selection">
                    <button onClick={() => { setSelectedType("water"); setView("contract"); }} className={selectedType === "water" ? "active" : ""}>Water</button>
                    <button onClick={() => { setSelectedType("gas"); setView("contract"); }} className={selectedType === "gas" ? "active" : ""}>Gas</button>
                    <button onClick={() => { setSelectedType("electricity"); setView("contract"); }} className={selectedType === "electricity" ? "active" : ""}>Electricity</button>
                </div>

                <div className="donation-section">
                    {view === "contract" && <DonationContract type={selectedType} setView={setView} />}
                    {view === "modifyConsents" && <ModifyConsents type={selectedType} />}
                    {view === "provideData" && <ProvideData type={selectedType} />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DataDonation;
