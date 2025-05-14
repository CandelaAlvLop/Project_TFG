import { Link, useNavigate } from 'react-router-dom';
import '../layouts/NavbarIn.css';
import { FaBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";


function NavbarIn() {
    const navigate = useNavigate();

    return (
        <nav className="navbarin">
            <div className="left-navbar">
                <Link to="/dashboard">DATALOG</Link>
            </div>
            <div className="right-navbar">
                <Link to="/campaigns">Campaigns</Link>
                <Link to="/notifications"><FaBell /></Link>
                <IoIosLogOut
                    className="logout"
                    onClick={() => {
                        console.log("User logged out");
                        localStorage.removeItem("user_id");
                        localStorage.removeItem("username");
                        navigate('/');
                    }}
                />
            </div>
        </nav>
    );
}

export default NavbarIn;