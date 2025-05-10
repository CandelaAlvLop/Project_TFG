import { Link } from 'react-router-dom';
import '../layouts/NavbarStart.css';


function NavbarStart() {
    return (
        <nav className="navbarstart">
            <Link to="/" className="logo">DATALOG</Link> 
        </nav>
    );
}

export default NavbarStart;
