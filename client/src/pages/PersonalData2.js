import { useState, useEffect } from 'react';
import NavbarIn2 from './NavbarIn2';
import Navbar3 from './Navbar3';
import Footer from "./Footer";
import '../layouts/PersonalData.css';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


function PersonalData2() {
    useEffect(() => {
        window.scrollTo(0, 0);
        setUserData();
        //eslint-disable-next-line
    }, []);

    // ------------------------------- USER DATA -------------------------------
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
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState("");

    const userId = localStorage.getItem("user_id");

    //Get User Data
    function setUserData() {
        if (!userId) return console.error("No User retrieved");
        axios.get(`http://localhost:3001/UserManager/userUpdate/${userId}`)
            .then((response) => {
                setNewName(response.data.name);
                setNewSurname(response.data.surname);
                setNewUsername(response.data.username);
                setNewDNI(response.data.DNI);
                setNewEmail(response.data.email);
                setNewPassword(response.data.password);
                setNewType(response.data.type);
            }).catch((error) => {
                console.error("Error retrieving User data:", error);
            });
    };

    function editUserData(e) {
        e.preventDefault();
        axios.put(`http://localhost:3001/UserManager/userUpdate/${userId}`, {
            name: NewName,
            surname: NewSurname,
            username: NewUsername,
            DNI: NewDNI,
            email: NewEmail,
            password: NewPassword,
            type: NewType
        }).then((response) => {
            console.log("User ID updated:", response.data.userId);
            setEdit(false);
            setUserData();
            setError(""); //Clean Errors
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error during User data update");
            }
        });
    };

    function cancelEditUserData() {
        setEdit(false);
        setUserData();
        setError("");
    }

    function viewPassword() { setSeePassword(!seePassword); }

    return (
        <div>
            <NavbarIn2 />
            <Navbar3 />
            <div className="user-data">
                <h1>Personal Information</h1>
                <form onSubmit={editUserData}>

                    <div className="row">
                        <div className="input">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={NewName}
                                onInvalid={(e) => e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!name_surnamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters");
                                    }
                                }}
                                onChange={(e) => setNewName(e.target.value)}
                                disabled={!edit}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="surname">Surname</label>
                            <input type="text" id="surname" name="surname" value={NewSurname}
                                onInvalid={(e) => e.target.setCustomValidity("Surname must start with a capital letter and be followed by small letters, max 10 letters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!name_surnamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Surname must start with a capital letter and be followed by small letters, max 10 letters");
                                    }
                                }}
                                onChange={(e) => setNewSurname(e.target.value)}
                                disabled={!edit}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={NewUsername}
                                onInvalid={(e) => e.target.setCustomValidity("Username must be between 3 and 10 characters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!usernamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Username must be between 3 and 10 characters");
                                    }
                                }}
                                onChange={(e) => setNewUsername(e.target.value)}
                                disabled={!edit}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="DNI">DNI</label>
                            <input type="text" id="DNI" name="DNI" value={NewDNI}
                                onInvalid={(e) => e.target.setCustomValidity("DNI must contain 8 digits and a capital letter")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!DNIPattern.test(e.target.value)) {
                                        e.target.setCustomValidity("DNI must contain 8 digits and a capital letter");
                                    }
                                }}
                                onChange={(e) => setNewDNI(e.target.value)}
                                disabled={!edit}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" value={NewEmail}
                                onInvalid={(e) => e.target.setCustomValidity("Not a valid email address")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!emailPattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Not a valid email address");
                                    }
                                }}
                                onChange={(e) => setNewEmail(e.target.value)}
                                disabled={!edit}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="password">Password</label>
                            <div className="password-see">
                                <input type={(seePassword && "text") || "password"} id="password" name="password" value={NewPassword}
                                    onInvalid={(e) => e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character")}
                                    onInput={(e) => {
                                        e.target.setCustomValidity("");
                                        if (!passwordPattern.test(e.target.value)) {
                                            e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character");
                                        }
                                    }}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={!edit}
                                />
                                <span onClick={viewPassword} className="password-eye">{(seePassword && <IoEyeOff />) || <IoEye />}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input">
                            <label htmlFor="type">User Type</label>
                            <select id="type" name="type" value={NewType}
                                onInvalid={(e) => e.target.setCustomValidity("Select your type of user")}
                                onInput={(e) => e.target.setCustomValidity("")}
                                onChange={(e) => setNewType(e.target.value)}
                                disabled={!edit}
                                required>
                                <option value="">Select a type</option>
                                <option value="Donor">Donor</option>
                                <option value="Research">Research</option>
                                <option value="Government">Government</option>
                                <option value="Education">Education</option>
                                <option value="Transport">Transport</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                    </div>

                    {error && <div className="error-upload">{error}</div>}

                    {edit === false && (<button type="button" className="edit" onClick={() => setEdit(true)}><FaEdit /> Edit</button>)}
                    {edit === true && (
                        <><button type="submit" className="save">Save</button>
                            <button type="button" className="cancel" onClick={cancelEditUserData}>Cancel</button></>
                    )}
                </form>
            </div>

            <Footer />
        </div>
    );
}
export default PersonalData2;

