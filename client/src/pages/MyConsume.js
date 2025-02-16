import React, {useEffect} from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";

function MyConsume() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <h1>My Consume</h1>
            <Footer />
        </div>
    );
}

export default MyConsume;
