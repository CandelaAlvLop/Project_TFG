import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Navbar.css';


function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">DATALOG</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
