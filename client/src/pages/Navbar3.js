import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";


function Navbar3() {
    return (
        <div>
            <nav className="navbar-dashboard">
                <Link to="/dashboard2"><FaHome /></Link>
                <Link to="/personaldata2" className="personaldata2">Personal Data</Link>
                <Link to="/mycampaigns" className="mycampaigns">My Campaigns</Link>
            </nav>
        </div>
    );
}

export default Navbar3;