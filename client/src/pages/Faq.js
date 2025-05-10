import { useEffect } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../layouts/Faq.css";
import Drawing from "../images/drawing-mainpage.png";


function Faq() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    return (
        <div>
            <Navbar />
            {/*Header Section*/}
            <section className="header-mainpage">
                <h1>Claim Your Data!</h1>
                <p>Follow the steps and help us build a better city. Complete the form to complete the process.
                </p>
                <p>If you have any questions, you can always email us at info@datalog.com</p>
                <img src={Drawing} alt="Data Visualization" />
            </section>

             {/* Main Content Sidebar Section */}
             <div className="maincontent-mainpage">
                {/* Sidebar */}
                <div className="sidebar-mainpage">
                    <h3>Welcome</h3>
                    <a href="/register">Start your journey with us</a>
                    <h3>Data Sharing</h3>
                    <a href="/login">Login to view content</a>
                    <h3>View Your Data</h3>
                    <a href="/login">Login to view content</a>
                    <h3>Participate in Campaigns</h3>
                    <a href="/login">Login to participate</a>
                    <h3>Information</h3>
                    <a href="/instructions">Instructions</a>
                    <a href="/faq">Frequently Asked Questions</a>
                </div>

                {/* Register and Login access */}
                <div className="access-mainpage">
                    <div className="questions">
                        <h3>Frequently Asked Questions</h3>
                        <h1>Do you have Questions?</h1>
                        <h2>From who is the data?</h2>
                        <p>Consumption data belongs to each consumer, which is why you can decide who to grant access to and authorize to reuse for a common good.</p>
                        <h2>Why claim your data?</h2>
                        <p>Because consumption data is not prepared to be reused and to unlock its potential.</p>
                        <h2>What do I get in return for authorizing access?</h2>
                        <p>You can decide what to do with the data, participating in citizen science or research campaigns, or measure and compare your own consumption.</p>
                        <h2>Why do I need to be the service holder?</h2>
                        <p>Because the data belongs to the holder of the supply, only the holder can authorize a third party to access the data.</p>
                        <h2>Who can see my data?</h2>
                        <p>Once you’ve signed the transfer contract, DATALOG will be responsible for protecting your data. After DATALOG receives the data, if you want to share it with a third party, you can request DATALOG to anonymize it and send it to whoever you choose.</p>
                        <h2>Who will protect my data?</h2>
                        <p>DATALOG’s goal is to take care of your data and allow you to use it freely. DATALOG is committed to protecting the data.</p>
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

export default Faq;