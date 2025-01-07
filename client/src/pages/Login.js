import React, {useState} from 'react';
import Navbar from './Navbar';
import '../layouts/Login.css';
import axios from 'axios'

function Login() {

    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:[e.target.value]})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const response = axios.post('http://localhost:3001/auth/login', values)
            console.log(response)
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <div>
            <Navbar />
                <div className="login">
                <div className="title">
                    <h1>Login to your account</h1>
                </div>
                <form action = "">
                {/*<form action="LoginController" method="POST"> */}
                    <div className="subtitle">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={values.username} 
                            placeholder="Enter username" 
                            required pattern="^.{1,10}$"
                            onChange={handleChanges}/>
                    </div>
                    <div className="subtitle">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={values.password}
                            placeholder="Enter password"
                            required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,}$"
                            onChange={handleChanges} /> 
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
