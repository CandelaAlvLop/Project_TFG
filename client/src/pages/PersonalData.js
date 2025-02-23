import React, {useState, useEffect} from 'react';
import Navbar from './NavbarIn';
import Navbar2 from './Navbar2';
import Footer from "./Footer";
import '../layouts/PersonalData.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function PersonalData() {
    //Show top of the page
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    /*const name_surnamePattern = /^[A-Z][a-z]{1,9}$/;
    const usernamePattern = /^.{2,10}$/;
    const DNIPattern = /^[0-9]{8}[A-Z]$/;
    const emailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,}$/;*/

    const [NewAddress, setNewAddress] = useState("");
    const [NewZipcode, setNewZipcode] = useState("");
    const [NewNumpeople, setNewNumpeople] = useState("");
    const [NewSquaremeters, setNewSquaremeters] = useState("");
    const [NewRooms,setNewRooms] = useState("");
    const [NewFloors, setNewFloors] = useState("");
    const [error, setError] = useState("");
    //const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); //Prevent refreshing

        const userId = localStorage.getItem("user_id"); // Retrieve user ID
        if (!userId) {
            console.error("User ID not found in localStorage!");
            setError("User must be logged in to add a property.");
            return;
        }
        console.log("User ID being sent:", userId); // Debugging

        axios.post('http://localhost:3001/UserManager/personaldata', {
            user_id: userId,
            address: NewAddress,
            zipcode: NewZipcode,
            numpeople: NewNumpeople, 
            squaremeters: NewSquaremeters,
            rooms: NewRooms,
            floors: NewFloors,
        }).then(() => {
           // navigate('/dashboard'); 
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unexpected error during Register of Property");
            }
        });
    };

    return (
        <div>
            <Navbar />
            <Navbar2 />
                <div className="property">
                <div className="title-property">
                    <h1>Add you property</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="subtitle-property">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            value={NewAddress}
                            placeholder="Enter address (...)" 
                           
                            //pattern="^[A-Z][a-z]{1,9}$" 
                            required 

                            /*onInvalid={(e) => e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters")}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                                if (!name_surnamePattern.test(e.target.value)) {
                                    e.target.setCustomValidity("Name must start with a capital letter and be followed by small letters, max 10 letters");
                                }
                            }}*/
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                        
                        <label htmlFor="zipcode">Zipcode</label>
                        <input 
                            type="number" 
                            id="zipcode" 
                            name="zipcode" 
                            value={NewZipcode}
                            placeholder="Enter zipcode (...)" 
                            required
                            onChange={(e) => setNewZipcode(e.target.value)}
                        />
                    
                        <label htmlFor="numpeople">People living</label>
                        <input 
                            type="number" 
                            id="numpeople" 
                            name="numpeople" 
                            value={NewNumpeople}
                            placeholder="Enter number of people living (...)"  
                            required
                            onChange={(e) => setNewNumpeople(e.target.value)}
                        />
                    
                        <label htmlFor="squaremeters">Squaremeters</label>
                        <input 
                            type="number" 
                            id="squaremeters" 
                            name="squaremeters" 
                            value={NewSquaremeters} 
                            placeholder="Enter Squaremeters (...)" 
                            required
                            onChange={(e) => setNewSquaremeters(e.target.value)}
                        />
                    
                        <label htmlFor="rooms">Rooms</label>
                        <input 
                            type="number" 
                            id="rooms" 
                            name="rooms" 
                            value={NewRooms}
                            placeholder="Enter rooms (...)" 
                            required 
                            onChange={(e) => setNewRooms(e.target.value)}
                        />
                    
                        <label htmlFor="floors">Floors</label>
                        <input 
                            type="number" 
                            id="floors" 
                            name="floors" 
                            value={NewFloors}
                            placeholder="Enter floors (...)" 
                            required 
                            onChange={(e) => setNewFloors(e.target.value)}
                        />

                        <div className="error-property">{error}</div>
                    </div>
                    <button className="button-property" type="submit">Add property</button>
               </form>
            </div>
            <Footer />
        </div>
    );
}

export default PersonalData;