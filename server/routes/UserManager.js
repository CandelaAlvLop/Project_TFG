const express = require('express');
const router = express.Router();
const db = require('../db');


router.post("/register", (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const username = req.body.username
    const DNI = req.body.DNI
    const email = req.body.email
    const password = req.body.password
    const type = req.body.type

    /*const name_surnamePattern = "/^[A-Z][a-z]{1,9}$/";
    const usernamePattern = "/^.{2,10}$/";
    const DNIPattern = "/^[0-9]{8}[A-Z]$/";
    const emailPattern = "/^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,}$/";
    const passwordPattern = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,}$/";
    const typesPattern = ["Donor", "Research", "Government", "Education", "Transport"];
    const error = {};
    
    //Check no parameter is empty
    if (!name || !surname || !username || !DNI || !email || !password || !type) {
        return res.status(400).send({message: "All parameters are required"});
    }
    //Check correctness of patterns
    else if (!name_surnamePattern.test(name)) {
        error.name = "Name must start with a capital letter and be followed by small letters, max 10 letters";
    }
    else if (!name_surnamePattern.test(surname)) {
        error.surname = "Surname must start with a capital letter and be followed by small letters, max 10 letters";
    }
    else if (!usernamePattern.test(username)) {
        error.username = "Username must be between 2 and 10 characters";
    }
    else if (!DNIPattern.test(DNI)) {
        error.DNI = "DNI contains 8 digits and a capital letter";
    }
    else if (!emailPattern.test(email)) {
        error.email = "Not a valid email address";
    }
    else if (!passwordPattern.test(password)) {
        error.password = "Password of min 6 characters, containing at least one lower and one uppercase letters, one digit and one special character";
    }
    else if (!typesPattern.includes(type)) {
        error.type = "Select a type";
    }

    // Return errors if any exist
    if (Object.keys(error).length > 0) {
        return res.status(400).send({message: "Validation failed", error});
    }
 */
    
    //Check uniqueness of username, DNI and email in database
    db.query(
        "SELECT username, DNI, email FROM users WHERE username=? OR DNI=? OR email=?",
        [username, DNI, email],
        (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).send({message: "Database error", error: err});
            }

            if (result.length > 0) { //Check uniqueness of username, DNI and email
                let uniqueValue = [];
                result.forEach(user => {
                    if (user.DNI === DNI) { 
                        uniqueValue.push("DNI"); 
                    }
                    if (user.username === username) { 
                        uniqueValue.push("username"); 
                    }
                    if (user.email === email) { 
                        uniqueValue.push("email"); 
                    }
                });
                return res.status(400).send({message: `The following fields are already taken: ${uniqueValue.join(", ")}`});
            }

            //Add user if username, DNI and email unique and patterns are correct
            db.query(
                "INSERT INTO users (name,surname,username,DNI,email,password, type) VALUES (?,?,?,?,?,?,?)", 
                [name, surname, username, DNI, email, password, type], 
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({message: "Registration failed", error: err});
                    } else {
                        console.log("User registered succesfully:", result);
                        res.status(200).send({message: "Registration successful", userId: result.insertId});
                        console.log("Redirecting to Dashboard");
                    }
                }
            ); 
        }
    );

});

//Login
router.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", 
        [username, password],  
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } 
            if (result.length > 0) { //Check if combination is in database
                console.log("User logged succesfully:", result[0]);
                res.status(200).send(result[0]);
                console.log("Redirecting to Dashboard");
            } else {
                console.log("Wrong username or password");
                res.status(400).send({message: "Wrong username or password"})
            }
        }
    ); 
});

module.exports = router;