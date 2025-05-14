import { useEffect } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../layouts/Instructions.css";
import Drawing from "../images/drawing-mainpage.png";


function Instructions() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            {/*Header Section*/}
            <div className="header-mainpage">
                <h1>Claim Your Data!</h1>
                <p>Follow the steps and help us build a better city. Complete the form to complete the process.</p>
                <p>If you have any questions, you can always email us at info@datalog.com</p>
                <img src={Drawing} alt="Data Visualization" />
            </div>

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
                    <div className="instructions">
                        <h3>Instructions</h3>
                        <h1>How does the platform work?</h1>
                        <p>DATALOG offers a platform so you can request your data from the utility companies and view it. To do this, you must sign up on the platform, complete the transfer form, and sign the transfer agreement.</p>
                        <h2>How to Sign up?</h2>
                        <p>Go to the registration form by clicking “Register”.</p>
                        <p>Fill in your personal information:</p>
                        <ul>
                            <li><strong>Name and Surname:</strong> Must start with a capital letter and be no longer than 10 characters.</li>
                            <li><strong>Username:</strong> Between 2 and 10 characters.</li>
                            <li><strong>DNI:</strong> 8 digits followed by an uppercase letter (e.g., 12345678A).</li>
                            <li><strong>Email:</strong> Must be a valid email address.</li>
                            <li><strong>Secure</strong> Password: At least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character.</li>
                        </ul>
                        <p><strong>Select your type of user:</strong> Donor, Research, Government, Education, or Transport.</p>
                        <p>Click <strong>“Register”</strong> to create your account.</p>
                        <p>After registration, you'll be automatically redirected to your personal dashboard to manage your data.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Instructions;