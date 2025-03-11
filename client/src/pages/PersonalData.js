import React, { useState, useEffect } from 'react';
import Navbar from './NavbarIn';
import Navbar2 from './Navbar2';
import Footer from "./Footer";
import '../layouts/PersonalData.css';
import axios from 'axios';

function PersonalData() {
    useEffect(() => {
        window.scrollTo(0, 0);
        setUserData();
        setUserProperties();
    }, []);

    // ------------------------------- USER DATA -------------------------------
    const name_surnamePattern = /^[A-Z][a-z]{1,9}$/;
    const usernamePattern = /^.{3,10}$/;
    const DNIPattern = /^[0-9]{8}[A-Z]$/;
    const emailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,}$/;

    const [NewName, setNewName] = useState("");
    const [NewSurname, setNewSurname] = useState("");
    const [NewUsername, setNewUsername] = useState("");
    const [NewDNI, setNewDNI] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [NewType, setNewType] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    const userId = localStorage.getItem("user_id");

    //Get User Data
    const setUserData = () => {
        if (!userId) return console.error("No User retrieved");
        axios.get(`http://localhost:3001/UserManager/userUpdate/${userId}`)
            .then((response) => {
                setNewName(response.data.name);
                setNewSurname(response.data.surname);
                setNewUsername(response.data.username);
                setNewDNI(response.data.DNI);
                setNewEmail(response.data.email);
                setNewPassword(response.data.password);
                setNewType(response.data.type);
        }).catch ((error) => {
            console.error("Error retrieving User data:", error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/UserManager/userUpdate/${userId}`, {
            name: NewName,
            surname: NewSurname,
            username: NewUsername,
            DNI: NewDNI,
            email: NewEmail,
            password: NewPassword,
            type: NewType
        }).then((response) => {
            console.log("User ID updated:", response.data.userId);
            setIsEditing(false);
            setUserData();
            setError("");
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error during User data update");
            }
            console.error("Error updating user data:", error);
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUserData(); 
        setError("");
    }


    // ------------------------------- PROPERTY DATA -------------------------------   
    const [properties, setProperties] = useState([]);
    const [editingProperty, setEditingProperty] = useState(null);

    const [NewAddress, setNewAddress] = useState("");
    const [NewZipcode, setNewZipcode] = useState("");
    const [NewNumPeople, setNewNumPeople] = useState("");
    const [NewSquareMeters, setNewSquareMeters] = useState("");
    const [NewRooms, setNewRooms] = useState("");
    const [NewFloors, setNewFloors] = useState("");

    const setUserProperties = () => {
        if (!userId) return console.error("No User retrieved");
        axios.get(`http://localhost:3001/UserManager/properties/${userId}`)
            .then((response) => {
                setProperties(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving User Property data:", error);
            });
    };

    //Add Property
    const addProperty = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/UserManager/properties', {
            userId,
            address: NewAddress,
            zipcode: NewZipcode,
            numpeople: NewNumPeople,
            squaremeters: NewSquareMeters,
            rooms: NewRooms,
            floors: NewFloors
        }).then(() => {
            setUserProperties();
            console.log("Property added successfully");
        }).catch((error) => {
            setError("Unexpected error adding Property");
            console.error("Error adding Property:", error);
        });
    };

    //Edit Property
    const editProperty = (property) => {
        setEditingProperty(property.property_id);
        setNewAddress(property.address);
        setNewZipcode(property.zipcode);
        setNewNumPeople(property.numpeople);
        setNewSquareMeters(property.squaremeters);
        setNewRooms(property.rooms);
        setNewFloors(property.floors);
    };

    const updateProperty = (e) => {
        e.preventDefault();
        if (!editingProperty) return console.error("No Property retrieved");;
        axios.put(`http://localhost:3001/UserManager/properties/${editingProperty}`, {
            address: NewAddress,
            zipcode: NewZipcode,
            numpeople: NewNumPeople,
            squaremeters: NewSquareMeters,
            rooms: NewRooms,
            floors: NewFloors
        }).then(() => {
            alert("Property updated successfully");
            setEditingProperty(null);
            setUserProperties();
        }).catch((error) => {
            setError("Unexpected error updating Property");
            console.error("Error updating Property data:", error);
        });
    };

    //Delete property
    const deleteProperty = (propertyId) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        axios.delete(`http://localhost:3001/UserManager/properties/${propertyId}`)
            .then(() => {
                alert("Property deleted successfully");
                setUserProperties();
            })
            .catch((error) => {
                console.error("Unexpected error deleting Property", error);
            });
    };


    return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="user-data">
                <h1>Personal Information</h1>
                <form onSubmit={handleSubmit}>
                    
                    <div className="row">
                        <div className="input">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={NewName}
                                onInvalid={(e) => e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!name_surnamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters");
                                    }
                                }}
                                onChange={(e) => setNewName(e.target.value)}
                                disabled={!isEditing} 
                            />
                        </div>
                        <div className="input"> 
                            <label htmlFor="surname">Surname</label>
                            <input 
                                type="text" 
                                id="surname" 
                                name="surname" 
                                value={NewSurname}
                                onInvalid={(e) => e.target.setCustomValidity("Surname must start with a capital letter and be followed by small letters, max 10 letters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!name_surnamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Surname must start with a capital letter and be followed by small letters, max 10 letters");
                                    }
                                }}
                                onChange={(e) => setNewSurname(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input">            
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                value={NewUsername}
                                placeholder="Enter username (3-10 characters)"  
                                onInvalid={(e) => e.target.setCustomValidity("Username must be between 3 and 10 characters")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!usernamePattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Username must be between 3 and 10 characters");
                                    }
                                }}
                                onChange={(e) => setNewUsername(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="input"> 
                            <label htmlFor="DNI">DNI</label>
                            <input 
                                type="text" 
                                id="DNI" 
                                name="DNI" 
                                value={NewDNI}
                                placeholder="Enter DNI (8 digits + 1 uppercase letter)" 
                                onInvalid={(e) => e.target.setCustomValidity("DNI must contain 8 digits and a capital letter")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!DNIPattern.test(e.target.value)) {
                                        e.target.setCustomValidity("DNI must contain 8 digits and a capital letter");
                                    }
                                }}
                                onChange={(e) => setNewDNI(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input"> 
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={NewEmail}
                                placeholder="Enter email" 
                                onInvalid={(e) => e.target.setCustomValidity("Not a valid email address")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!emailPattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Not a valid email address");
                                    }
                                }}
                                onChange={(e) => setNewEmail(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={NewPassword}
                                placeholder="Enter password (min. 6 chars, at least 1 uppercase, 1 number, 1 special char)" 
                                onInvalid={(e) => e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character")}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                    if (!passwordPattern.test(e.target.value)) {
                                        e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character");
                                    }
                                }}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input"> 
                            <label htmlFor="type">User Type</label>
                            <select 
                                id="type" 
                                name="type" 
                                value={NewType}
                                onInvalid={(e) => e.target.setCustomValidity("Select your type of user")}
                                onInput={(e) => e.target.setCustomValidity("")}
                                onChange={(e) => setNewType(e.target.value)}
                                disabled={!isEditing}
                                required>
                                <option value="">Select a type</option>
                                <option value="Donor">Donor</option>
                                <option value="Research">Research</option>
                                <option value="Government">Government</option>
                                <option value="Education">Education</option>
                                <option value="Transport">Transport</option>
                            </select>
                        </div>
                    </div>

                    <div className="error-upload">{error}</div>

                    <div className="buttons">
                        {isEditing === false && (<button type="button" className="edit" onClick={() => setIsEditing(true)}>Edit</button>)}
                        {isEditing === true && (
                            <div>
                                <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                                <button type="submit" className="save">Save</button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
    }

    {/*return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="user-data">
                <h1>Edit Your Personal Data</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={NewName}
                        placeholder="Enter name (must start with capital letter)" 
                        onInvalid={(e) => e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters")}
                        onInput={(e) => {
                            e.target.setCustomValidity("");
                            if (!name_surnamePattern.test(e.target.value)) {
                                e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters");
                            }
                        }}
                        onChange={(e) => setNewName(e.target.value)}
                    />

                    <label htmlFor="surname">Surname</label>
                    <input 
                        type="text" 
                        id="surname" 
                        name="surname" 
                        value={NewSurname}
                        placeholder="Enter surname (must start with capital letter)" 
                        onInvalid={(e) => e.target.setCustomValidity("Surname must start with a capital letter and be followed by small letters, max 10 letters")}
                        onInput={(e) => {
                            e.target.setCustomValidity("");
                            if (!name_surnamePattern.test(e.target.value)) {
                                e.target.setCustomValidity("Surname must start with a capital letter and be followed by small letters, max 10 letters");
                            }
                        }}
                        onChange={(e) => setNewSurname(e.target.value)}
                    />

                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={NewUsername}
                        placeholder="Enter username (3-10 characters)"  
                        onInvalid={(e) => e.target.setCustomValidity("Username must be between 3 and 10 characters")}
                        onInput={(e) => {
                            e.target.setCustomValidity("");
                            if (!usernamePattern.test(e.target.value)) {
                                e.target.setCustomValidity("Username must be between 3 and 10 characters");
                            }
                        }}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />

                    <label htmlFor="DNI">DNI</label>
                    <input 
                        type="text" 
                        id="DNI" 
                        name="DNI" 
                        value={NewDNI}
                        placeholder="Enter DNI (8 digits + 1 uppercase letter)" 
                        onInvalid={(e) => e.target.setCustomValidity("DNI must contain 8 digits and a capital letter")}
                        onInput={(e) => {
                            e.target.setCustomValidity("");
                            if (!DNIPattern.test(e.target.value)) {
                                e.target.setCustomValidity("DNI must contain 8 digits and a capital letter");
                            }
                        }}
                        onChange={(e) => setNewDNI(e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={NewEmail}
                        placeholder="Enter email" 
                        onInvalid={(e) => e.target.setCustomValidity("Not a valid email address")}
                        onInput={(e) => {
                            e.target.setCustomValidity("");
                            if (!emailPattern.test(e.target.value)) {
                                e.target.setCustomValidity("Not a valid email address");
                            }
                        }}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={NewPassword}
                        placeholder="Enter password (min. 6 chars, at least 1 uppercase, 1 number, 1 special char)" 
                        onInvalid={(e) => e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character")}
                        onInput={(e) => {
                            e.target.setCustomValidity("");
                            if (!passwordPattern.test(e.target.value)) {
                                e.target.setCustomValidity("Password of min 6 characters containing at least one lower and one uppercase letters, one digit and one special character");
                            }
                        }}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label htmlFor="type">User Type</label>
                    <select 
                        id="type" 
                        name="type" 
                        value={NewType}
                        onInvalid={(e) => e.target.setCustomValidity("Select your type of user")}
                        onInput={(e) => e.target.setCustomValidity("")}
                        onChange={(e) => setNewType(e.target.value)}
                        required>
                        <option value="">Select a type</option>
                        <option value="Donor">Donor</option>
                        <option value="Research">Research</option>
                        <option value="Government">Government</option>
                        <option value="Education">Education</option>
                        <option value="Transport">Transport</option>
                    </select>

                    <div className="error-message">{error}</div>

                    <button type="submit">Update Profile</button>
                </form>
            </div>

            <div className="property">
                <h1>{editingProperty ? "Edit Property" : "Add New Property"}</h1>
                <form onSubmit={editingProperty ? updateProperty : addProperty}>
                    <label>Address</label>
                    <input type="text" value={NewAddress} onChange={(e) => setNewAddress(e.target.value)} required />

                    <label>Zipcode</label>
                    <input type="number" value={NewZipcode} onChange={(e) => setNewZipcode(e.target.value)} required />

                    <label>People Living</label>
                    <input type="number" value={NewNumPeople} onChange={(e) => setNewNumPeople(e.target.value)} required />

                    <label>Square Meters</label>
                    <input type="number" value={NewSquareMeters} onChange={(e) => setNewSquareMeters(e.target.value)} required />

                    <label>Rooms</label>
                    <input type="number" value={NewRooms} onChange={(e) => setNewRooms(e.target.value)} required />

                    <label>Floors</label>
                    <input type="number" value={NewFloors} onChange={(e) => setNewFloors(e.target.value)} required />

                    <button type="submit">{editingProperty ? "Update Property" : "Add Property"}</button>
                </form>
            </div>

            <div className="existing-properties">
                <h1>Your Properties</h1>
                {properties.map((property) => (
                <div key={property.property_id} className="property-card">
                    <p><strong>Address:</strong> {property.address}</p>
                    <p><strong>Zipcode:</strong> {property.zipcode}</p>
                    <p><strong>People Living:</strong> {property.numpeople}</p>
                    <p><strong>Square Meters:</strong> {property.squaremeters}</p>
                    <p><strong>Rooms:</strong> {property.rooms}</p>
                    <p><strong>Floors:</strong> {property.floors}</p>
                    <button onClick={() => editProperty(property)}>Edit</button>
                    <button onClick={() => deleteProperty(property.property_id)} style={{ backgroundColor: "red" }}>Delete</button>
                </div>
            ))}
            </div>

            <Footer />
        </div>
    );
}*/}

export default PersonalData;

   