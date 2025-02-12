import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/NavbarIn.css';
import { FaBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function NavbarIn() {
    return (
        <nav className="navbarin">
            <div className="left-navbar">
                <Link to="/dashboard">DATALOG</Link>
            </div>
            <div className="right-navbar">
                <Link to="/campaigns">Campaigns</Link>
                <Link to="/notifications"><FaBell className="notifications" /></Link>
                <Link to="/"><IoIosLogOut className="logout" /></Link>
            </div>
        </nav>
    );
}

export default NavbarIn;