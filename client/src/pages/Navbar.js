import { Link } from "react-router-dom";
import "../layouts/Navbar.css";


function Navbar() {
    return (
        <nav className="navbar2">
            <div className="left-navbar">
                <Link to="/" className="logo">DATALOG</Link>
            </div>
            <div className="right-navbar">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;