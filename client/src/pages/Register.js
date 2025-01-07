import React, {useState} from 'react';
import Navbar from './Navbar';
import '../layouts/Register.css';
import axios from 'axios'

function Register() {

    const [NewUsername, setNewUsername] = useState("");
    const [NewDNI, setNewDNI] = useState("");
    const [NewPassword, setNewPassword] = useState("");


    const handleSubmit = () => {
        axios.post('http://localhost:3001/UserManager/register', {
            username: NewUsername, 
            DNI: NewDNI,
            password: NewPassword 
        }). then((response) => {
            console.log(response);
        });
    };


    return (
        <div>
            <Navbar />
                <div className="register">
                <div className="title">
                    <h1>Register to your account</h1>
                </div>
                {/*<form action = "">*/}
                    <div className="subtitle">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            /*value={values.username} */
                            placeholder="Enter username" 
                            required pattern="^.{1,10}$"
                            onChange={(e) => {
                                setNewUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className="subtitle">
                        <label htmlFor="DNI">DNI</label>
                        <input 
                            type="text" 
                            id="DNI" 
                            name="DNI" 
                           /* value={values.DNI}*/ 
                            placeholder="Enter DNI" 
                            /*required pattern="^.{1,10}$"*/
                            onChange={(e) => {
                                setNewDNI(e.target.value);
                            }}
                        />
                    </div>
                    <div className="subtitle">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            /*value={values.password}*/
                            placeholder="Enter password"
                            required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,}$"
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button onClick={handleSubmit}>Register</button>
                    {/*<button type="submit">Register</button>*/}
               {/*</form>*/}
            </div>
        </div>
    );
}

export default Register;
