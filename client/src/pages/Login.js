import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../layouts/Login.css";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


function Login() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const usernamePattern = /^.{3,10}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[\S]{6,}$/;

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const [seePassword, setSeePassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function loginUser(e) {
        e.preventDefault(); //Prevent refreshing
        axios.post("http://localhost:3001/UserManager/login", {
            username: Username,
            password: Password
        }).then((response) => {
            //Store user ID, username and user type
            localStorage.setItem("user_id", response.data.userId);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("type", response.data.type);

            if (response.data.type === "Donor") {
                navigate("/dashboard");
            } else {
                navigate("/dashboard2")
            }
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error during Login");
            }
        });
    };

    function viewPassword() { setSeePassword(!seePassword); }

    return (
        <div>
            <Navbar />
            <div className="maincontent-login">
                {/* Sidebar */}
                <div className="sidebar-login">
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
                <div className="login">
                    <div className="title-login">
                        <h1>Login to your account</h1>
                    </div>
                    <form onSubmit={loginUser}>
                        <div className="subtitle-login">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={Username} placeholder="Enter username" required
                                onInvalid={(e) => e.target.setCustomValidity("Username must be between 3 and 10 characters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!usernamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Username must be between 3 and 10 characters");
                                    }
                                }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                            <div className="password-see-login">
                                <input type={(seePassword && "text") || "password"} id="password" name="password" value={Password} placeholder="Enter password" required
                                    //Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character
                                    onInvalid={(e) => e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character")}
                                    onInput={(e) => {
                                        e.target.setCustomValidity("");
                                        if (!(passwordPattern).test(e.target.value)) {
                                            e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character");
                                        }
                                    }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span onClick={viewPassword} className="password-eye-login">{(seePassword && <IoEyeOff />) || <IoEye />}</span>
                            </div>
                            {error && <div className="error-login">{error}</div>}
                        </div>
                        <button className="button-login" type="submit">Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;