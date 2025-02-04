import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import '../layouts/Register.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Register() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    const [NewName, setNewName] = useState("");
    const [NewSurname, setNewSurname] = useState("");
    const [NewUsername, setNewUsername] = useState("");
    const [NewDNI, setNewDNI] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [NewType, setNewType] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); //Prevent refreshing
        axios.post('http://localhost:3001/UserManager/register', {
            name: NewName,
            surname: NewSurname,
            username: NewUsername, 
            DNI: NewDNI,
            email: NewEmail,
            password: NewPassword,
            type: NewType
        }).then(() => {
            navigate('/Dashboard'); 
        }).catch((error) => {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            }
        });
    };

    return (
        <div>
            <Navbar />
                <div className="register">
                <div className="title-register">
                    <h1>Create your account</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="subtitle-register">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={NewName}
                            placeholder="Enter name (must start with capital letter)" 
                            //Name must start with a capital letter and be followed by small letters, max 10 letters
                            pattern="^[A-Z][a-z]{1,9}$" 
                            onChange={(e) => {
                                setNewName(e.target.value);
                            }}
                            required 
                        />
                    
                        <label htmlFor="surname">Surname</label>
                        <input 
                            type="text" 
                            id="surname" 
                            name="surname" 
                            value={NewSurname}
                            placeholder="Enter surname (must start with capital letter)" 
                            //Surname must start with a capital letter and be followed by small letters, max 10 letters
                            pattern="^[A-Z][a-z]{1,9}$" 
                            onChange={(e) => {
                                setNewSurname(e.target.value);
                            }}
                            required 
                        />
                    
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={NewUsername}
                            placeholder="Enter username (between 2 and 10 characters)" 
                            //Username between 2 and 10 characters 
                            pattern="^.{2,10}$" 
                            onChange={(e) => {
                                setNewUsername(e.target.value);
                            }}
                            required 
                        />
                    
                        <label htmlFor="DNI">DNI</label>
                        <input 
                            type="text" 
                            id="DNI" 
                            name="DNI" 
                            value={NewDNI} 
                            placeholder="Enter DNI (9 digits and a letter)" 
                            //DNI contains 8 digits and a capital letter
                            pattern="^[0-9]{8}[A-Z]$"
                            onChange={(e) => {
                                setNewDNI(e.target.value);
                            }}
                            required 
                        />
                    
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            value={NewEmail}
                            placeholder="Enter email" 
                            //Email structure
                            pattern="^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,}$" 
                            onChange={(e) => {
                                setNewEmail(e.target.value);
                            }}
                            required 
                        />
                    
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={NewPassword}
                            placeholder="Enter password (minimum 6 characters)"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,}$" 
                            //Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                            }}
                            required 
                        />
                        <div id="typeField">
			  	            <label class="subtitle-regiser" for="type">Choose type of user</label>
			  	            <select 
                                id="type" 
                                name="type" 
                                value={NewType}
                                onChange={(e) => {
                                    setNewType(e.target.value);
                                }}
                                required>
                                <option value="">Select a type</option>
			  		            <option value="Donor">Donor</option>
					            <option value="Research">Research</option>
					            <option value="Government">Government</option>
					            <option value="Education">Education</option>
                                <option value="Transport">Transport</option>
			  	            </select>
			            </div>

                        <div className="error-register">{error}</div>
                    </div>
                    <button className="button-register" type="submit">Register</button>
               </form>
            </div>
            {<Footer />}
        </div>
    );
}

export default Register;