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
    
    //Add user
    db.query(
        "INSERT INTO users (name,surname,username,DNI,email,password, type) VALUES (?,?,?,?,?,?,?)", 
        [name, surname, username, DNI, email, password, type], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.send({message: "Registration failed", error: err});
            } else {
                console.log('User registered succesfully:', result);
                res.send(result[0]);
                console.log("Redirecting to Dashboard");
            }
        }
    ); 
});

router.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", 
        [username, password],  
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            } 
            if (result.length > 0) { //Check if combination is in database
                console.log("User logged succesfully:", result);
                res.send(result[0]);
                console.log("Redirecting to Dashboard");
            } else {
                console.log("Wrong username or password");
                res.send({message: "Wrong username or password"})
            }
        }
    ); 
});

module.exports = router;