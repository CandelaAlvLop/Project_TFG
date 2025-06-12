import { useEffect } from "react";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import "../layouts/Faq.css";


function FaqInside() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <h1 className="dashboard-title">Data Control Center</h1>
            <h2 className="dashboard-subtitle">Track your resource usage, contribute your data, and engage in sustainability campaigns</h2>

            <div className="maincontent-dashboard">
                {/* Sidebar */}
                <div className="sidebar-dashboard">
                    <h3>Information</h3>
                    <a href="/faqinside">Frequently Asked Questions</a>
                    <h3>Upload Data</h3>
                    <a href="/datadonation"> Upload your utility consumption data</a>
                    <h3>View Your Data</h3>
                    <a href="/myconsume">View your utility consumption data</a>
                    <h3>Access your Personal Data</h3>
                    <a href="/personaldata">View and edit your personal data</a>
                    <h3>Add Property</h3>
                    <a href="/addproperty">Start registering your properties</a>
                </div>

                {/* Register and Login access */}
                <div className="main-dashboard">
                    <div className="questions">
                        <h3>Frequently Asked Questions</h3>
                        <h1>Do you have Questions?</h1>
                        <h2>From who is the data?</h2>
                        <p>Consumption data belongs to each consumer, which is why you can decide who to grant access to and authorize reuse for a common good.</p>
                        <h2>Why claim your data?</h2>
                        <p>Because consumption data is not prepared to be reused and to unlock its potential.</p>
                        <h2>What do I get in return for authorizing access?</h2>
                        <p>You can decide what to do with the data, participating in citizen science or research campaigns, or measure and compare your own consumption.</p>
                        <h2>Why do I need to be the service holder?</h2>
                        <p>Because the data belongs to the holder of the supply, only the holder can authorize a third party to access the data.</p>
                        <h2>Who can see my data?</h2>
                        <p>Once you've signed the transfer contract, DATALOG will be responsible for protecting your data. After DATALOG receives the data, if you want to share it with a third party, you can request DATALOG to anonymize it and send it to whoever you choose.</p>
                        <h2>Who will protect my data?</h2>
                        <p>DATALOG's goal is to take care of your data and allow you to use it freely. DATALOG is committed to protecting the data.</p>
                        <h2>Why do I have to wait to get the data?</h2>
                        <p>When you sign up, we need to request the distributor to respond to the request and send us the data. According to regulations, the company has up to 30 days to respond after the request.</p>
                        <h4>For additional questions about the data donation process, you can write to us at dpd@datalog.es</h4>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FaqInside;