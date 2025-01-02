//import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Home() {
    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch('/users') //No need to specify localhost:3001 because of the proxy
        .then((response) => response.json())
        .then((data) => { setBackendData(data); }) //Update the data with data from the backend
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {backendData.map((user) => (
                <li key = {user.id}>
                    <strong>{user.name}</strong> - {user.email}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Home;