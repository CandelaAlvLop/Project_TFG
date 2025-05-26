import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";


function Navbar2() {
    return (
        <div>
            <nav className="navbar-dashboard">
                <Link to="/dashboard"><FaHome /></Link>
                <Link to="/personaldata" className="personaldata">Personal Data</Link>
                <Link to="/myconsume" className="myconsume">My Consume</Link>
                <Link to="/datadonation" className="datadonation">Data Upload</Link>
            </nav>
        </div>
    );
}

export default Navbar2;