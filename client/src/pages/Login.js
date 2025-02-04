import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import '../layouts/Login.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Login() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); //Prevent refreshing
        axios.post('http://localhost:3001/UserManager/login', {
            username: Username, 
            password: Password 
        }).then(() => {
            navigate('/Dashboard'); 
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error during Login");
            }
        });
    /*
    .then((response) => {
            if (response.data.message) {
                setError(response.data.message); //Set error message
            } else {
                navigate('/Dashboard'); 
            }
    });*/ 
    };

    return (
        <div>
            <Navbar />
                {/* Main Content Sidebar Section */}
                <div className="maincontent-login">
                    {/* Sidebar */}
                    <aside className="sidebar-login">
                        <h3>Welcome</h3>
                        <p>Start your journey with us.</p>
                        <h3>Data Sharing</h3>
                        <p>Login to view content</p>
                        <h3>View Your Data</h3>
                        <p>Login to view content</p>
                        <h3>Participate in Campaigns</h3>
                        <p>Login to participate</p>
                        <h3>Information</h3>
                        <a href="/instructions">Instructions</a>
                        <a href="/faq">Frequently Asked Questions</a>
                    </aside>

                    {/* Register and Login access */}
                    <main className="login">
                        <div className="title-login">
                            <h1>Login to your account</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="subtitle-login">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    value={Username}
                                    placeholder="Enter username" 
                                    pattern="^.{3,10}$" 
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required 
                                />
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={Password}
                                    placeholder="Enter password"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,}$" 
                                    //Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required 
                                />
                                <div className="error-login">{error}</div>
                            </div>
                            <button className="button-login" type="submit">Login</button>
                        </form>
                    </main>
                </div>
                {<Footer />}
        </div>
    );
}

export default Login;