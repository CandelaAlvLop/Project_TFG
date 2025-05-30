import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import '../layouts/Register.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


function Register() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const name_surnamePattern = /^[A-Z][a-z]{1,9}$/;
    const usernamePattern = /^.{3,10}$/;
    const DNIPattern = /^[0-9]{8}[A-Z]$/;
    const emailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[\S]{6,}$/;

    const [NewName, setNewName] = useState("");
    const [NewSurname, setNewSurname] = useState("");
    const [NewUsername, setNewUsername] = useState("");
    const [NewDNI, setNewDNI] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [NewType, setNewType] = useState("");

    const [seePassword, setSeePassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function registerUser(e) {
        e.preventDefault(); //Prevent refreshing
        axios.post('http://localhost:3001/UserManager/register', {
            name: NewName,
            surname: NewSurname,
            username: NewUsername,
            DNI: NewDNI,
            email: NewEmail,
            password: NewPassword,
            type: NewType
        }).then((response) => {
            localStorage.setItem("user_id", response.data.userId); //Store user ID
            localStorage.setItem("type", response.data.type);

            console.log("User ID stored after registration:", response.data.userId);

            if (response.data.type === "Donor") {
                navigate("/dashboard");
            } else {
                navigate("/dashboard2")
            }
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error during Register");
            }
        });
    };

    function viewPassword() { setSeePassword(!seePassword); }

    return (
        <div>
            <Navbar />
            <div className="register-center">
                <div className="register">
                    <div className="title-register">
                        <h1>Create your account</h1>
                    </div>
                    <form onSubmit={registerUser}>
                        <div className="subtitle-register">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={NewName} placeholder="Enter name (must start with capital letter)" required
                                //Name must start with a capital letter and be followed by small letters, max 10 letters
                                onInvalid={(e) => e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters, and no characters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!name_surnamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters, and no characters");
                                    }
                                }}
                                onChange={(e) => setNewName(e.target.value)}
                            />

                            <label htmlFor="surname">Surname</label>
                            <input type="text" id="surname" name="surname" value={NewSurname} placeholder="Enter surname (must start with capital letter)" required
                                //Surname must start with a capital letter and be followed by small letters, max 10 letters
                                onInvalid={(e) => e.target.setCustomValidity("Surname must start with a capital letter and be followed by small letters, max 10 letters, and no characters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!name_surnamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Surname must start with a capital letter and be followed by small letters, max 10 letters, and no characters");
                                    }
                                }}
                                onChange={(e) => setNewSurname(e.target.value)}
                            />

                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={NewUsername} placeholder="Enter username (between 3 and 10 characters)" required
                                //Username must be between 3 and 10 characters 
                                onInvalid={(e) => e.target.setCustomValidity("Username must be between 3 and 10 characters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!usernamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Username must be between 3 and 10 characters");
                                    }
                                }}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />

                            <label htmlFor="DNI">DNI</label>
                            <input type="text" id="DNI" name="DNI" value={NewDNI} placeholder="Enter DNI (9 digits and a letter)" required
                                //DNI contains 8 digits and a capital letter                           
                                onInvalid={(e) => e.target.setCustomValidity("DNI must contain 8 digits and a capital letter")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!DNIPattern.test(e.target.value)) {
                                        e.target.setCustomValidity("DNI must contain 8 digits and a capital letter");
                                    }
                                }}
                                onChange={(e) => setNewDNI(e.target.value)}
                            />

                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" value={NewEmail} placeholder="Enter email" required
                                //Email structure
                                onInvalid={(e) => e.target.setCustomValidity("Not a valid email address")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!emailPattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Not a valid email address");
                                    }
                                }}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />

                            <label htmlFor="password">Password</label>
                            <div className="password-see">
                                <input type={(seePassword && "text") || "password"} id="password" name="password" value={NewPassword} placeholder="Enter password (minimum 6 characters)" required
                                    //Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character
                                    onInvalid={(e) => e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character")}
                                    onInput={(e) => {
                                        e.target.setCustomValidity("");
                                        if (!passwordPattern.test(e.target.value)) {
                                            e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character");
                                        }
                                    }}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span onClick={viewPassword} className="password-eye">{(seePassword && <IoEyeOff />) || <IoEye />}</span>
                            </div>

                            <label htmlFor="type">Choose type of user</label>
                            <select id="type" name="type" value={NewType} required
                                onInvalid={(e) => e.target.setCustomValidity("Select your type of user")}
                                onInput={(e) => e.target.setCustomValidity("")}
                                onChange={(e) => setNewType(e.target.value)}>
                                <option value="">Select a type</option>
                                <option value="Donor">Donor</option>
                                <option value="Research">Research</option>
                                <option value="Government">Government</option>
                                <option value="Education">Education</option>
                                <option value="Transport">Transport</option>
                                <option value="Business">Business</option>
                            </select>

                            {error && <div className="error-register">{error}</div>}
                        </div>
                        <button className="button-register" type="submit">Register</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;