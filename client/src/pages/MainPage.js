import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarStart from "./NavbarStart";
import Footer from "./Footer";
import "../layouts/MainPage.css";
import Drawing from "../images/drawing-mainpage.png";


function MainPage() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            <NavbarStart />
            {/*Header Section*/}
            <div className="header-mainpage">
                <h1>Claim Your Data!</h1>
                <p>Follow the steps and help us build a better city. Complete the form to complete the process.</p>
                <p>If you have any questions, you can always email us at info@datalog.com</p>
                <img src={Drawing} alt="Data Visualization" />
            </div>

            <div className="maincontent-mainpage">
                {/* Sidebar */}
                <div className="sidebar-mainpage">
                    <h3>Welcome</h3>
                    <a href="/register">Start your journey with us</a>
                    <h3>Information</h3>
                    <a href="/instructions">Instructions</a>
                    <a href="/faq">Frequently Asked Questions</a>
                    <h3>Upload and View Your Data</h3>
                    <a href="/login">Login to view content</a>
                    <h3>Participate in Campaigns</h3>
                    <a href="/login">Login to participate</a>
                </div>

                {/* Register and Login access */}
                <div className="access-mainpage">
                    <h2>Start the process!</h2>
                    <div className="buttons-mainpage">
                        <button className="register" onClick={() => navigate("/register")}>Register</button>
                        <button className="login" onClick={() => navigate("/login")}>Login</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;