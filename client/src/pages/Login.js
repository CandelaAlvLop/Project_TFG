import React, {useState} from 'react';
import Navbar from './Navbar';
import '../layouts/Login.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Login() {

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [LoginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        axios.post('http://localhost:3001/UserManager/login', {
            username: Username, 
            password: Password 
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message); //Set error message
            } else {
                navigate('/Dashboard'); 
            }
        });
    };


    return (
        <div>
            <Navbar />
                <div className="login">
                <div className="title">
                    <h1>Login to your account</h1>
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
                                setUsername(e.target.value);
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
                                setPassword(e.target.value);
                            }}
                        />
                        <div className="error">{LoginStatus}</div>
                    </div>
                    <button onClick={handleSubmit}>Login</button>
                    {/*<button type="submit">Login</button>*/}
               {/*</form>*/}
            </div>
        </div>
    );
}

export default Login;
