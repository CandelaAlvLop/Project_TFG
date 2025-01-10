//import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function MainPage() {
    /*const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch('/UserManager') //No need to specify localhost:3001 because of the proxy
        .then((response) => response.json())
        .then((data) => { setBackendData(data); }) //Update the data with data from the backend
    }, []);*/

    return (
        <div>
            <Navbar />
            <h1>DATALOG Information</h1>
           {/* <ul>
                {backendData.map((user) => (
                <li key = {user.id}>
                    <strong>{user.name}</strong> - {user.email}
                </li>
                ))}
            </ul>*/}
        </div>
    )
}

export default MainPage;