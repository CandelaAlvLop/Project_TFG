import { Link, useNavigate } from "react-router-dom";
import "../layouts/NavbarIn.css";
import { FaBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";


function NavbarIn2() {
    const navigate = useNavigate();

    return (
        <nav className="navbarin">
            <div className="left-navbar">
                <Link to="/dashboard2">DATALOG</Link>
            </div>
            <div className="right-navbar">
                <Link to="/campaigns">Campaigns</Link>
                <Link to="/notifications2"><FaBell /></Link>
                <IoIosLogOut
                    className="logout"
                    onClick={() => {
                        localStorage.removeItem("user_id");
                        localStorage.removeItem("username");
                        localStorage.removeItem("type");
                        navigate("/");
                    }}
                />
            </div>
        </nav>
    );
}

export default NavbarIn2;