import React, {useEffect, useState} from 'react';
import Navbar from './NavbarIn';
import Footer from './Footer';
import Navbar2 from "./Navbar2";

function Consent() {
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <h1>.</h1>
            <Footer />
        </div>
    );
}

export default Consent;
