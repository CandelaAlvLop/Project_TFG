import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/NavbarIn.css';
import { FaHome, FaEllipsisV} from "react-icons/fa";


function NavbarIn() {
    return (
        <nav className="navbarin">
            <div className="left-navbar">
                <Link to="/dashboard"> <FaHome/> DATALOG</Link>
            </div>
            <div className="right-navbar">
                <Link to="/campaigns">Campaigns</Link>
                <Link to="/more">Notifications+Logout  <FaEllipsisV className="more-icon" /></Link>
            </div>
        </nav>
    );
}

export default NavbarIn;